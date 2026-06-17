import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [courses, setCourses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    price: "",
    slug: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      price: "",
      slug: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(
          `/courses/${editingId}`,
          formData
        );

        alert("Course Updated");
      } else {
        await API.post(
          "/courses",
          formData
        );

        alert("Course Created");
      }

      fetchCourses();
      resetForm();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/courses/${id}`);

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);

    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      price: course.price,
      slug: course.slug,
    });
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId
            ? "Update Course"
            : "Create Course"}
        </button>
      </form>

      <hr
        style={{
          margin: "30px 0",
        }}
      />

      <h2>All Courses</h2>

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{course.title}</h3>

          <p>{course.description}</p>

          <p>
            ₹{course.price}
          </p>

          <button
            onClick={() =>
              handleEdit(course)
            }
            style={{
              marginRight: "10px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(course._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;