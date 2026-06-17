import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "20px",
        }}
      >
        E-Learning Platform
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
        }}
      >
        Learn programming, web development, and more from anywhere.
      </p>

      <Link to="/courses">
        <button
          style={{
            padding: "12px 25px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Explore Courses
        </button>
      </Link>
    </div>
  );
}

export default Landing;