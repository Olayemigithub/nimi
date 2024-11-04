import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from './components/Layout';
import Login from "./components/Login";
import Home from "./components/Home";
import Transfer from "./components/Transfer"; // Placeholder for Transfer Page
import AirtimeData from "./components/AirtimeData"; // Placeholder for Airtime/Data Page
import StandingOrder from "./components/StandingOrder"; // Placeholder for Standing Instruction
import PaySalaries from "./components/PaySalaries"; // Placeholder for Pay Salaries
import PayTsa from "./components/PayTsa"; // Placeholder for Pay TSA
import CableTv from "./components/CableTv"; // Placeholder for CableTelevisionPage
import PayExamFees from "./components/PayExamFees";
import SendMoneyAbroad from "./components/SendMoneyAbroad";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Wallet from "./components/Wallet";
import Signup from "./components/SignUp"; // Adjust path as necessary
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
       <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />

            {/* Additional routes for functionalities */}
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/airtime-data" element={<AirtimeData />} />
            <Route path="/cable-television" element={<CableTv />} />
            <Route path="/pay-tsa-states" element={<PayTsa />} />
            <Route path="/pay-salaries" element={<PaySalaries />} />
            <Route
              path="/standing-instruction"
              element={<StandingOrder />}
            />
            <Route path="/pay-exam-fees" element={<PayExamFees />} />
            <Route path="/send-money-abroad" element={<SendMoneyAbroad />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
       </Layout> 
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
