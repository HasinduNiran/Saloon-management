import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Importing Firebase configuration
import { app } from "../../config/firebase";

const EditCustomer = () => {
  const [customer, setCustomer] = useState({
    CusID: '',
    FirstName: '',
    LastName: '',
    Age: '',
    Gender: '',
    ContactNo: '',
    Email: '',
    Password: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const storage = getStorage(app);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/customers/${id}`)
      .then((response) => {
        const data = response.data;
        setCustomer(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.',
        });
        console.log(error);
      });
  }, [id]);

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setCustomer((prevState) => ({
        ...prevState,
        image: imageFile,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = customer.image; // Default to the current image URL
      if (customer.image && customer.image instanceof File) {
        const storageRef = ref(storage, `customer_images/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, customer.image);

        await uploadTask;

        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      // Update customer data with image URL
      const updatedCustomer = { ...customer, image: imageUrl };
      axios.patch(`http://localhost:8076/customers/${id}`, updatedCustomer)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            navigate(`/customers/`);
          } else {
            console.error('Unexpected response status:', response.status);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unexpected response status. Please try again later.',
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error updating customer:', error);
          console.log('Response data:', error.response?.data);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while updating the customer. Please try again later.',
          });
        });
    } catch (error) {
      setLoading(false);
      console.error('Error updating customer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while updating the customer. Please try again later.',
      });
    }
  };

  return (
    <div className="container">
      <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
  
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }
  
          form {
            display: flex;
            flex-direction: column;
          }
  
          label {
            margin-bottom: 5px;
            color: #555;
            font-weight: bold;
          }
  
          input[type="text"],
          input[type="number"],
          input[type="date"],
          input[type="email"] {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: 100%;
          }
  
          button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            margin-top: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-size: 16px;
          }
  
          button:hover {
            background-color: #45a049;
          }
  
          @media screen and (max-width: 768px) {
            .container {
              padding: 10px;
            }
  
            input[type="text"],
            input[type="date"],
            input[type="email"] {
              padding: 8px;
              font-size: 14px;
            }
  
            button {
              padding: 8px 16px;
              font-size: 14px;
            }
          }
        `}</style>
       <h1>Edit Customer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={customer.CusID}
                        onChange={(e) => setCustomer({...customer, CusID: e.target.value})}
                        maxLength={10}
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                    {customer.image && <img src={customer.image instanceof File ? URL.createObjectURL(customer.image) : customer.image} alt="Customer" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={customer.FirstName}
                        onChange={(e) => setCustomer({...customer, FirstName: e.target.value})}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={customer.LastName}
                        onChange={(e) => setCustomer({...customer, LastName: e.target.value})}
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={customer.ContactNo}
                        onChange={(e) => setCustomer({...customer, ContactNo: e.target.value})}
                        maxLength={10}
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input
                        type="text"
                        value={customer.Age}
                        onChange={(e) => setCustomer({...customer, Age: e.target.value})}
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type="text"
                        value={customer.Gender}
                        onChange={(e) => setCustomer({...customer, Gender: e.target.value})}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={customer.Email}
                        onChange={(e) => setCustomer({...customer, Email: e.target.value})}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={customer.Password}
                        onChange={(e) => setCustomer({...customer, Password: e.target.value})}
                    />
                </div>
                <div>
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        value={customer.reEnteredPassword}
                        onChange={(e) => setCustomer({...customer, reEnteredPassword: e.target.value})}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditCustomer;
