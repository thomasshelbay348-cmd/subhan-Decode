const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Left: Brand / Logo */}
        <div className="footer-brand">
          <h3>@Subhan</h3>
          <p>Full-Stack MERN Developer &amp; AI Integration Specialist</p>
        </div>

        {/* Middle: Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#project">Projects</a></li>
            <li><a href="#service">Services</a></li>
          </ul>
        </div>

        {/* Right: Social & Status */}
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://github.com/thomasshelbay348-cmd" target="_blank" rel="noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/subhan-shiekh12345" target="_blank" rel="noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://wa.me/923711441930" target="_blank" rel="noreferrer" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <p className="status-badge"><span className="dot"></span> Available for freelance work</p>
        </div>
      </div>

      {/* Bottom Copyright Line */}
      <div className="footer-bottom">
        <p>&copy; 2026 Subhan. Designed &amp; Built with passion.</p>
      </div>
    </footer>
  );
};

export default Footer;
