import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import GymDashboard from './components/gym/GymDashboard';
import RunDashboard from './components/run/RunDashboard';
import GymNavbar from './components/gym/GymNavbar'
import RunNavbar from './components/run/RunNavbar';
import Login from './components/auth/Login'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

function App() {
  return (
    <Router>
      <div className='w-full h-screen'>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/gym/*" element={<PrivateRoute><GymLayout /></PrivateRoute>} />
          <Route path="/run/*" element={<PrivateRoute><RunLayout /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

function GymLayout() {
  const navigate = useNavigate();

  const setNavBarType = () => {
    navigate("/run");
  };

  return (
    <div className='min-h-screen flex flex-col '>
      <GymNavbar setNavBarType={setNavBarType} />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<GymDashboard />} />
        <Route path="*" element={<Navigate to="/gym/dashboard" />} />
      </Routes>
    </div>
  );
}

function RunLayout() {
  const navigate = useNavigate();

  const setNavBarType = () => {
    navigate("/gym");
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <RunNavbar setNavBarType={setNavBarType} />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<RunDashboard />} />
        <Route path="*" element={<Navigate to="/run/dashboard" />} />
      </Routes>
      
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return user ? children : <Navigate to="/login" />;
};


const PublicRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return user ? <Navigate to="/gym/dashboard" /> : children;
};


export default App;
