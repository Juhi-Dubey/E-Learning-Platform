import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 30px",
        backgroundColor: "#2563eb",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        <FaGraduationCap />
        <span>E-Learning</span>
      </div>

      {/* Links */}
      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: "25px",
          marginLeft: "40px",
        }}
      >
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/courses" className="nav-link">
          Courses
        </Link>

        {token && (
          <Link
            to="/dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        )}

        {role === "admin" && (
          <Link
            to="/admin"
            className="nav-link"
          >
            Admin
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {!token ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>

            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;