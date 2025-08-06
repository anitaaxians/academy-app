import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CourseDetails.css";

interface Lesson {
  id: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  status?: string;
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://localhost:7116/api/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Could not load course");

        const data = await res.json();
        setCourse({
          ...data,
          lessons: data.lessons || []
        });
      } catch (err: any) {
        setError(err.message || "Error loading course");
      }
    };

    fetchCourse();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-details">
      <button className="back-btn" onClick={() => navigate("/my-courses")}>
        ⬅ Back to Courses
      </button>

      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {course.status && (
        <p>
          Status:{" "}
          <span
            className={`status ${
              course.status === "Completed" ? "completed" : "in-progress"
            }`}
          >
            {course.status}
          </span>
        </p>
      )}

      <h3>Lessons</h3>
      <ul>
        {course.lessons && course.lessons.length > 0 ? (
          course.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}>
                Lesson : {lesson.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No lessons available for this course.</li>
        )}
      </ul>
    </div>
  );
};

export default CourseDetails;
