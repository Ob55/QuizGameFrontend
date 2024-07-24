import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Login from './components/Login.jsx'; // Import the Login component
import Register from './components/Register.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />, // Set Login as the default route or configure as needed
      },
      {
        path: "/register",
        element: <Register />, // Set Login as the default route or configure as needed
      },
      {
        path: "/home",
        element: <Home />, // Home route
      },
      {
        path: "/quiz",
        element: <Quiz />, // Quiz route
      },
      {
        path: "*",
        element: <Navigate to="/" />, // Redirect unknown routes to login
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
