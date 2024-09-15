import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import tableImage from '../../images/tablebg.jpg';
import backgroundImage from "../../images/logobg.jpg";

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
  const containerStyle = {
   
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',                 // Full viewport width
    height: '100vh',
  };

  return (
    <div style={containerStyle } >
    <div className="container mx-auto px-4">
      <BackButton destination='/customers/' />

      <div className="text-center my-8">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Customer <span class="text-pink-600 dark:text-pink-500">Profile</span> </h1>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-2xl mx-auto  shadow-lg rounded-lg overflow-hidden" style={{
          backgroundImage: `url(${tableImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
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
              <p className="text-gray-800 mt-2">{customers.Email}</p>
              <div className="text-gray-800 mt-4">
                <p><strong>Username:</strong> {customers.CusID}</p>
                <p><strong>Age:</strong> {customers.Age}</p>
                <p><strong>Gender:</strong> {customers.Gender}</p>
                <p><strong>Contact No:</strong> {customers.ContactNo}</p>
              </div>
            </div>
     
          </div>

          <div className="flex justify-center md:justify p-6 border-t">
          <button class="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-pink-900 to-pink-500  group-hover:to-pink-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-100 rounded-md group-hover:bg-opacity-0"  onClick={() => { window.location.href = `/customers/edit/${customers._id}` }}>
                    Edit Profile
                    </span>
                    </button>
                    <button class="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-pink-900 to-pink-500  group-hover:to-pink-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-100 rounded-md group-hover:bg-opacity-0" onClick={() => { window.location.href = `/feedback/create/${customers.CusID}` }}>
                    Feedback
                    </span>
                    </button>
           
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ReadOneCustomer;
