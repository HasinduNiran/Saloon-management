import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Importing Firebase configuration
import { app } from "../../config/firebase";

const CreateCustomer = () => {
  const [FirstName, setFirstName] = useState("");
  const [image, setImage] = useState(null);
  const [CusID, setCusID] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storage = getStorage(app);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // First name validation
    if (!/^[A-Z][a-z]{0,19}$/.test(FirstName)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "First name should start with a capital letter, contain only letters, and have a maximum length of 20 characters.",
      });
      return false;
    }

    // Validate Passwords Match
    if (Password !== reEnteredPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    const storageRef = ref(storage, `customer_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            image: downloadURL,
            CusID,
            FirstName,
            LastName,
            Age,
            Gender,
            ContactNo,
            Email,
            UserName: CusID, // Assuming UserName is set as CusID
            Password,
          };

          axios
            .post("http://localhost:8076/customers", data)
            .then(() => {
              setLoading(false);
              // Show success SweetAlert
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: `Customer account created successfully for ${Email}. Your Username is: ${CusID} and Password: ${Password}`,
                showCancelButton: true,
                confirmButtonText: "Registration Sucessfull",
              }).then((result) => {
                if (result.isConfirmed) {
                  //sendEmailToCustomer(Email, Password); // Call sendEmailToCustomer function with the email address and password
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // If user clicks cancel
                }
                // After user acknowledges the success, navigate away
                navigate("/customers");
              });
            })
            .catch((error) => {
              setLoading(false);
              if (error.response && error.response.data === 'Already Registered Customer. Log In') {
                Swal.fire({
                  icon: "error",
                  title: "Already Registered",
                  text: "This email is already registered. Please log in or use a different email.",
                  showCancelButton: true,
                  confirmButtonText: "OK",
                  cancelButtonText: "Login",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // User clicked OK
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate("/login"); // Redirect to login page
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "An error occurred. Please try again later.",
                });
              }
              console.log(error);
            });
        });
      }
    );
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
  
        h1 {
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
        input[type="file"],
        input[type="email"],
        input[type="password"] {
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
  
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
  
        button:hover {
          background-color: #45a049;
        }
  
        @media screen and (max-width: 768px) {
          .container {
            padding: 10px;
          }
  
          input[type="text"],
          input[type="number"],
          input[type="file"],
          input[type="email"],
          input[type="password"] {
            padding: 8px;
            font-size: 14px;
          }
  
          button {
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
      {loading ? <Spinner /> : ""}
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={CusID}
            onChange={(e) => setCusID(e.target.value)}
            maxLength={10}
            required
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            maxLength={10}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="text"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Re-enter Password</label>
          <input
            type="password"
            value={reEnteredPassword}
            onChange={(e) => setReEnteredPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;

