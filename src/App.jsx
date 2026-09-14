import { useEffect, useState, useRef } from 'react';
import { init } from '@emailjs/browser';

import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import WorkTogether from './components/WorkTogether';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ChatbotFloat from './components/ChatbotFloat';

// Initialize EmailJS once
init({ publicKey: '2eEd0dIPHNhOQKA4t' });

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('introPlayed') !== 'true';
  });
  const [introFading, setIntroFading] = useState(false);
  const hasRunIntro = useRef(false);

  // ===== INTRO ANIMATIONS & TRANSITION =====
  useEffect(() => {
    if (!showIntro) return;

    // Force page to start at top on load
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const animations = [
      { selector: '.top-tags', cls: 'from-top', delay: 0 },
      { selector: '.left h1', cls: 'from-left', delay: 0.1 },
      { selector: '.desc', cls: 'from-left', delay: 0.2 },
      { selector: '.live-line', cls: 'from-bottom', delay: 0.3 },
      { selector: '.buttons', cls: 'zoom-in', delay: 0.4 },
      { selector: '.site-link', cls: 'from-bottom', delay: 0.5 },
      { selector: '.right', cls: 'from-right', delay: 0.2 },
      { selector: '.stats', cls: 'from-bottom', delay: 0.6 },
    ];

    // Small delay to ensure DOM is ready
    const animTimeout = setTimeout(() => {
      animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
          el.style.animationDelay = `${item.delay}s`;
          el.classList.add(item.cls);
        }
      });
    }, 50);

    // Hide intro after 1800ms, fade out for 600ms, then show site
    const hideTimeout = setTimeout(() => {
      setIntroFading(true);
      setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('introPlayed', 'true');
      }, 600);
    }, 1800);

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  // ===== SCROLL REVEAL =====
  const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach(el => observer.observe(el));
  };

  // ===== SCROLL REVEAL — runs after React renders the main site =====
  useEffect(() => {
    if (showIntro) return; // only run when site is visible
    // Small delay ensures DOM is fully painted before observing
    const t = setTimeout(initScrollAnimations, 100);
    return () => clearTimeout(t);
  }, [showIntro]);

  // ===== SMOOTH SCROLL for anchor links (non-nav links e.g. Hire Me, footer) =====
  useEffect(() => {
    if (showIntro) return;

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();

      const href = anchor.getAttribute('href');
      
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

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [showIntro]);

  return (
    <>
      {/* INTRO SCREEN */}
      {showIntro && (
        <div className={introFading ? 'smooth-out' : ''} style={{ display: 'block' }}>
          <Intro />
        </div>
      )}

      {/* MAIN SITE */}
      {!showIntro && (
        <div id="real-site">
          <Navbar />
          <Home />
          <About />
          <Projects />
          <Services />
          <WorkTogether />
          <Contact />
          <Footer />
          <WhatsAppFloat />
          <ChatbotFloat />
        </div>
      )}
    </>
  );
}

export default App;
