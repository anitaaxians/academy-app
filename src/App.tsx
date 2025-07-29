import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/LoginPage/Login';
import Register from './pages/SignUpPage/Register';
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer';

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
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
