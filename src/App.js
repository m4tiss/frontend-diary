import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import GymDashboard from "./components/gym/GymDashboard/GymDashboard";
import GymStats from "./components/gym/GymStats/GymStats";
import GymNavbar from "./components/gym/GymNavbar/GymNavbar";
import GymHistory from "./components/gym/GymHistory/GymHistory";
import GymNewTraining from "./components/gym/GymNewTraining/GymNewTraining";

import RunDashboard from "./components/run/RunDashboard/RunDashboard";
import RunNavbar from "./components/run/RunNavbar/RunNavbar";

import Login from "./components/auth/Login";
import RunNewTraining from "./components/run/RunNewTraining/RunNewTraining";
import RunHistory from "./components/run/RunHistory/RunHistory";
import RunStats from "./components/run/RunStats/RunStats";
import Register from "./components/auth/Register";

import { useUser } from "./providers/UserProvider";
import GymUserProfile from "./components/gym/GymProfile/GymUserProfile";
import RunUserProfile from "./components/run/RunProfile/RunUserProfile";
import RunGoals from "./components/run/RunGoals/RunGoals";
import FriendsPage from "./components/shared/FriendsPage";
import RunAchievementPage from "./components/run/RunAchievementPage";
import { useEffect, useState, useContext } from "react";
import DarkModeContext from "./providers/DarkModeProvider";
import RunFriendPage from "./components/run/RunFriendPage/RunFriendPage";
import ChatPage from "./components/shared/ChatPage/ChatPage";
import RunRecords from "./components/run/RunRecords/RunRecords";
import GymQuickWorkout from "./components/gym/GymNewTraining/GymQuickWorkout";
import GymPlannedWorkout from "./components/gym/GymNewTraining/GymPlannedWorkout";
import GymWorkoutDetails from "./components/gym/GymNewTraining/GymWorkoutDetails";
import GymFriendPage from "./components/gym/GymFriendPage/GymFriendPage";
import GymRecords from "./components/gym/GymRecords/GymRecords";
import Languages from "./components/shared/Langauges";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Router>
      <div className={`w-full min-h-screen ${darkMode ? "dark" : ""}`}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/gym/*"
            element={
              <PrivateRoute>
                <GymLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/run/*"
            element={
              <PrivateRoute>
                <RunLayout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Languages/>
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
    <div className="min-h-screen flex flex-col">
      <GymNavbar setNavBarType={setNavBarType} />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<GymDashboard />} />
        <Route path="profile" element={<GymUserProfile />} />
        <Route path="history" element={<GymHistory />} />
        <Route path="newTraining" element={<GymNewTraining />} />
        <Route path="stats" element={<GymStats />} />
        <Route path="friends" element={<FriendsPage color="red" />} />
        <Route path="friend/:friendId" element={<GymFriendPage />} />
        <Route path="quickWorkout" element={<GymQuickWorkout />} />
        <Route path="plannedWorkout" element={<GymPlannedWorkout />} />
        <Route path="workoutDetails" element={<GymWorkoutDetails />} />
        <Route path="records" element={<GymRecords />} />
        <Route path="chats" element={<ChatPage />} />
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
    <div className="min-h-screen flex flex-col">
      <RunNavbar setNavBarType={setNavBarType} />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<RunDashboard />} />
        <Route path="profile" element={<RunUserProfile />} />
        <Route path="newTraining" element={<RunNewTraining />} />
        <Route path="history" element={<RunHistory />} />
        <Route path="goals" element={<RunGoals />} />
        <Route path="friends" element={<FriendsPage color="blue" />} />
        <Route path="stats" element={<RunStats />} />
        <Route path="friend/:friendId" element={<RunFriendPage />} />
        <Route path="achievements" element={<RunAchievementPage />} />
        <Route path="records" element={<RunRecords />} />
        <Route path="chats" element={<ChatPage />} />

        <Route path="*" element={<Navigate to="/run/dashboard" />} />
      </Routes>
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return user ? <Navigate to="/gym/dashboard" /> : children;
};

export default App;
