import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdReport } from 'react-icons/md'; // Import MdReport for the report icon
import EmployeeAttendanceReport from './EmployeeAttendanceReport'; // Import the report component

const ShowEmployeeAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/employeeAttendence')
            .then((response) => {
                setAttendance(response.data.data);
                setFilteredAttendance(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filterByDate = (data, date) => {
            if (!date) return data;
            const [year, month] = date.split('-');
            return data.filter(record => {
                const recordDate = new Date(record.date);
                return (
                    recordDate.getFullYear() === parseInt(year, 10) &&
                    recordDate.getMonth() + 1 === parseInt(month, 10)
                );
            });
        };

        const filteredByDate = filterByDate(attendance, searchDate);
        
        if (searchQuery === '') {
            setFilteredAttendance(filteredByDate);
        } else {
            setFilteredAttendance(
                filteredByDate.filter(record =>
                    Object.values(record).some(value =>
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
            );
        }
    }, [searchQuery, searchDate, attendance]);

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Attendance List</h1>
                <div className='flex gap-x-4'>
                    <Link to='/employeeAttendence/create'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                </div>
            </div>
            <div className='mb-4 flex gap-x-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='p-2 border border-gray-300 rounded-md'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                    type='month'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md'
                />
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <EmployeeAttendanceReport filteredAttendance={filteredAttendance} /> {/* Add report component */}
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>Employee No</th>
                                <th className='border border-slate-600 rounded-md'>Employee Name</th>
                                <th className='border border-slate-600 rounded-md'>Date</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>In Time</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Out Time</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Working Hours</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>OT Hours</th>
                                <th className='border border-slate-600 rounded-md'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((record) => (
                                <tr key={record._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {record.EmpID}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {record.employeeName}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {record.date}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {record.InTime || "N/A"}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {record.OutTime || "N/A"}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {record.WorkingHours || 0}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {record.OThours || 0}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/employeeAttendence/edit/${record._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/employeeAttendence/delete/${record._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ShowEmployeeAttendance;
