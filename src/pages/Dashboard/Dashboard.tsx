import { useEffect, useState } from "react";
import './Dashboard.css';

interface DashboardData {
  enrolledCourses: number;
  lessonsCompleted: number;
  certificatesEarned: number;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized. Please login.");
        return;
      }

      try {
        const res = await fetch("https://localhost:7116/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to load dashboard");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h2>🎉 Welcome to Your Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data ? (
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>📚 Courses Enrolled</h3>
            <p>{data.enrolledCourses}</p>
          </div>
          <div className="stat-card">
            <h3>✅ Lessons Completed</h3>
            <p>{data.lessonsCompleted}</p>
          </div>
          <div className="stat-card">
            <h3>🏆 Certificates</h3>
            <p>{data.certificatesEarned}</p>
          </div>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
};

export default Dashboard;
