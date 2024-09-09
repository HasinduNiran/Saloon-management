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
                confirmButtonText: "Send Account details to me",
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
              if (error.response && error.response.data) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "username or email is already in use. It should be unique!",
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
