import { useEffect, useState } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await API.get("/courses");

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div>
    <div className="card">
      <h1>All Courses</h1>

      {courses.length === 0 ? (
        <p>No Courses Found</p>
      ) : (
        courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))
      )}
    </div>
  );
}

export default Courses;