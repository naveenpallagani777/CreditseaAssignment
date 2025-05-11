import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { useEffect, useState } from 'react';
import Verifier from './pages/Verifier';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  useEffect(() => {
    const token = Cookies.get('token');
	if (token && token !== 'undefined' && token !== 'null' && role && role !== 'undefined' && role !== 'null') {
	  setIsLoggedIn(true);
	}
  }, []);

  const getHomeComponent = () => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (role === 'admin') return <Admin />;
    if (role === 'verifier') return <Verifier />;
    return <UserPage />;
  };

  return (
    <BrowserRouter>
		<ToastContainer />
      <Routes>
        <Route path="/" element={getHomeComponent()} />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
