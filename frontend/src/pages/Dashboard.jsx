import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [enrollments, setEnrollments] =
    useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const { data } = await API.get(
        "/enrollments/me"
      );

      setEnrollments(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div>
    <div className="container">
      <h1>My Dashboard</h1>

      {enrollments.map((item) => (
        <div
          key={item._id}
          className="card"
          // style={{
          //   border: "1px solid gray",
          //   padding: "10px",
          //   margin: "10px",
          // }}
        >
          <h3>
            {item.courseId?.title}
          </h3>

          <p>
            Progress:
            {" "}
            {item.progress}%
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;