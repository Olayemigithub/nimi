import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css"; // Import your custom CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from 'axios';
import sendMoneyImage from '../assets/send-money-3d.jpg';
import tsaDuesImage from '../assets/tsa-dues-3d.jpg';
import standingInstructionImage from '../assets/standing-instruction-3d.jpg';
import sendingAbroadImage from '../assets/sendAbroad.jpg';
import payBillsImage from '../assets/pay-bills-3d.jpg';
import requestMoneyImage from '../assets/request-money-3d.jpg';
import remittanceImage from '../assets/remittance-3d.jpg';
import logoImage from '../assets/logo.jpg';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch wallet balance and user info
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming you have endpoints for user info and wallet balance
        const [userResponse, walletResponse] = await Promise.all([
          axios.get('/api/user/info'),           // Endpoint for user info
          axios.get('/api/wallet/balance')       // Endpoint for wallet balance
        ]);

        setPhoneNumber(userResponse.data.phoneNumber);
        setWalletBalance(walletResponse.data.balance);
      } catch (error) {
        console.error("Error fetching user data or wallet balance:", error);
      }
    };
    
    fetchUserData();
  }, []);

  // Handle sidebar visibility on mouse enter/leave
  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="home-container">
      {/* Minimalist Navbar */}
     
      {/* Page Content */}
      <div className="d-flex justify-content-around">
            {/* Hero Section */}
            <header 
              className="hero-section" 
              style={{
                backgroundColor: "white",  // Use camelCase "backgroundColor"
                height: "50vh", 
                position: "relative", 
                width: "100%"
              }}
            >
              <div className="product-identity pb-4">
                <div className="container text-center text-black" style={{ paddingTop: "20vh" }}>
                  
                  {/* Logo Image */}
                  <img 
                    src={logoImage}  // Make sure to import the logoImage at the top of your file
                    alt="Company Logo" 
                    className="mb-4" 
                    style={{ width: "150px", height: "150px", objectFit: "contain" }}
                  />

                  {/* Hero Section Text */}
                  <p className="lead">Simplifying your financial needs with our seamless solutions</p>
                  
                  {/* Get Started Button */}
                  <a href="/login" className="btn btn-outline-light btn-sm mt-4 w-50">Get Started</a>
                  
                  {/* Sign-Up Link */}
                  <p className="mt-3">
                    Don't have an account? 
                    <a href="/sign-up" className="text-black mx-3 text-decoration-none">
                      <u>Sign Up</u>
                    </a>
                  </p>
                </div>
              </div>
            </header>

            {/* Main Content Section */}
            <section className="container my-5">
              <div className="row">
                <div className="col-md-4 mb-4" >
                  <Link to="/transfer" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Send Money</h5>
                        <p className="card-text">Quick, easy transfers to anyone, anywhere.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4 mb-4">
                  <Link to="/airtime-data" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Airtime/Data</h5>
                        <p className="card-text">Top up your phone with airtime and data in seconds.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4 mb-4">
                  <Link to="/cable-television" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Cable TV</h5>
                        <p className="card-text">Pay for your favorite TV subscriptions instantly.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                  <div className="col-md-4 mb-4">
                  <Link to="/pay-tsa-states" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Pay TSA</h5>
                        <p className="card-text">Pay into the Treasury Single Account with ease.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                  <div className="col-md-4 mb-4">
                    <Link to="/pay-exam-fees" className="card-link">
                      <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                          <h5 className="card-title">Pay Exam Fees</h5>
                          <p className="card-text">Pay for your exams here</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                <div className="col-md-4 mb-4">
                <Link to="/wallet" className="card-link">
                  <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                      <h5 className="card-title">Wallet</h5>
                      <p> Wallet (Balance: ₦{walletBalance}) {/* Dynamic balance shown only when authenticated */}</p> 
                    </div>
                  </div>
                </Link>
              </div>
                <div className="col-md-4 mb-4">
                  <Link to="/standing-instruction" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Standing Instructions</h5>
                        <p className="card-text">Set up recurring payments and never miss a bill.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4 mb-4">
                  <Link to="/pay-salaries" className="card-link">
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <h5 className="card-title">Pay Salaries</h5>
                        <p className="card-text">Easily manage and process employee payments.</p>
                      </div>
                    </div>
                  </Link>
                </div>
               <div className="col-md-4 mb-4">
                <Link to="/send-money-abroad" className="card-link">
                  <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                      <h5 className="card-title">Send Money Abroad</h5>
                      <p className="card-text">Send money to anywhere abroad now.</p>
                    </div>
                  </div>
                </Link>
              </div>
              </div>
            </section>
      </div>
                    {/* Service Descriptions Section */}
        <section className="container my-5">
        <div className="row">
          {[
            {
              title: "Send Money within Nigeria in minutes",
              desc: "Our Send Money as a Service enables individuals and businesses to transfer funds seamlessly within Nigeria. This service provides quick, secure transactions, allowing recipients to receive money almost instantly. Whether you’re sending money to family, friends, or business associates, our service is designed to be convenient and accessible via mobile apps or online platforms. It supports various payment methods, including bank transfers and mobile wallets, making it versatile for users with different preferences. This essential service helps support local economies and simplifies financial transactions for everyday needs.",
              imgSrc: sendMoneyImage,
              customClass: "send-money-card"
            },
            {
              title: "Treasury Single Account Dues as a Service",
              desc: "Treasury Single Account (TSA) Dues as a Service streamlines the process of paying government dues and obligations into a centralized account. By consolidating funds from different government agencies, this service promotes transparency and efficiency in public finance management. Users can easily make payments for taxes, fees, and other obligations through secure online platforms. This system minimizes revenue leakages, ensuring that all funds are accurately accounted for and managed efficiently, helping the government maintain fiscal discipline and meet its financial responsibilities.",
              imgSrc: tsaDuesImage,
              customClass: "tsa-dues-card"
            },
            {
              title: "Standing Instruction as a Service",
              desc: "Standing Instruction as a Service enables customers to automate recurring payments directly from their bank accounts or digital wallets. Users can set up predefined schedules for payments such as bills, loans, or subscriptions, ensuring timely transactions without manual intervention. This service helps users manage their finances efficiently by preventing missed payments and avoiding late fees. It is designed to offer convenience, enhance cash flow management, and support personal and business finance management by automating regular financial commitments.",
              imgSrc: standingInstructionImage,
              customClass: "standing-instruction-card"
            },
            {
              title: "Sending Money Abroad as a Service",
              desc: "Sending Money Abroad as a Service provides a secure, convenient way for individuals and businesses to transfer funds internationally. It is ideal for expatriates, students, and businesses with global connections. By offering competitive exchange rates and lower fees than traditional banks, this service makes cross-border transactions more affordable. Users benefit from enhanced tracking, real-time notifications, and regulatory compliance, providing peace of mind with each transaction. This service is vital for supporting global economic relationships and facilitating financial inclusivity for those involved in cross-border exchanges.",
              imgSrc: sendingAbroadImage,
              customClass: "sending-abroad-card"
            },
            {
              title: "Pay Bills as a Service",
              desc: "Pay Bills as a Service offers a simple, organized solution for settling essential utility bills, such as electricity, water, and internet, through a unified online platform. Users can manage monthly payments with ease and benefit from options for automated reminders and scheduled payments, ensuring timely payments and avoiding late penalties. This service is designed to improve convenience and help users maintain a good standing with service providers, streamlining the process of managing household and business expenses.",
              imgSrc: payBillsImage,
              customClass: "pay-bills-card"
            },
            {
              title: "Request Money as a Service",
              desc: "Request Money as a Service provides a secure and efficient way for individuals and businesses to request funds from others. Whether it’s for personal support, business payments, or shared expenses, users can initiate specific amount requests through digital platforms. Options for one-time or recurring requests make it easy to manage finances transparently and efficiently, simplifying the process of receiving payments and promoting accountability.",
              imgSrc: requestMoneyImage,
              customClass: "request-money-card"
            },
            {
              title: "Remittance Service",
              desc: "Remittance Service facilitates secure international fund transfers for users needing to send or receive money across borders. This service is tailored for expatriates, families, and individuals who support loved ones in other countries. With competitive exchange rates, low fees, and real-time updates, users can trust that their transactions are fast, reliable, and traceable. Remittance Service strengthens global connections, making it easy to provide financial support across distances, fostering inclusivity and financial stability for all users.",
              imgSrc: remittanceImage,
              customClass: "remittance-card"
            }
          ].map((service, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className={`card shadow-sm border-0 d-flex flex-md-row align-items-stretch p-3 w-100 ${service.customClass}`}>
                <img 
                  src={service.imgSrc} 
                  className="card-img-left rounded" 
                  alt={service.title} 
                  style={{ width: "350px", height: "350px", objectFit: "cover", marginRight: "20px" }} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text flex-grow-1" style={{ maxHeight: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>

    </div>
  );
};

export default Home;
