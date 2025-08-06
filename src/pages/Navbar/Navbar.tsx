import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const role = localStorage.getItem("role");

  const scrollToFooter = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Axians Academy Logo" className="logo" />
      </div>

      <div className="navbar-center">
        <h1>Axians Academy</h1>
      </div>

      <ul className="navbar-links">
  <li><Link to="/landing">Home</Link></li>
  <li><Link to="/about">About Us</Link></li>
  <li>
    <a 
      href="#contact" 
      onClick={(e) => {
        e.preventDefault();
        const footer = document.querySelector("footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      Contact
    </a>
  </li>
    {role === "Admin" && <li><Link to="/admin">Admin</Link></li>}

</ul>

    </nav>
  );
};

export default Navbar;

