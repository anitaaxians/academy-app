import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="overlay">
        <div className="center-content landing-header">
        

          <section className="intro">
              <h2>Welcome to Axians Academy</h2>
            <p>Your gateway to growth, learning, and digital excellence.</p>
            <p>
              At Axians Academy, we believe in empowering individuals through practical, hands-on learning experiences.
              Whether you're starting your tech journey or sharpening your skills, our platform offers the tools, resources,
              and support you need to succeed.
            </p>
          </section>

          <section className="offer">
            <h2>💡 What We Offer</h2>
            <ul>
              <li>Interactive Courses designed by industry professionals</li>
              <li>Modern UI with responsive design — made for all devices</li>
              <li>Seamless Integration between frontend and backend services</li>
            </ul>
          </section>

          <section className="audience">
            <h2>🎓 Who is this for?</h2>
            <ul>
              <li>Students looking to boost their skills</li>
              <li>Junior developers entering the tech industry</li>
              <li>Teams training for real-world software development</li>
              <li>Anyone passionate about continuous learning</li>
            </ul>
          </section>

          <section className="cta">
            <h2>🌐 Join Axians Academy today</h2>
            <p>Learn smarter. Build faster. Grow stronger.</p>
            <p><em>Start your journey — one lesson at a time.</em></p>

            <div className="buttons">
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Signup</Link>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Landing;
