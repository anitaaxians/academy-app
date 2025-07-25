import { Link } from 'react-router-dom';
<img src="/logo.jpg" alt="Logo" className="logo" />

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.jpg" alt="Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
