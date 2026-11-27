import { useEffect, useMemo, useRef, useState } from 'react';
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
  Upload,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import Hero3D from './components/Hero3D.jsx';

const initialPhotos = [
  {
    id: 'sample-1',
    title: 'Silent Horizons',
    category: 'Nature',
    location: 'Dolomites, Italy',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85',
    size: 'large',
    uploaded: false,
  },
  {
    id: 'sample-2',
    title: 'Golden Hour',
    category: 'Architecture',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000&q=85',
    size: 'small',
    uploaded: false,
  },
  {
    id: 'sample-3',
    title: 'Into the Wild',
    category: 'Nature',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000&q=85',
    size: 'small',
    uploaded: false,
  },
  {
    id: 'sample-4',
    title: 'Urban Poetry',
    category: 'Street',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&q=85',
    size: 'large',
    uploaded: false,
  },
  {
    id: 'sample-5',
    title: 'The Quiet Coast',
    category: 'Travel',
    location: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000&q=85',
    size: 'small',
    uploaded: false,
  },
  {
    id: 'sample-6',
    title: 'Desert Dreams',
    category: 'Travel',
    location: 'Sahara, Morocco',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=85',
    size: 'small',
    uploaded: false,
  },
];

const categories = ['All', 'Nature', 'Architecture', 'Street', 'Travel', 'Your Uploads'];

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = window.setInterval(() => {
      value = Math.min(value + Math.ceil(Math.random() * 13), 100);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(interval);
        window.setTimeout(onComplete, 350);
      }
    }, 85);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
    >
      <div className="preloader-grain" />
      <motion.div
        className="preloader-mark"
        initial={{ opacity: 0, y: 22, letterSpacing: '0.45em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        PIXORA<span>.</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        EVERY FRAME HOLDS A STORY
      </motion.p>
      <div className="preloader-track">
        <motion.span animate={{ width: `${progress}%` }} transition={{ ease: 'linear', duration: 0.12 }} />
      </div>
      <div className="preloader-meta">
        <span>PREPARING YOUR EXPERIENCE</span>
        <span>{String(progress).padStart(2, '0')}%</span>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const move = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    window.addEventListener('pointermove', move);
    document.body.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('pointermove', move);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const heroRef = useRef(null);
  const fileInputRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const heroContentParallax = useTransform(scrollYProgress, [0, 1], [0, -55]);

  const allPhotos = useMemo(
    () => [...initialPhotos, ...uploadedPhotos],
    [uploadedPhotos]
  );

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return allPhotos;
    if (activeCategory === 'Your Uploads') return uploadedPhotos;
    return allPhotos.filter((photo) => photo.category === activeCategory);
  }, [activeCategory, allPhotos, uploadedPhotos]);

  const closePhoto = () => setSelectedPhoto(null);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePhoto();
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id);
        if (index === -1 || filteredPhotos.length < 2) return;
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + direction + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto, filteredPhotos]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (!imageFiles.length) {
      setUploadMessage('Please choose an image file.');
      event.target.value = '';
      return;
    }

    const remainingSlots = Math.max(0, 30 - uploadedPhotos.length);
    const acceptedFiles = imageFiles.slice(0, remainingSlots);

    if (!acceptedFiles.length) {
      setUploadMessage('Upload limit reached (30 images). Remove an upload to add another.');
      event.target.value = '';
      return;
    }

    const newPhotos = acceptedFiles.map((file, index) => ({
      id: `upload-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
      title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      category: 'Your Uploads',
      location: 'Added from your device',
      image: URL.createObjectURL(file),
      size: 'small',
      uploaded: true,
    }));

    setUploadedPhotos((current) => [...current, ...newPhotos]);
    setActiveCategory('Your Uploads');
    setUploadMessage(
      imageFiles.length > acceptedFiles.length
        ? `${acceptedFiles.length} image(s) added. The gallery limit is 30 uploads.`
        : `${acceptedFiles.length} image(s) added to your collection.`
    );
    event.target.value = '';
  };

  const removeUpload = (photoId) => {
    setUploadedPhotos((current) => {
      const photoToRemove = current.find((photo) => photo.id === photoId);
      if (photoToRemove) URL.revokeObjectURL(photoToRemove.image);
      return current.filter((photo) => photo.id !== photoId);
    });
    if (selectedPhoto?.id === photoId) setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    if (!selectedPhoto || filteredPhotos.length < 2) return;
    const index = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id);
    const nextIndex = (index + direction + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const openUpload = () => fileInputRef.current?.click();

  return (
    <div className="app">
      <AnimatePresence>{isLoading && <Preloader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <CustomCursor />

      <input
        ref={fileInputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        aria-label="Choose images to upload"
      />

      <header className="navbar">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          PIXORA<span>.</span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <div className="nav-actions">
          <button type="button" className="nav-upload" onClick={openUpload}>
            <Upload size={14} /> Upload Images
          </button>
          <a href="#gallery" className="nav-cta">
            Explore Collection <ArrowUpRight size={15} />
          </a>
        </div>

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

          <motion.div className="hero-content" style={{ y: heroContentParallax }}>
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <span /> THE ART OF SEEING DIFFERENTLY
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
              Every frame<br />holds a <em>story.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              A curated collection of moments, places and perspectives. Discover the extraordinary in the ordinary.
            </motion.p>
            <motion.a href="#gallery" className="hero-button" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
              Discover the gallery <ArrowRight size={17} />
            </motion.a>
          </motion.div>

          <div className="hero-bottom">
            <span>01 — 06 / CURATED VISUAL STORIES</span>
            <a href="#gallery">SCROLL TO EXPLORE <ArrowDown size={14} /></a>
          </div>
        </section>

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
              <h2>Visual <em>stories.</em></h2>
            </div>
            <p>Different worlds. Different perspectives.<br />One place to experience them all.</p>
          </motion.div>

          <div className="gallery-toolbar">
            <div className="filter-bar">
              <div className="filters">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={activeCategory === category ? 'filter active' : 'filter'}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    {category === 'Your Uploads' && uploadedPhotos.length > 0 && (
                      <span className="filter-count">{uploadedPhotos.length}</span>
                    )}
                  </button>
                ))}
              </div>
              <span className="photo-count">
                {filteredPhotos.length.toString().padStart(2, '0')} PHOTOGRAPHS
              </span>
            </div>
            <button type="button" className="upload-button" onClick={openUpload}>
              <Upload size={16} /> ADD YOUR PHOTOGRAPHS
            </button>
          </div>

          <AnimatePresence mode="wait">
            {uploadMessage && (
              <motion.div
                className="upload-message"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="status"
              >
                <span>{uploadMessage}</span>
                <button type="button" onClick={() => setUploadMessage('')} aria-label="Dismiss message"><X size={15} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="photo-grid">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.article
                  key={photo.id}
                  layout
                  className={`photo-card ${photo.size} ${photo.uploaded ? 'uploaded-card' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${photo.title}`}
                  initial={{ opacity: 0, y: 55, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  whileHover={{ rotateX: 2.5, rotateY: -2.5, scale: 1.015, z: 20 }}
                  whileTap={{ scale: 0.985 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.55, delay: Math.min(index * 0.045, 0.2), ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedPhoto(photo)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <div className="photo-image">
                    <img src={photo.image} alt={photo.title} loading="lazy" />
                    <div className="photo-hover"><span>VIEW PHOTOGRAPH</span><Maximize2 size={19} /></div>
                    {photo.uploaded && (
                      <button
                        type="button"
                        className="remove-upload"
                        aria-label={`Remove ${photo.title}`}
                        title="Remove upload"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeUpload(photo.id);
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
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

          {filteredPhotos.length === 0 && (
            <div className="empty-gallery">
              <Camera size={30} />
              <h3>Your collection starts here.</h3>
              <p>Upload photographs from your device to see them in this space.</p>
              <button type="button" className="upload-button" onClick={openUpload}><Upload size={16} /> UPLOAD PHOTOS</button>
            </div>
          )}
          <p className="upload-note">Your uploads are currently available in this browser session only. Cloud storage will be added with the AWS S3 integration.</p>
        </section>

        <motion.section
          className="statement"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0, y: 70 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, staggerChildren: 0.15 } },
          }}
        >
          <motion.div className="statement-icon" variants={{ hidden: { opacity: 0, rotate: -70, scale: 0.6 }, visible: { opacity: 1, rotate: 0, scale: 1 } }} transition={{ duration: 0.7 }}>
            <Camera size={23} strokeWidth={1.3} />
          </motion.div>
          <motion.span className="section-label" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>BEYOND THE LENS</motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0 } }}>
            Photography is the<br />art of <em>remembering.</em>
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            PIXORA is a space dedicated to visual storytelling. A place where every photograph captures more than just a moment — it captures a feeling.
          </motion.p>
        </motion.section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">PIXORA<span>.</span></a>
        <span>© 2026 PIXORA. STORIES IN EVERY FRAME.</span>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="social-link">
          <Instagram size={17} /> INSTAGRAM
        </a>
      </footer>

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
            <button type="button" className="lightbox-close" onClick={closePhoto} aria-label="Close image"><X size={25} /></button>
            {filteredPhotos.length > 1 && (
              <>
                <button type="button" className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); navigatePhoto(-1); }} aria-label="Previous image"><ChevronLeft size={27} /></button>
                <button type="button" className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); navigatePhoto(1); }} aria-label="Next image"><ChevronRight size={27} /></button>
              </>
            )}
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94, y: 22 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 22 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              <div className="lightbox-info">
                <div><h2>{selectedPhoto.title}</h2><p>{selectedPhoto.location}</p></div>
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
