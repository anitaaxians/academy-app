import { useEffect, useState } from 'react';

type Course = {
  id: string;
  title: string;
  description: string;
};

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://localhost:7056/api/course', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else {
        alert('Unauthorized or error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://localhost:7056/api/course/enroll/${courseId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert('Enrolled!');
    } else {
      alert('Already enrolled or error');
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid gap-4">
        {courses.map(course => (
          <div key={course.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
            <button
              onClick={() => handleEnroll(course.id)}
              className="mt-2 px-4 py-1 bg-purple-600 text-white rounded"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
