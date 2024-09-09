import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

const ReadOneCustomer = () => {
  const [customers, setCustomer] = useState({});
  // const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const customerResponse = await axios.get(`http://localhost:8076/customers/${id}`);
        setCustomer(customerResponse.data);
        // const bookingsResponse = await axios.get(`http://localhost:8076/bookings/${cusID}`);
        // setBookings(bookingsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <div>
      <BackButton destination='/customers/' />
      <div className="nav-link">
                <div className="sb-nav-link-icon">
                  {/* <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} /> */}
                  
                   
                  
                  <button
                    onClick={() => { window.location.href = `/customers/edit/${customers._id}` }}
                    
                  >
                  Edit Profile
                  </button>
                  <button
                    onClick={() => { window.location.href = `/feedback/create/${customers.cusID}` }}
                  >
                   Feedback
                  </button>
                  </div>
                  </div>
      <h1 className="show-Inventory-title text-3xl my-4">Show customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        
        <div className='flex flex-col border-2 border-red-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Username:</span>
            <span>{customers.CusID}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <img src={customers.image} alt="Vehicle" style={{maxWidth: '300px', height: '300px', borderRadius: '50%', border: '4px solid red',  padding: '10px' }} />
              </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>First Name:</span>
            <span>{customers.FirstName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Name:</span>
            <span>{customers.LastName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Age:</span>
            <span>{customers.Age}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Gender:</span>
            <span>{customers.Gender}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Contact No:</span>
            <span>{customers.ContactNo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email:</span>
            <span>{customers.Email}</span>
          </div>
          {/* {bookings.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>Bookings</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Service Date</th>
                        <th style={styles.tableHeader}>Customer Name</th>
                        <th style={styles.tableHeader}>Vehicle Type</th>
                        <th style={styles.tableHeader}>Vehicle Number</th>
                        <th style={styles.tableHeader}>Contact Number</th>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Booking Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{booking.Booking_Date}</td>
                          <td style={styles.tableCell}>{booking.Customer_Name}</td>
                          <td style={styles.tableCell}>{booking.Vehicle_Type}</td>
                          <td style={styles.tableCell}>{booking.Vehicle_Number}</td>
                          <td style={styles.tableCell}>{booking.Contact_Number}</td>
                          <td style={styles.tableCell}>{booking.Email}</td>
                          <td style={styles.tableCell}>{booking.Booking_Date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No bookings available for this customer.</p>
              )} */}

          {/* Avoid displaying passwords */}
        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer;
