import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        margin: "10px",
      }}
    >
      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <p>Category: {course.category}</p>

      <p>Price: ₹{course.price}</p>

      <Link to={`/courses/${course._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default CourseCard;