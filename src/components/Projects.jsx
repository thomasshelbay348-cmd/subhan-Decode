const projectsData = [
  {
    img: '/images/Bj logo.jpg',
    alt: 'BJ Architects',
    title: 'BJ Architects website',
    description: 'BJ Architects Global architecture, 3D BIM modeling (LOD 300 to 500), and turnkey construction firm with 13+ years of international experience across Saudi Arabia, UAE, Australia, and Pakistan. Specializes in high-rise commercial planning, luxury residential design, and precise remote engineering.',
    skills: ['HTML', 'Tailwind', 'JavaScript', 'chatbot', 'Responsive Design', 'UI/UX', 'web development', 'web design', 'seo', 'vercel'],
    liveDemo: 'https://bjarchitectspk.vercel.app/',
  },
  {
    img: '/images/01.jpg',
    alt: 'Airport luggage van website',
    title: 'Airport lugguage van website',
    description: 'Airport Luggage Transfer Elite London ground logistics and luxury bulk baggage transport platform. Features an instant secure flight dispatch booking system, multi-capacity Mercedes fleet (MWB, LWB, Luton Vans), and multilingual support for private jet arrivals and executive travelers.',
    skills: ['HTML', 'React', 'Tailwind', 'JavaScript', 'UI/UX', 'Responsive Design', 'web development', 'web design', 'seo', 'vercel'],
    liveDemo: 'https://airportluggage-van.vercel.app/',
  },
  {
    img: '/images/academy logo.jpg',
    alt: 'Al fatima academy website',
    title: 'Al fatima academy website',
    description: 'Al Fatima Academy Comprehensive online Islamic education platform dedicated to Quranic learning, Tajweed, Tafseer, and Arabic language courses. Features structured online classes, certified expert tutors, flexible scheduling, and a global student portal designed for accessible distance learning.',
    skills: ['HTML', 'Tailwind', 'JavaScript', 'chatbot', 'Responsive Design', 'UI/UX', 'web development', 'web design', 'seo'],
    liveDemo: 'https://www.alfatimaacademy.com/',
  },
  {
    img: '/images/portfolio.jpg',
    alt: 'Portfolio website',
    title: 'Portfolio website',
    description: 'A multipage personal portfolio and web application built with a modular layout to showcase full-stack projects, technical expertise, work experience, and an interactive contact system.',
    skills: ['HTML', 'CSS', 'JavaScript', 'animation', 'responsive design', 'React.js', 'Tailwind css', 'web design', 'web development', 'UI/UX', 'SEO', 'vercel'],
    liveDemo: 'https://business-portfolio-ecru-gamma.vercel.app/#/',
  },
  {
    img: '/images/chat.jpg',
    alt: 'NexMove chatbot',
    title: 'NexMove chatbot',
    description: 'Developed a responsive, AI-integrated chatbot to automate customer interactions, answer service inquiries in real time, and enhance overall user engagement through intelligent conversational design and seamless integration of Gemini API for NexMove Development.',
    skills: ['HTML', 'JavaScript', 'Responsive Design', 'Gemini API', 'Primary Knowledge', 'Secondary Knowledge', 'NexMove'],
    liveDemo: 'https://thomasshelbay348-cmd.github.io/chatbot/',
  },
];

const Projects = () => {
  return (
    <section className="project reveal" id="project">
      <p>PROJECTS</p>
      <h1>Featured Work</h1>
      <hr />
      <div className="info-pro">
        <p>A showcase of my recent projects demonstrating expertise in full-stack </p>
        <p>development, modern frameworks, and creative problem-solving.</p>
      </div>
      <div className="projects-container">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.img} alt={project.alt} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="skills">
              {project.skills.map((skill, i) => (
                <a key={i}>{skill}</a>
              ))}
            </div>
            <div className="btns">
              <a href={project.liveDemo} className="btn" target="_blank" rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
