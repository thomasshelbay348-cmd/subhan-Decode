import { useEffect, useState } from 'react';

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hi, I'm Subhan";

  useEffect(() => {
    let i = 0;
    let timer;

    const typeChar = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
        timer = setTimeout(typeChar, 100);
      }
    };

    timer = setTimeout(typeChar, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="home" id="home">
      <p className="home-p">
        <span className="home-s">. </span>Available for freelance work
      </p>
      <div className="home-container">
        <div className="home-section">
          <div className="info-home">
            <h1 className="typewriter">{displayedText}</h1>
            <h3>Full-Stack MERN Developer &amp; AI Integration Specialist</h3>
            <div className="info-p">
              <p>Empowering modern businesses through scalable MERN stack web applications, AI Chatbots,
                AI integrations, and streamlined digital management systems built for high
                performance and growth.
              </p>
            </div>
            <div className="info-p2">
              <p><i className="fa-solid fa-location-dot"></i> Based in Pakistan</p>
              <p><i className="fa-solid fa-briefcase"></i> Available Now</p>
            </div>
            <div className="btnn">
              <a href="#contact">
                <button className="btn-home1"><i className="fa-solid fa-arrow-right"></i> Hire Me</button>
              </a>
              <a href="/images/Subhan_Ahmad_Resume.pdf" download>
                <button className="btn-home2"><i className="fa-solid fa-download"></i> Download CV</button>
              </a>
            </div>
            <div className="hhr">
              <hr />
            </div>
            <div className="follow">
              <p className="followw">Follow me:</p>
              <ul>
                <li><a href="https://github.com/thomasshelbay348-cmd" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/subhan-shiekh12345" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/cod.exdesign" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img id="heroImage" src="/images/img3.jpg" alt="Subhan Hero" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Home;
