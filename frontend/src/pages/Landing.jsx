import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";

function Landing() {
  return (
    <div
      style={{
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          className="hero-title"
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Learn Without Limits 🚀
        </h1>

        <p
          className="hero-subtitle"
          style={{
            fontSize: "1.3rem",
            color: "#6b7280",
            marginBottom: "35px",
          }}
        >
          Master programming, web development,
          databases and modern technologies
          through interactive courses.
        </p>

        <Link to="/courses">
          <button className="primary-btn">
            Explore Courses
          </button>
        </Link>
      </div>

      {/* Features */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          marginTop: "80px",
        }}
      >
        <div
          className="card"
          style={{
            width: "280px",
          }}
        >
          <FaBookOpen
            size={35}
            color="#2563eb"
          />

          <h3
            style={{
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Courses
          </h3>

          <p>
            Learn React, Node.js, MongoDB,
            JavaScript and more.
          </p>
        </div>

        <div
          className="card"
          style={{
            width: "280px",
          }}
        >
          <FaChartLine
            size={35}
            color="#2563eb"
          />

          <h3
            style={{
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Track Progress
          </h3>

          <p>
            Monitor your enrolled courses and
            learning journey.
          </p>
        </div>

        <div
          className="card"
          style={{
            width: "280px",
          }}
        >
          <FaRocket
            size={35}
            color="#2563eb"
          />

          <h3
            style={{
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Career Ready
          </h3>

          <p>
            Build practical skills that prepare
            you for internships and jobs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;