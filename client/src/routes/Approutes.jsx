// In your routes file
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../pages/auth/Login";
import { SignupPage } from "../pages/auth/SignUp";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import CreateAppontment from "../pages/appointment/CreateAppontment";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/manager/*" element={<DashboardLayout />} />
      <Route path="/appointment/CreateAppontment" element={<CreateAppontment />} />
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Routes>
              {/* <Route path="/profile" element={<UserProfile />} /> */}
            </Routes>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Routes>
              {/* <Route path="/" element={<AdminDashboard />} /> */}
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
