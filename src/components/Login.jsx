import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Retrieve stored user credentials
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Validate login credentials
    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("authenticated", "true");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Store user credentials
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("authenticated", "true");
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-white p-8 rounded shadow-md" onSubmit={isLogin ? handleLogin : handleSignup}>
        <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
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
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-[#FCC822] px-4 py-2 text-white rounded w-full mb-4"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-[#FCC822] hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
