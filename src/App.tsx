import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/LoginPage/Login';
import Register from './pages/SignUpPage/Register';
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer';
import About from './pages/About/About';
import Courses from './pages/MyCourses/Courses';
import PrivateRoute from './pages/Routes/MyPrivateRoute';
import CourseDetails from './pages/MyCourses/CourseDetails';
import Lesson from './pages/Lesson/Lesson';
import AdminRoute from './pages/Routes/AdminRoute';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute> }/>
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
