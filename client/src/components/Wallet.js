import React from "react";
import walletBalance from "./WalletBalance";
import createWallet from "./CreateWallet";
import fundWallet from "./FundWallet";
import withdrawFromWallet from "./WithdrawFromWallet";

const Wallet = () => {
  const phoneNumber = "123-456-7890"; // Replace with dynamic user phone number from your auth system

  return (
    <div className="container">
      {/* Use Bootstrap grid system and spacing utilities */}
      <div className="row">
        <div className="col-12 mb-3">
          <createWallet phoneNumber={phoneNumber} />
        </div>
        <div className="col-12 mb-3">
          <walletBalance phoneNumber={phoneNumber} />
        </div>
        <div className="col-12 mb-3">
          <fundWallet phoneNumber={phoneNumber} />
        </div>
        <div className="col-12 mb-3">
          <withdrawFromWallet phoneNumber={phoneNumber} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
