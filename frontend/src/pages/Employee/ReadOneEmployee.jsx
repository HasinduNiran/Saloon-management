import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ShowEmployees = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="show-employees-container p-4">
      <BackButton />
      <h1 className="show-employees-title text-3xl my-4">Show Employee</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="employee-details-container border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">EmpID</label>
            <span>{employee.EmpID}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">First Name</label>
            <span>{employee.FirstName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Last Name</label>
            <span>{employee.LastName}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Age</label>
            <span>{employee.Age}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Gender</label>
            <span>{employee.Gender}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Contact No</label>
            <span>{employee.ContactNo}</span>
          </div>
          <div className="detail-item my-4">
            <label className="detail-label text-xl mr-4 text-gray-500">Email</label>
            <span>{employee.Email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEmployees;
