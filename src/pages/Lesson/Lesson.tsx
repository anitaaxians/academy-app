import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Lesson.css';

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://localhost:7116/api/lesson/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setMessage("Failed to load lesson");
        return;
      }

      const data = await res.json();
      setLesson(data);
    };

    fetchLesson();
  }, [id]);

  const markComplete = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://localhost:7116/api/lesson/${id}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      setMessage("Could not mark as complete");
      return;
    }

    setMessage("✅ Lesson marked as complete!");
  };

  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="lesson-view">
      <h2>{lesson.title}</h2>

      {lesson.videoUrl && (
        <div className="video-container">
          <iframe src={lesson.videoUrl} title="Lesson Video" allowFullScreen />
        </div>
      )}

      <div className="lesson-content">
        <p>{lesson.content}</p>
      </div>

      <button className="complete-btn" onClick={markComplete}>Mark as Complete</button>

      {message && <p className="status-msg">{message}</p>}
    </div>
  );
};

export default Lesson;
