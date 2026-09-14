const About = () => {
  return (
    <section className="about reveal" id="about">
      <div className="about-info">
        <div className="img-about">
          <img src="/images/img.jpg" alt="Subhan" />
        </div>
        <div className="info-text">
          <h5>@Subhan</h5>
          <p>full-stack developer</p>
        </div>
      </div>
      <h3>ABOUT ME</h3>
      <h4>Bridging Web Engineering with Smart AI Solutions</h4><br />
      <div className="about-info2">
        <div className="about-text">
          <p>As a dedicated Full-Stack Developer and Computer Science student, I specialize in combining
            robust backend architectures with cutting edge AI integrations and custom chatbots. My focus is
            on creating automated, efficient digital tools that optimize business operations and elevate
            user experiences.</p>
          <p>Right now, I'm improving my skills on :</p>
          <p><strong>Core Technologies:</strong></p>
          <div className="skills-container">
            <span>React</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
            <span>JavaScript (ES6+)</span>
            <span>Tailwind CSS</span>
            <span>Firebase</span>
            <span>Laravel</span>
            <span>AI Integrations &amp; Chatbots</span>
            <span>Figma / UI/UX</span>
          </div>
        </div>
        <div className="photo-container">
          <img src="/images/img3.jpg" alt="Subhan" className="photo" />
          <span className="tape tape1"></span>
          <span className="tape tape2"></span>
        </div>
      </div>
    </section>
  );
};

export default About;
