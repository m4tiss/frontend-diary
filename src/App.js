import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

import GymDashboard from './components/gym/GymDashboard';
import GymStats from './components/gym/GymStats';
import GymNavbar from './components/gym/GymNavbar'
import GymHistory from './components/gym/GymHistory';
import GymNewTraining from './components/gym/GymNewTraining';

import RunDashboard from './components/run/RunDashboard';
import RunNavbar from './components/run/RunNavbar';

import Login from './components/auth/Login'
import UserProfile from './components/shared/UserProfile';
import RunNewTraining from './components/run/RunNewTraining';
import RunHistory from './components/run/RunHistory';
import RunStats from './components/run/RunStats';
import Register from './components/auth/Register';


function App() {
  return (
    <Router>
      <div className='w-full h-screen'>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
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
        <Route path="profile" element={<UserProfile type="gym"/>} />
        <Route path="history" element={<GymHistory/>} />
        <Route path="newTraining" element={<GymNewTraining/>} />
        <Route path="stats" element={<GymStats/>} />
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
        <Route path="profile" element={<UserProfile type="run"/>} />
        <Route path="newTraining" element={<RunNewTraining/>} />
        <Route path="history" element={<RunHistory/>} />
        <Route path="stats" element={<RunStats/>} />
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
