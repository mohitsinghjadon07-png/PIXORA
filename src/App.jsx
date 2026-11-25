import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Menu,
  X,
  Instagram,
  Heart,
  Maximize2,
} from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Silent Horizons",
    category: "Nature",
    location: "Dolomites, Italy",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
    size: "large",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Architecture",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000",
    size: "small",
  },
  {
    id: 3,
    title: "Into the Wild",
    category: "Nature",
    location: "Iceland",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000",
    size: "small",
  },
  {
    id: 4,
    title: "Urban Poetry",
    category: "Street",
    location: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200",
    size: "large",
  },
  {
    id: 5,
    title: "The Quiet Coast",
    category: "Travel",
    location: "Amalfi Coast, Italy",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000",
    size: "small",
  },
  {
    id: 6,
    title: "Desert Dreams",
    category: "Travel",
    location: "Sahara, Morocco",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000",
    size: "small",
  },
];

const categories = ["All", "Nature", "Architecture", "Street", "Travel"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          PIXORA<span>.</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <a href="#gallery" className="nav-cta">
          Explore Collection <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />

          <div className="hero-overlay" />

          <div className="hero-content">
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
              A curated collection of moments, places and perspectives.
              Discover the extraordinary in the ordinary.
            </motion.p>

            <motion.a
              href="#gallery"
              className="hero-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Discover the gallery <ArrowRight size={17} />
            </motion.a>
          </div>

          <div className="hero-bottom">
            <span>01 — 06 / CURATED VISUAL STORIES</span>
            <a href="#gallery">
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-heading">
            <div>
              <span className="section-label">THE COLLECTION / 2026</span>
              <h2>Visual <em>stories.</em></h2>
            </div>

            <p>
              Different worlds. Different perspectives.
              <br />
              One place to experience them all.
            </p>
          </div>

          <div className="filter-bar">
            <div className="filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? "filter active" : "filter"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="photo-count">
              {filteredPhotos.length.toString().padStart(2, "0")} PHOTOGRAPHS
            </span>
          </div>

          <motion.div layout className="photo-grid">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.article
                  layout
                  key={photo.id}
                  className={`photo-card ${photo.size}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedPhoto(photo)}
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

        <section className="statement" id="about">
          <div className="statement-icon">
            <Camera size={23} strokeWidth={1.3} />
          </div>
          <span className="section-label">BEYOND THE LENS</span>
          <h2>
            Photography is the
            <br />
            art of <em>remembering.</em>
          </h2>
          <p>
            PIXORA is a space dedicated to visual storytelling.
            A place where every photograph captures more than just
            a moment — it captures a feeling.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a href="#" className="logo">
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

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close image"
            >
              <X size={25} />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
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
