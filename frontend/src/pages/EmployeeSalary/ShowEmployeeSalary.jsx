import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import EmployeeSalaryReport from './EmployeeSalaryReport';  // Import the EmployeeSalaryReport component

const ShowEmployeeSalary = () => {
    const [employeeSalaries, setEmployeeSalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [filteredSalaries, setFilteredSalaries] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/employeeSalary')
            .then((response) => {
                setEmployeeSalaries(response.data.data);
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
                const fromDate = new Date(record.fromDate);
                const toDate = new Date(record.toDate);
                const searchDate = new Date(`${year}-${month}-01`);
                return (
                    fromDate <= searchDate &&
                    toDate >= searchDate
                );
            });
        };

        const filteredByDate = filterByDate(employeeSalaries, searchDate);
        
        if (searchQuery === '') {
            setFilteredSalaries(filteredByDate);
        } else {
            setFilteredSalaries(
                filteredByDate.filter(record =>
                    Object.values(record).some(value =>
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
            );
        }
    }, [searchQuery, searchDate, employeeSalaries]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateChange = (event) => {
        setSearchDate(event.target.value);
    };

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-3xl my-8'>Employee Salaries</h1>
                <Link to='/employeesalary/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='border border-slate-300 p-2 rounded'
                />
                <input
                    type='month'
                    placeholder='Filter by Date'
                    value={searchDate}
                    onChange={handleDateChange}
                    className='border border-slate-300 p-2 rounded ml-4'
                />
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <EmployeeSalaryReport filteredSalaries={filteredSalaries} />
                    <table className='w-full border-separate border-spacing-2 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>EmpID</th>
                                <th className='border border-slate-600 rounded-md'>Employee Name</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>From Date</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>To Date</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Total OT Hours</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Total OT Pay</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Total Worked Hours</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Total Worked Pay</th>
                                <th className='border border-slate-600 rounded-md'>Total Salary</th>
                                <th className='border border-slate-600 rounded-md'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salary) => (
                                <tr key={salary._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {salary.EmpID}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {salary.employeeName}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.fromDate}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.toDate}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.totalOThours}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.totalOTpay}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.totalWorkedhours}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {salary.totalWorkedpay}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {salary.TotalSalary}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            
                                            <Link to={`/employeeSalary/edit/${salary._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/employeeSalary/delete/${salary._id}`}>
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

export default ShowEmployeeSalary;
