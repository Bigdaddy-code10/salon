import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Salons from "./pages/Salons";
import Profile from "./pages/Profile";
import MyAppointments from "./pages/MyAppointments";
import AdminSalons from "./pages/AdminSalons";
import BookAppointment from "./pages/BookAppointment"; // ✅ NEW IMPORT

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          <Route
            path="/salons"
            element={
              <ProtectedRoute>
                <Salons />
              </ProtectedRoute>
            }
          />

          <Route
            path="/salons/:salonId/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/salons"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminSalons />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
