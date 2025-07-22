import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Axians Academy</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Login</Link>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}