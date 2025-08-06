import { useEffect, useState } from 'react';
import './AdminDashboard.css';

interface Lesson {
  id: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const token = localStorage.getItem('token');

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch('https://localhost:7116/api/course', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async () => {
    await fetch('https://localhost:7116/api/course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: newTitle, description: newDesc }),
    });
    setNewTitle('');
    setNewDesc('');
    fetchCourses();
  };

  const handleEditCourse = async (id: string, title: string, description: string) => {
    await fetch(`https://localhost:7116/api/course/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description }),
    });
    setEditCourse(null);
    fetchCourses();
  };

  const handleDeleteCourse = async (id: string) => {
    await fetch(`https://localhost:7116/api/course/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCourses();
  };

  const handleAddLesson = async (courseId: string, title: string, order: number) => {
    await fetch(`https://localhost:7116/api/course/${courseId}/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, order }),
    });
    fetchCourses();
  };

  const handleDeleteLesson = async (courseId: string, lessonId: string) => {
    await fetch(`https://localhost:7116/api/course/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCourses();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="create-course-form">
        <input
          type="text"
          placeholder="Course Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={handleCreateCourse}>Add Course</button>
      </div>

      {courses.map(course => (
        <div key={course.id} className="admin-course-card">
          <div className="course-header">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="actions">
              <button onClick={() => setExpandedCourseId(expandedCourseId === course.id ? null : course.id)}>
                {expandedCourseId === course.id ? 'Hide Lessons' : 'Show Lessons'}
              </button>
              <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
              <button onClick={() => setEditCourse(course)}>Edit</button>
            </div>
          </div>

          {expandedCourseId === course.id && (
            <div className="lessons-section">
              <h4>Lessons</h4>
              {!course.lessons || course.lessons.length === 0 ? (
                <p>No lessons yet.</p>
              ) : (
                <ul>
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.title}
                      <button onClick={() => handleDeleteLesson(course.id, lesson.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}

              <AddLessonForm courseId={course.id} onAdd={handleAddLesson} />
            </div>
          )}
        </div>
      ))}

      {editCourse && (
        <EditCourseModal
          courseId={editCourse.id}
          title={editCourse.title}
          description={editCourse.description}
          onClose={() => setEditCourse(null)}
          onSave={handleEditCourse}
        />
      )}
    </div>
  );
};

const AddLessonForm = ({
  courseId,
  onAdd,
}: {
  courseId: string;
  onAdd: (courseId: string, title: string, order: number) => void;
}) => {
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState<number>(1);

  return (
    <div className="add-lesson-form">
      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <button onClick={() => {
        onAdd(courseId, title, order);
        setTitle('');
        setOrder(1);
      }}>Add Lesson</button>
    </div>
  );
};

const EditCourseModal = ({
  courseId,
  title,
  description,
  onClose,
  onSave,
}: {
  courseId: string;
  title: string;
  description: string;
  onClose: () => void;
  onSave: (courseId: string, title: string, description: string) => void;
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(description);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Course</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={() => onSave(courseId, newTitle, newDesc)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
