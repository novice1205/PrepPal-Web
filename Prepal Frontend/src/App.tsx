import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import StudySchedule from "./components/StudySchedule";
import Flashcards from "./components/Flashcards";
import Roadmap from "./components/Roadmap";
import Layout from "./components/Layout";
import VerifyEmail from "./pages/VerifyEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Layout as a parent route */}
        <Route element={<Layout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="schedule" element={<StudySchedule />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="roadmap" element={<Roadmap />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;