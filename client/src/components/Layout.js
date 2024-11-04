import React from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
const Layout = ({ children, phoneNumber, walletBalance }) => {
  return (
    <div className="layout">
      {/* Header */}
      <header className="bg-dark text-white text-center p-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" style={{ fontSize: "24px", fontWeight: "small" }}>
              <span style={{ color: "red" }}>N</span>
              <span style={{ color: "yellow" }}>i</span>
              <span style={{ color: "white" }}>m</span>
              <span style={{ color: "white" }}>i</span>
            </Link>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {phoneNumber && (
                  <li className="nav-item">
                    <Link to="/wallet" className="nav-link">
                      Wallet (Balance: ₦{walletBalance})
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="d-flex">
              <Link to="/" className="text-white mx-3 text-decoration-none">Home</Link>
              <Link to="/sign-up" className="text-white mx-3 text-decoration-none">Sign up</Link>
              <Link to="/login" className="text-white mx-3 text-decoration-none">Logout</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow-1" style={{ marginTop: "80px" }}>
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-dark text-white py-4" clas="footer-margin-top">
        <div className="container-fluid bg-secondary py-4">
          <div className="row text-center text-white justify-content-evenly">
            <div className="col-lg-3 col-md-6 mb-3">
              <h5>
                <Link className="text-white text-decoration-none" to="/about-us">About Us</Link>
              </h5>
              <p>Information about the company.</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <h5>
                <Link className="text-white text-decoration-none" to="/services">Services</Link>
              </h5>
              <p>List of services provided.</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <h5>
                <Link className="text-white text-decoration-none" to="/contact-us">Contact Us</Link>
              </h5>
              <p>Email and phone contact details.</p>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <p>&copy; 2024 Nimi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
