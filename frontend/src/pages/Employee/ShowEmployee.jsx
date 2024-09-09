import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/employees')
            .then((response) => {
                setEmployees(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    

    return (
        <div className='p-4'>
            <li><Link to="/">Home</Link></li>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employees List</h1>
                <Link to='/employees/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>Employee No</th>
                            <th className='border border-slate-600 rounded-md'>First Name</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Last Name</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Age</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Gender</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Contact No</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Email</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {employee.EmpID}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {employee.FirstName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {employee.LastName}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {employee.Age}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {employee.Gender}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {employee.ContactNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {employee.Email}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/employees/details/${employee._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/employees/edit/${employee._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/employees/delete/${employee._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowEmployees;
