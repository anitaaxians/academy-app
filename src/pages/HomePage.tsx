import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to Axians Academy</h1>
      <p>Join our courses and start learning today!</p>
      <a href="/register" className="btn primary">Sign Up</a>
      <a href="/login" className="btn secondary">Login</a>

      <div id="about" className="section">
        <h2>About Us</h2>
        <p>Axians Academy is a learning platform for programming and IT skills.</p>
      </div>

      <div id="contact" className="section">
        <h2>Contact</h2>
        <p>Email: info@axians-academy.com</p>
        <p>Phone: +383 44 123 456</p>
      </div>
    </div>
  );
}