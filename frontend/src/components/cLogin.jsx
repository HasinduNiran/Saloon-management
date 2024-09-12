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
    if (CusID === "customer" && Password === "customer123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Kasuni",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/customer/customerDashboard");
      return;
    } else if (CusID === "package" && Password === "package123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Ravindu",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/package/dashboard");
      return;
    } else if (CusID === "booking" && Password === "booking123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Isuru",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/booking/dashboard");
      return;
    } else if (CusID === "vehicle" && Password === "vehicle123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Hasindu",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/vehicle/dashboard");
      return;
    } else if (CusID === "inventory" && Password === "inventory123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Lasal",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/inventory/InventoryDashboard");
      return;
    } else if (CusID === "payment" && Password === "payment123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Sithagi",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/payments/pdashboard");
      return;
    } else if (CusID === "employee" && Password === "employee123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Kavindi",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/employees/EmployeeDashboard");
      return;
    } else if (CusID === "feedback" && Password === "feedback123") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Yenura",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/feedback/dashboard");
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
