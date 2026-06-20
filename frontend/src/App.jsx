import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";


function App() {
  const role = localStorage.getItem("role");
  
  return (
    <BrowserRouter>
      <Navbar/>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route path="/courses" element={<Courses />} />

            <Route
              path="/courses/:id"
              element={<CourseDetail />}
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                role === "admin" ? (
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      <Footer />
      
    </BrowserRouter>
  );
}

export default App;