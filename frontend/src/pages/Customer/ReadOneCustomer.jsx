import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

const ReadOneCustomer = () => {
  const [customers, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const customerResponse = await axios.get(`http://localhost:8076/customers/${id}`);
        setCustomer(customerResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <div className="container mx-auto px-4">
      <BackButton destination='/customers/' />

      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800">Customer Profile</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-6">
          <div className="md:w-1/3 w-full flex justify-center md:justify-start">
              <img
                src={customers.image || 'https://via.placeholder.com/150'}
                alt="Customer"
                className="w-48 h-48 object-cover rounded-full border-4 border-black"
              />
            </div>
            <div className="md:w-2/3 w- text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-800">{customers.FirstName} {customers.LastName}</h2>
              <p className="text-gray-600 mt-2">{customers.Email}</p>
              <div className="text-gray-500 mt-4">
                <p><strong>Username:</strong> {customers.CusID}</p>
                <p><strong>Age:</strong> {customers.Age}</p>
                <p><strong>Gender:</strong> {customers.Gender}</p>
                <p><strong>Contact No:</strong> {customers.ContactNo}</p>
              </div>
            </div>
     
          </div>

          <div className="flex justify-center md:justify p-6 border-t">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-600 transition duration-200"
              onClick={() => { window.location.href = `/customers/edit/${customers._id}` }}
            >
              Edit Profile
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              onClick={() => { window.location.href = `/feedback/create/${customers.CusID}` }}
            >
              Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer;
