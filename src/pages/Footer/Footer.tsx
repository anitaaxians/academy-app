import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>📩 <a href="mailto:info@axiansacademy.com">info@axiansacademy.com</a></p>
        <div className="footer-center">
          <p>© <span>Axians Academy</span> {new Date().getFullYear()} — All rights reserved.</p>
        </div>
        <div className="social-icons">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
