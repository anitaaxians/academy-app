import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

interface Course {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view courses.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://localhost:7116/api/course", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) throw new Error("Unauthorized. Please log in.");
          throw new Error("Failed to fetch courses");
        }

        const data = await res.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="my-courses">
      <h1 className="my-courses-title">All Courses</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : courses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No courses available.</p>
      ) : (
        <div className="my-courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <span
                className={`status ${
                  course.status === "Completed" ? "completed" : "in-progress"
                }`}
              >
                {course.status}
              </span>

              <button
                className="view-btn"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
