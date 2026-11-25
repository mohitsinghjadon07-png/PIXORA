import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Menu,
  X,
  Instagram,
  Maximize2,
} from 'lucide-react';
import Hero3D from './components/Hero3D.jsx';

const photos = [
  {
    id: 1,
    title: 'Silent Horizons',
    category: 'Nature',
    location: 'Dolomites, Italy',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85',
    size: 'large',
  },
  {
    id: 2,
    title: 'Golden Hour',
    category: 'Architecture',
    location: 'Dubai, UAE',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000&q=85',
    size: 'small',
  },
  {
    id: 3,
    title: 'Into the Wild',
    category: 'Nature',
    location: 'Iceland',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000&q=85',
    size: 'small',
  },
  {
    id: 4,
    title: 'Urban Poetry',
    category: 'Street',
    location: 'Tokyo, Japan',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&q=85',
    size: 'large',
  },
  {
    id: 5,
    title: 'The Quiet Coast',
    category: 'Travel',
    location: 'Amalfi Coast, Italy',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000&q=85',
    size: 'small',
  },
  {
    id: 6,
    title: 'Desert Dreams',
    category: 'Travel',
    location: 'Sahara, Morocco',
    image:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=85',
    size: 'small',
  },
];

const categories = ['All', 'Nature', 'Architecture', 'Street', 'Travel'];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 110]);

  const heroContentParallax = useTransform(scrollYProgress, [0, 1], [0, -55]);

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  // Close the lightbox with Escape and prevent background scrolling.
  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  // Close the mobile navigation when the screen becomes wider.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openPhoto = (photo) => setSelectedPhoto(photo);
  const closePhoto = () => setSelectedPhoto(null);

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          PIXORA<span>.</span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </nav>

        <a href="#gallery" className="nav-cta">
          Explore Collection <ArrowUpRight size={15} />
        </a>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home" ref={heroRef}>
          <motion.div
            className="hero-image"
            style={{ y: heroParallax }}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />

          <div className="hero-overlay" />

          <Hero3D />

          <motion.div
            className="hero-content"
            style={{ y: heroContentParallax }}
          >
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span /> THE ART OF SEEING DIFFERENTLY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Every frame
              <br />
              holds a <em>story.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              A curated collection of moments, places and perspectives. Discover
              the extraordinary in the ordinary.
            </motion.p>

            <motion.a
              href="#gallery"
              className="hero-button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Discover the gallery <ArrowRight size={17} />
            </motion.a>
          </motion.div>

          <div className="hero-bottom">
            <span>01 — 06 / CURATED VISUAL STORIES</span>
            <a href="#gallery">
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </a>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery-section" id="gallery">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="section-label">THE COLLECTION / 2026</span>
              <h2>
                Visual <em>stories.</em>
              </h2>
            </div>

            <p>
              Different worlds. Different perspectives.
              <br />
              One place to experience them all.
            </p>
          </motion.div>

          <div className="filter-bar">
            <div className="filters">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category ? 'filter active' : 'filter'
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="photo-count">
              {filteredPhotos.length.toString().padStart(2, '0')} PHOTOGRAPHS
            </span>
          </div>

          <motion.div layout className="photo-grid">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.article
                  key={photo.id}
                  layout
                  className={`photo-card ${photo.size}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${photo.title}`}
                  initial={{ opacity: 0, y: 65, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  whileHover={{
                    rotateX: 3,
                    rotateY: -3,
                    scale: 1.02,
                    z: 25,
                  }}
                  whileTap={{ scale: 0.98 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => openPhoto(photo)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openPhoto(photo);
                    }
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                >
                  <div className="photo-image">
                    <img src={photo.image} alt={photo.title} loading="lazy" />

                    <div className="photo-hover">
                      <span>VIEW PHOTOGRAPH</span>
                      <Maximize2 size={19} />
                    </div>
                  </div>

                  <div className="photo-info">
                    <div>
                      <h3>{photo.title}</h3>
                      <span>{photo.location}</span>
                    </div>
                    <span className="photo-category">{photo.category}</span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ABOUT */}
        <motion.section
          className="statement"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0, y: 70 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.9,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="statement-icon"
            variants={{
              hidden: { opacity: 0, rotate: -70, scale: 0.6 },
              visible: { opacity: 1, rotate: 0, scale: 1 },
            }}
            transition={{ duration: 0.7 }}
          >
            <Camera size={23} strokeWidth={1.3} />
          </motion.div>

          <motion.span
            className="section-label"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            BEYOND THE LENS
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Photography is the
            <br />
            art of <em>remembering.</em>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            PIXORA is a space dedicated to visual storytelling. A place where
            every photograph captures more than just a moment — it captures a
            feeling.
          </motion.p>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="logo">
          PIXORA<span>.</span>
        </a>

        <span>© 2026 PIXORA. STORIES IN EVERY FRAME.</span>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <Instagram size={17} /> INSTAGRAM
        </a>
      </footer>

      {/* IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPhoto.title} photograph`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePhoto}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={closePhoto}
              aria-label="Close image"
            >
              <X size={25} />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />

              <div className="lightbox-info">
                <div>
                  <h2>{selectedPhoto.title}</h2>
                  <p>{selectedPhoto.location}</p>
                </div>
                <span>{selectedPhoto.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
