import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
 
  return (
    <>
       <Navbar />
      <Outlet />
    </>
  );
}

export default App;
