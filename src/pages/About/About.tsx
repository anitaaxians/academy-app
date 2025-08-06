import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-overlay">
        <div className="about-content">
          <h2>About Axians Academy</h2>
          <p>
            At Axians Academy, we are passionate about building the next generation of developers and digital professionals.
            Our mission is to offer practical, real-world learning experiences that go beyond theory and help individuals grow their careers in tech.
          </p>

          <section>
            <h3>🎯 Our Mission</h3>
            <p>
              To empower students and professionals with hands-on learning, cutting-edge tools, and real-world challenges that prepare them for successful careers in technology.
            </p>
          </section>

          <section>
            <h3>💼 What We Do</h3>
            <ul>
              <li>Deliver modern, responsive educational platforms</li>
              <li>Bridge the gap between academia and industry</li>
              <li>Provide mentorship and structured career paths</li>
            </ul>
          </section>

          <section>
            <h3>🤝 Our Values</h3>
            <ul>
              <li>Quality over quantity</li>
              <li>Continuous improvement</li>
              <li>Learning by doing</li>
              <li>Community and collaboration</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
