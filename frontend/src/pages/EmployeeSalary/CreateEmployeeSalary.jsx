import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalOThours, setTotalOThours] = useState('');
  const [totalOTpay, setTotalOTpay] = useState('');
  const [totalWorkedhours, setTotalWorkedhours] = useState('');
  const [totalWorkedpay, setTotalWorkedpay] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [includeEPF, setIncludeEPF] = useState(false); // State for EPF
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8076/employees');
        const responseData = response.data;
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          const employees = responseData.data;
          const options = employees.map(emp => ({
            value: emp.EmpID,
            label: `${emp.FirstName} ${emp.LastName}`,
            BasicSalary: emp.BasicSalary
          }));
          setEmployeeOptions(options);
        } else {
          Swal.fire("Error", "Unexpected response format from the server.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Unable to fetch employee data. Please try again.", "error");
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (EmpID && fromDate && toDate) {
      fetchAttendanceData();
    }
  }, [EmpID, fromDate, toDate, includeEPF]);

  useEffect(() => {
    if (employeeData) {
      calculateSalary();
    }
  }, [totalOThours, totalWorkedhours, includeEPF]);

  const handleEmpIDChange = async (e) => {
    const selectedEmpID = e.target.value;
    setEmpID(selectedEmpID);
    const selectedEmployee = employeeOptions.find(emp => emp.value === selectedEmpID);
    if (selectedEmployee) {
      setEmployeeName(selectedEmployee.label);
      setEmployeeData(selectedEmployee);
      fetchAttendanceData();
    } else {
      resetFields();
    }
  };

  const resetFields = () => {
    setEmployeeName('');
    setEmployeeData(null);
    setTotalOThours('');
    setTotalOTpay('');
    setTotalWorkedhours('');
    setTotalWorkedpay('');
    setTotalSalary('');
  };

  const fetchAttendanceData = async () => {
    if (!EmpID) return; // Only fetch if EmpID is provided

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8076/employeeAttendence');
      const attendanceData = response.data.data;

      const filteredAttendance = attendanceData.filter(
        (attendance) =>
          attendance.EmpID === EmpID &&
          (!fromDate || new Date(attendance.date) >= new Date(fromDate)) &&
          (!toDate || new Date(attendance.date) <= new Date(toDate))
      );

      const totalOvertimeHours = filteredAttendance.reduce(
        (total, attendance) => total + (attendance.OThours || 0),
        0
      );

      const totalWorkedHours = filteredAttendance.reduce(
        (total, attendance) => total + (attendance.WorkingHours || 0),
        0
      );

      const otPay = totalOvertimeHours * 585; 
      const workedPay = totalWorkedHours * 160; 

      setTotalOThours(totalOvertimeHours);
      setTotalWorkedhours(totalWorkedHours);
      setTotalOTpay(otPay);
      setTotalWorkedpay(workedPay);
      
      calculateSalary(); // Calculate salary whenever attendance data changes

    } catch (error) {
      Swal.fire("Error", "Unable to fetch attendance data. Please try again.", "error");
    }
    setLoading(false);
  };

  const calculateSalary = () => {
    if (employeeData) {
      const basicSalary = employeeData.BasicSalary || 0;
      const total = (parseFloat(totalOTpay) || 0) + (parseFloat(totalWorkedpay) || 0) + basicSalary;
      const finalSalary = includeEPF ? total * 0.9 : total; // Deduct EPF if included
      setTotalSalary(finalSalary);
    }
  };

  const handleSaveEmployeeSalary = () => {
    
    if (isNaN(totalOThours) || totalOThours < 0 || isNaN(totalWorkedhours) || totalWorkedhours < 0) {
      Swal.fire("Invalid Input", "Please enter valid numbers for worked and overtime hours.", "error");
      return;
    }

    setLoading(true);

    const data = {
      EmpID,
      employeeName,
      fromDate: fromDate || null,
      toDate: toDate || null,
      totalOThours: parseFloat(totalOThours) || 0,
      totalOTpay: parseFloat(totalOTpay) || 0,
      totalWorkedhours: parseFloat(totalWorkedhours) || 0,
      totalWorkedpay: parseFloat(totalWorkedpay) || 0,
      TotalSalary: parseFloat(TotalSalary) || 0,
      includeEPF, // Include EPF status in the data sent to the server
    };

    axios
      .post('http://localhost:8076/employeeSalary', data)
      .then(() => {
        setLoading(false);
        Swal.fire("Success", "Employee salary created successfully!", "success")
          .then(() => navigate('/employeesalary/allEmployeeSalary'));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire("Error", "An error occurred while creating the salary.", "error");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination='/employeesalary/allEmployeeSalary' />
      <h1 className="text-3xl my-4">Create Employee Salary</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Employee ID</label>
          <select
            value={EmpID}
            onChange={handleEmpIDChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Employee ID</option>
            {employeeOptions.map(emp => (
              <option key={emp.value} value={emp.value}>{emp.value}</option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Employee Name</label>
          <input
            type="text"
            value={employeeName}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Overtime Hours</label>
          <input
            type="number"
            value={totalOThours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Total OT hours"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Overtime Pay</label>
          <input
            type="number"
            value={totalOTpay}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Total OT pay"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Worked Hours</label>
          <input
            type="number"
            value={totalWorkedhours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Total worked hours"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Worked Pay</label>
          <input
            type="number"
            value={totalWorkedpay}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Total worked pay"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Salary</label>
          <input
            type="number"
            value={TotalSalary}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder="Total salary"
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>EPF</label>
          <button
            onClick={() => setIncludeEPF(!includeEPF)}
            className={`border-2 px-4 py-2 w-full ${includeEPF ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {includeEPF ? 'EPF Included' : 'EPF Excluded'}
          </button>
        </div>
        <button
          onClick={handleSaveEmployeeSalary}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Salary
        </button>
      </div>
    </div>
  );
};

export default CreateEmployeeSalary;
