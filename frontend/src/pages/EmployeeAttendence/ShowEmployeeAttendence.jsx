import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdReport } from 'react-icons/md'; // Import MdReport for the report icon
import EmployeeAttendanceReport from './EmployeeAttendanceReport'; // Import the report component
import Nav from '../../components/Dashborad/DashNav';
import SideBar from '../../components/Dashborad/Sidebar';

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
        <div className="flex flex-col min-h-screen">
            <Nav />
            <SideBar />
            <div className="flex-grow p-6 ml-[18%] mt-[4%]">
                <div className="flex justify-between items-center mb-6">
                    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Employee <span class="text-pink-600 dark:text-pink-500">Attendance</span></h1>
                    <div className="flex items-center gap-4">
                        <Link to='/employeeAttendence/create'>
                            <button class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-pink-900 to-pink-500 group-hover:to-pink-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-100 rounded-md group-hover:bg-opacity-0">
                                    Add
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mb-4 flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Search Attendance"
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <input
                        type="month"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <EmployeeAttendanceReport filteredAttendance={filteredAttendance} />
                        <div className="overflow-x-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="max-h-[400px] overflow-y-auto">
                                    <table className="min-w-full border-collapse divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-semibold">Employee No</th>
                                                <th className="px-4 py-2 text-left font-semibold">Employee Name</th>
                                                <th className="px-4 py-2 text-left font-semibold">Date</th>
                                                <th className="px-4 py-2 text-left font-semibold max-md:hidden">In Time</th>
                                                <th className="px-4 py-2 text-left font-semibold max-md:hidden">Out Time</th>
                                                <th className="px-4 py-2 text-left font-semibold max-md:hidden">Working Hours</th>
                                                <th className="px-4 py-2 text-left font-semibold max-md:hidden">OT Hours</th>
                                                <th className="px-4 py-2 text-left font-semibold">Operations</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAttendance.length > 0 ? (
                                                filteredAttendance.map((record, index) => (
                                                    <tr key={record._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                        <td className="px-4 py-2">{record.EmpID}</td>
                                                        <td className="px-4 py-2">{record.employeeName}</td>
                                                        <td className="px-4 py-2">{record.date}</td>
                                                        <td className="px-4 py-2 max-md:hidden">{record.InTime || "N/A"}</td>
                                                        <td className="px-4 py-2 max-md:hidden">{record.OutTime || "N/A"}</td>
                                                        <td className="px-4 py-2 max-md:hidden">{record.WorkingHours || 0}</td>
                                                        <td className="px-4 py-2 max-md:hidden">{record.OThours || 0}</td>
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-center gap-x-4">
                                                                <Link to={`/employeeAttendence/edit/${record._id}`}>
                                                                    <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800 transition-colors" />
                                                                </Link>
                                                                <Link to={`/employeeAttendence/delete/${record._id}`}>
                                                                    <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800 transition-colors" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="px-4 py-2 text-center text-gray-500">No attendance records found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowEmployeeAttendance;
