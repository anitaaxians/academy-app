import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <div className="overlay">
        <div className="center-content">
          <h1>Welcome to Axians Academy</h1>
          <div className="buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Signup</Link>
          </div>
        </div>
        <footer id="contact">
          <h3>Contact</h3>
          <p>Email: info@axiansacademy.com</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
