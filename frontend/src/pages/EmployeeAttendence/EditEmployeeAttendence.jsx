// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Functional component for EditEmployeeAttendance
const EditEmployeeAttendance = () => {
  // State variables for managing form data and loading state
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  const [loading, setLoading] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing attendance record and employee data by id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8076/employeeAttendence/${id}`);
        const attendanceData = response.data;

        setEmpID(attendanceData.EmpID);
        setEmployeeName(attendanceData.employeeName);
        setDate(attendanceData.date);
        setInTime(attendanceData.InTime);
        setOutTime(attendanceData.OutTime);
        setWorkingHours(attendanceData.WorkingHours);
        setOThours(attendanceData.OThours);

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

  // Calculate working hours and OT hours
  const calculateHours = (inTime, outTime) => {
    if (inTime && outTime) {
      const inDate = new Date(`1970-01-01T${inTime}:00`);
      const outDate = new Date(`1970-01-01T${outTime}:00`);
      const totalHours = (outDate - inDate) / (1000 * 60 * 60); // Convert milliseconds to hours

      const workingHours = Math.min(totalHours, 8);
      const otHours = totalHours > 8 ? totalHours - 8 : 0;

      setWorkingHours(workingHours.toFixed(2)); // Set to 2 decimal places
      setOThours(otHours.toFixed(2));
    }
  };

  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Event handlers
  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    setEmpID(selectedEmpID);
    const selectedEmployee = employeeOptions.find(emp => emp.value === selectedEmpID);
    if (selectedEmployee) {
      setEmployeeName(selectedEmployee.label);
    } else {
      setEmployeeName('');
    }
  };

  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHours(e.target.value, OutTime);
  };

  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHours(InTime, e.target.value);
  };

  const handleSetCurrentInTime = () => {
    const currentTime = getCurrentTime();
    setInTime(currentTime);
    calculateHours(currentTime, OutTime);
  };

  const handleSetCurrentOutTime = () => {
    const currentTime = getCurrentTime();
    setOutTime(currentTime);
    calculateHours(InTime, currentTime);
  };

  // Validate form data
  const validateForm = () => {
    if (!EmpID || !date || !InTime || !OutTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      return false;
    }
    if (new Date(`1970-01-01T${InTime}:00`) >= new Date(`1970-01-01T${OutTime}:00`)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Time',
        text: 'Out Time must be later than In Time.',
      });
      return false;
    }
    return true;
  };

  const handleEditAttendance = () => {
    if (!validateForm()) return;

    const data = {
      EmpID,
      employeeName,
      date,
      InTime,
      OutTime,
      WorkingHours,
      OThours
    };
    setLoading(true);

    axios
      .put(`http://localhost:8076/employeeAttendence/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Attendance record updated successfully.',
        }).then(() => {
          navigate('/employeeattendence/allEmployeeAttendence');
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

  // JSX for rendering the EditEmployeeAttendance form
  return (
    <div className="p-4">
      <BackButton destination='/employeeattendence/allEmployeeAttendence' />
      <h1 className="text-3xl my-4">Edit Employee Attendance</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>EmpID</label>
          <select
            value={EmpID}
            onChange={handleEmpIDChange}
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
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>In Time</label>
          <div className="flex items-center">
            <input
              type="time"
              value={InTime}
              onChange={handleInTimeChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            <button
              className="ml-2 bg-sky-300 p-2"
              onClick={handleSetCurrentInTime}
            >
              Set Current Time
            </button>
          </div>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Out Time</label>
          <div className="flex items-center">
            <input
              type="time"
              value={OutTime}
              onChange={handleOutTimeChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            <button
              className="ml-2 bg-sky-300 p-2"
              onClick={handleSetCurrentOutTime}
            >
              Set Current Time
            </button>
          </div>
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Working Hours</label>
          <input
            type="number"
            value={WorkingHours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>OT Hours</label>
          <input
            type="number"
            value={OThours}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditAttendance}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditEmployeeAttendance component
export default EditEmployeeAttendance;
