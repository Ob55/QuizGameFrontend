import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import localForage from "localforage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {

     
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store role in user object
        setTimeout(()=>{
          navigate("/home");
        },1000)
        
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };



  const getLoggedUser = async () => {
    let userExist = localStorage.getItem('user');
    if (userExist) {
      navigate("/home");
    }
  }
  useEffect(() => {
    getLoggedUser()
  }, [])


  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-white p-8 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
     
       
        <button
          type="submit"
       
          className="bg-[#FCC822] px-4 py-2 text-white rounded w-full mb-4"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-[#FCC822] hover:underline"
             onClick={()=>{
              navigate('register')
             }}
          >
            Register
          </button>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
