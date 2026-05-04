import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import { AuthContextProvider, useAuth } from "./context/AuthContext";

import { SocketProvider } from "./context/SocketContext";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";



const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* placeholder, update later */}
      <Route path="/booking" element={<PrivateRoute><BookingForm /></PrivateRoute> } />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <SocketProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </SocketProvider>
    </AuthContextProvider>
  );
}

export default App;
