import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "25px",
        padding: "15px 30px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginRight: "30px",
        }}
      >
        E-Learning
      </h2>

      <Link to="/" style={linkStyle}>
        Home
      </Link>

      <Link to="/courses" style={linkStyle}>
        Courses
      </Link>

      {token && (
        <>
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>

          <Link to="/admin" style={linkStyle}>
            Admin
          </Link>
        </>
      )}

      {/* <div style={{ marginLeft: "auto" }}> */}
      <div className="card">
        {!token ? (
          <>
            <Link
              to="/login"
              style={{
                ...linkStyle,
                marginRight: "20px",
              }}
            >
              Login
            </Link>

            <Link to="/signup" style={linkStyle}>
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "white",
              color: "#2563eb",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;