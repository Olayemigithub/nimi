import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Transfer from "./Transfer";
import AirtimeData from "./AirtimeData";
import CableTv from "./CableTv";
import PayTsa from "./PayTsa";
import PaySalaries from "./PaySalaries";
import StandingOrder from "./StandingOrder";
import PayExamFees from "./PayExamFees";
import SendMoneyAbroad from "./SendMoneyAbroad";
import Login from "./Login";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Wallet from "./Wallet";
import Services from "./Services";
import Dashboard from "./Dashboard";  // Ensure Dashboard is imported
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = ({ onLoginSuccess, userToken }) => {
  const isAuthenticated = !!userToken; // Check if the user is authenticated

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute userToken={userToken} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/airtime-data" element={<AirtimeData />} />
        <Route path="/cable-television" element={<CableTv />} />
        <Route path="/pay-tsa-states" element={<PayTsa />} />
        <Route path="/pay-salaries" element={<PaySalaries />} />
        <Route path="/standing-order" element={<StandingOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pay-exam-fees" element={<PayExamFees />} />
        <Route path="/send-money-abroad" element={<SendMoneyAbroad />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/services" element={<Services />} />
      </Route>

      {/* Public Route */}
      <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />

      {/* Default Route */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
      />

      {/* Catch-All Route */}
      <Route path="*" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
