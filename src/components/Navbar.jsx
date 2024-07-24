import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  const handleLogout = async() => {
    localStorage.clear()
    setTimeout(()=>{
      navigate("/login");
    },2000)
   
  };

  const getCurrentUser = async () => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])


  return (
    <header className="h-16 flex items-center shadow-sm">
      <nav className="flex justify-between items-center w-9/12 mx-auto">
        <a href="/" className="text-zinc-800 font-bold uppercase">
          <img src="/images/logo.png" alt="logo" />
        </a>
        <div className="space-x-5 flex items-center">

          <ul className="space-x-5 sm:flex hidden">

            {
              user === null ?
                <>
                  <li className="hover:text-yellow-500"><a href="#">How it works</a></li>
                  <li className="hover:text-yellow-500"><a href="#">Features</a></li>
                  <li className="hover:text-yellow-500"><a href="#">About us</a></li>
                </>
                :
                <>
                  <li className="hover:text-yellow-500"><a href="/home">Home</a></li>
                  <li className="hover:text-yellow-500"><a href="/quiz">Quiz</a></li>
                  <li className="hover:text-yellow-500"><a href="#">Flashcards</a></li>
                </>
            }

          </ul>

          {
            user && <button
              className="font-medium px-5 py-1 border border-[#FCC822] rounded text-[#FCC822]"
              onClick={handleLogout}
            >
              Logout
            </button>
          }
          {
            
              user !== null && 
              <div className="text-center mr-5">
              <small>{user.email}</small>
              <br />
              <small>{user.role}</small>
            </div>
            
            
          }
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
