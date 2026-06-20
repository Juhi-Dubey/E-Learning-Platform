import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

function CourseCard({ course }) {
  return (
    <>
    <div className="card">
       <h3>
        <FaBookOpen
          style={{
            marginRight: "8px",
            color: "#2563eb",
          }}
        />
        {course.title}
      </h3>

      <p>{course.description}</p>

      <p>Category: {course.category}</p>

      <p>Price: ₹{course.price}</p>

      <Link to={`/courses/${course._id}`}>
        View Details
      </Link>
    </div>

    </>
  );
}

export default CourseCard;