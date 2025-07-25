import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
