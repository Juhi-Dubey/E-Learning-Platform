
import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { toast } from "react-toastify";


function Admin() {
  const formRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
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

        toast.success("Course Updated");
      } else {
        await API.post(
          "/courses",
          formData
        );

        toast.success("Course Created");
      }

      fetchCourses();
      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {

    try {
      await API.delete(`/courses/${id}`);

      fetchCourses();
      setDeleteId(null);

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
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {deleteId && (
        // <div
        //   style={{
        //     position: "fixed",
        //     top: 0,
        //     left: 0,
        //     width: "100%",
        //     height: "100%",
        //     backgroundColor: "rgba(0,0,0,0.5)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        <div className="card">
          {/* <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
          > */}

          <div className="card">
            <h3>Delete Course?</h3>

            <p>
              This action cannot be undone.
            </p>

            <button
              onClick={() =>
                handleDelete(deleteId)
              }
              style={{
                marginRight: "10px",
              }}
            >
              Yes, Delete
            </button>

            <button
              onClick={() =>
                setDeleteId(null)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "20px",
        }}
      > */}

      <div className="card">
        <h1>Admin Panel</h1>

        <form
          ref={formRef}
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

            className="card"
            // style={{
            //   border: "1px solid #ccc",
            //   padding: "15px",
            //   marginBottom: "15px",
            // }}
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
                setDeleteId(course._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;