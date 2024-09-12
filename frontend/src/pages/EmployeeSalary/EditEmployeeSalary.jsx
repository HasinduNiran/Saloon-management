// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for EditEmployeeSalary
const EditEmployeeSalary = () => {
  // State variables for managing form data and loading state
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
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing salary record and employee data by id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8076/employeeSalary/${id}`);
        const salaryData = response.data;

        setEmpID(salaryData.EmpID);
        setEmployeeName(salaryData.employeeName);
        setFromDate(salaryData.fromDate);
        setToDate(salaryData.toDate);
        setTotalOThours(salaryData.totalOThours);
        setTotalOTpay(salaryData.totalOTpay);
        setTotalWorkedhours(salaryData.totalWorkedhours);
        setTotalWorkedpay(salaryData.totalWorkedpay);
        setTotalSalary(salaryData.TotalSalary);

        // Fetch employee options for dropdown
        const empResponse = await axios.get('http://localhost:8076/employees');
        const employees = empResponse.data.data;
        const options = employees.map(emp => ({
          value: emp.EmpID,
          label: `${emp.FirstName} ${emp.LastName}`
        }));
        setEmployeeOptions(options);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please check the console.',
        });
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  // Validate form data
  const validateForm = () => {
    if (!EmpID || !fromDate || !toDate || !totalOThours || !totalOTpay || !totalWorkedhours || !totalWorkedpay || !TotalSalary) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      return false;
    }
    return true;
  };

  const handleEditSalary = () => {
    if (!validateForm()) return;

    const data = {
      EmpID,
      employeeName,
      fromDate,
      toDate,
      totalOThours,
      totalOTpay,
      totalWorkedhours,
      totalWorkedpay,
      TotalSalary
    };
    setLoading(true);

    axios
      .put(`http://localhost:8076/employeeSalary/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Salary record updated successfully.',
        }).then(() => {
          navigate('/employeeSalary/allEmployeeSalary');
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the record.',
        });
        console.log(error);
      });
  };

  // JSX for rendering the EditEmployeeSalary form
  return (
    <div className="p-4">
      <BackButton destination='/employeeSalary/allEmployeeSalary' />
      <h1 className="text-3xl my-4">Edit Employee Salary</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>EmpID</label>
          <select
            value={EmpID}
            onChange={(e) => setEmpID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="" disabled>Select Employee ID</option>
            {employeeOptions.map((emp) => (
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
          <label className='text-xl mr-4 text-gray-500'>Total OT Hours</label>
          <input
            type="number"
            value={totalOThours}
            onChange={(e) => setTotalOThours(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total OT Pay</label>
          <input
            type="number"
            value={totalOTpay}
            onChange={(e) => setTotalOTpay(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Worked Hours</label>
          <input
            type="number"
            value={totalWorkedhours}
            onChange={(e) => setTotalWorkedhours(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Worked Pay</label>
          <input
            type="number"
            value={totalWorkedpay}
            onChange={(e) => setTotalWorkedpay(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Total Salary</label>
          <input
            type="number"
            value={TotalSalary}
            onChange={(e) => setTotalSalary(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSalary}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditEmployeeSalary component
export default EditEmployeeSalary;
