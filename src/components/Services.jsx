const servicesData = [
  {
    icon: 'fas fa-code',
    title: 'Web Development',
    description: 'I create responsive, modern websites using the latest technologies and best practices. From concept to deployment, I ensure your website looks great and performs perfectly.',
    features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly'],
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile Development',
    description: 'Building cross-platform mobile applications that work seamlessly on both iOS and Android devices using modern frameworks and tools.',
    features: ['Cross-Platform', 'Native Performance', 'User-Friendly'],
  },
  {
    icon: 'fas fa-palette',
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus on usability, accessibility, and visual appeal.',
    features: ['User-Centered', 'Modern Design', 'Accessibility'],
  },
  {
    icon: 'fas fa-rocket',
    title: 'Performance Optimization',
    description: 'Optimizing websites and applications for speed, scalability, and reliability. I ensure your digital products perform at their best under any conditions.',
    features: ['Fast Loading', 'Scalable', 'Reliable'],
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'E-commerce Solutions',
    description: 'Building secure and efficient e-commerce platforms that drive sales and provide excellent shopping experiences for your customers.',
    features: ['Secure Payments', 'Inventory Management', 'Analytics'],
  },
  {
    icon: 'fas fa-cogs',
    title: 'API Development',
    description: 'Creating robust and scalable APIs that power your applications. I build RESTful and GraphQL APIs with proper documentation and testing.',
    features: ['RESTful APIs', 'GraphQL', 'Documentation'],
  },
];

const Services = () => {
  return (
    <section id="service" className="section services reveal">
      <p>SERVICES</p>
      <h1>OUR Features &amp; Services</h1>
      <hr />
      <div className="container">
        <div className="services-content">
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, i) => (
                    <span key={i}>{feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
