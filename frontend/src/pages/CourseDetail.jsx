import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const { data } = await API.get(
        `/courses/${id}`
      );

      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const enrollCourse = async () => {
    try {
      await API.post("/enrollments", {
        courseId: id,
      });

      alert("Enrolled Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Enrollment Failed"
      );
    }
  };

  if (!course) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <p>
        Category: {course.category}
      </p>

      <p>
        Difficulty: {course.difficulty}
      </p>

      <p>
        Price: ₹{course.price}
      </p>

      <button onClick={enrollCourse}>
        Enroll Now
      </button>
    </div>
  );
}

export default CourseDetail;