import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("currentEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/login"); // Redirect if not logged in
    }

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [navigate]);

  const handleLogout = async() => {
    await localStorage.clear()
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Logged in as:</h2>
        <p className="mb-4">{email}</p>
        <button
          onClick={()=>{handleLogout()}}
          className="bg-[#FCC822] px-4 py-2 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
