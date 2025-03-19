// DashboardLayout.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import Header from "./Header"; // Add the Header component
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./Dashboard";
import CreateInventory from "../../pages/Inventory/CreateInventory";
import InventoryManagement from "./dasboard/InventoryManagement";
import FeedbackManager from "./dasboard/FeedbackManager";
const contentVariants = {
  open: { marginLeft: 250, transition: { type: "spring", stiffness: 50 } },
  closed: { marginLeft: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen bg-PrimaryColor">
      {/* Toggle Button */}

      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <motion.main
        className=" flex-1 ml-0 transition-all"
        variants={contentVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <Header />

        {/* Routes for Dashboard Components */}
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          {/* <Route path="/create" element={<CreateInventory />} /> */}
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/Feedback-management" element={<FeedbackManager />} />
           </Routes>
      </motion.main>
    </div>
  );
}
