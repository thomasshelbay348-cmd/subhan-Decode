import { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const closeMenu = () => setMenuOpen(false);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 20;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  // Active section highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', icon: 'fa-solid fa-circle-user', label: 'Home', id: 'home' },
    { href: '#about', icon: 'fa-regular fa-address-card', label: 'About', id: 'about' },
    { href: '#project', icon: 'fa-regular fa-folder-open', label: 'Projects', id: 'project' },
    { href: '#service', icon: 'fa-solid fa-code', label: 'Services', id: 'service' },
    { href: '#contact', icon: 'fa-regular fa-envelope', label: 'Contact', id: 'contact' },
  ];

  return (
    <header>
      <div className="div-list">
        <div className="menu-toggle" id="mobile-menu" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <ul className={`ul-list${menuOpen ? ' active' : ''}`} id="nav-list">
          {navLinks.map(link => (
            <li key={link.id} className={activeSection === link.id ? 'active' : ''}>
              <i className={link.icon}></i>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
