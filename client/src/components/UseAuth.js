import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UseAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual logic

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <div>Home Page</div>;
};

export default UseAuth;