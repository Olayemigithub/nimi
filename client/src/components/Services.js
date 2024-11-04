// Services.js
import React from 'react';
import sendMoneyImage from '../assets/sendMoneyImage';
import tsaDuesImage from '../assets/tsaDuesImage';
import standingInstructionImage from '../assets/standingInstructionImage';
import sendingAbroadImage from '../assets/sendingAbroadImage';
import payBillsImage from '../assets/payBillsImage';
import requestMoneyImage from '../assets/requestMoneyImage';
import remittanceImage from '../assets/remittanceImage';
import '../styles/services.css';

const servicesData = [
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
];

const Services = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                {servicesData.map((service, index) => (
                    <div className={`col-md-4 mb-4 ${service.customClass}`} key={index}>
                        <div className="card h-100 shadow">
                            <img src={service.imgSrc} className="card-img-top" alt={service.title} />
                            <div className="card-body">
                                <h5 className="card-title">{service.title}</h5>
                                <p className="card-text">{service.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
