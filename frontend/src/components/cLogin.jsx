import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CLogin() {
  const [CusID, setCusID] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      CusID,
      Password,
    };

    // Check if the credentials are 'staff'
    if (CusID === "Appointment" && Password === "Appointment123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/appointments/allAppointment");
      return;
    } else if (CusID === "Customer" && Password === "Customer123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/customers");
      return;
    } else if (CusID === "Employee" && Password === "Employee123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/employees/allEmployee");
      return;
    } else if (CusID === "Inventory" && Password === "Inventory123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/inventories/allInventory");
      return;
    } else if (CusID === "Package" && Password === "Package123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/pkg/allPkg");
      return;
    } else if (CusID === "Service" && Password === "Service123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/services/allService");
      return;
    } else if (CusID === "Supplier" && Password === "Supplier123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/suppliers/allSupplier");
      return;
    } else if (CusID === "Feedback" && Password === "Feedback123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! ",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/Feedback/allFeedback");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8076/customers/cLogin",
        credentials
      );
      const userData = response.data;

      if (userData) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome back, ${userData.firstName}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`/ReadOneHome/${CusID}`);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid credentials",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message || error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        text: error.response.data.message || error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Log in to your account</h2>
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setCusID(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="Password"
              id="Password"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-sm text-blue-600">Forgot your Password?</a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>Don't have an account? <a href="/customers/create" className="text-blue-600">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default CLogin;
