import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  Guitar,
  Crown,
  BusFront,
  AudioWaveform,
  Drum,
  Zap,
  Coffee
} from 'lucide-react';
import { Floating3DWrapper } from './components/ui/3d-card';
import { BuyMeCoffeeCard } from './components/ui/buy-me-coffee-card';
import { AboutMeSection } from './components/ui/AboutMeSection';
import { GeddyEasterEgg } from './components/ui/GeddyEasterEgg';
import { CardCarousel } from './components/ui/CardCarousel';
import { translations } from './translations.jsx';
import './index.css';

const highlightText = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /\b(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life|Rush)\b|("Working Man"|Working Man)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (/^(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life)$/.test(part)) {
      return <span key={i} className="geddy-highlight">{part}</span>;
    }
    if (/^(Rush|"Working Man"|Working Man)$/.test(part)) {
      return <span key={i} className="rush-highlight">{part}</span>;
    }
    return part;
  });
};

const CustomCrown = ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 20h16" />
    <path d="M4 17 V6 l4 8 4-8 4 8 4-8 v11 Z" />
  </svg>
);

const getTopics = (t) => [
  {
    id: 't1',
    badge: '01',
    title: t.t1Title,
    category: 'criacao',
    icon: <img src="/imgi_3_rush-bass-icon.png" alt="Rush Logo" className="custom-rush-icon" />,
    videoStart: 18,
    summary: t.t1Summary,
    detail: t.t1Detail,
  },
  {
    id: 't2',
    badge: '02',
    title: t.t2Title,
    category: 'equipamento',
    icon: <img src="/2 herois do baixo Rush - Yes Cream The Who.jpg" alt="Heróis do Baixo" className="t2-custom-icon" />,
    videoStart: 167,
    summary: t.t2Summary,
    detail: t.t2Detail,
  },
  {
    id: 't3',
    badge: '03',
    title: t.t3Title,
    category: 'equipamento',
    icon: <img src="/2button-baixo-azul-esquisito-drop-bass.png" alt="Baixo Azul Esquisito" className="t2-custom-icon" />,
    videoStart: 438,
    summary: t.t3Summary,
    detail: t.t3Detail,
  },
  {
    id: 't4',
    badge: '04',
    title: t.t4Title,
    category: 'turne',
    icon: <img src="/4-button-r50-rush-fifthysomething.png" alt="Turnê Fifty Something" className="t2-custom-icon" />,
    videoStart: 524,
    summary: t.t4Summary,
    detail: t.t4Detail,
  },
  {
    id: 't5',
    badge: '05',
    title: t.t5Title,
    category: 'criacao',
    icon: <img src="/criacao-musicas.png" alt="Criação das Músicas" className="t2-custom-icon" />,
    videoStart: 670,
    summary: t.t5Summary,
    detail: t.t5Detail,
  },
  {
    id: 't7',
    badge: '06',
    title: t.t7Title,
    category: 'bastidores',
    icon: <img src="/6-button- Alex Lifeson.png" alt="Alex Lifeson Aparece de Supetão" className="t2-custom-icon" />,
    videoStart: 2707,
    summary: t.t7Summary,
    detail: t.t7Detail,
  },
  {
    id: 't6',
    badge: '07',
    title: t.t6Title,
    category: 'turne',
    icon: <img src="/7-button-anikanilles-.png" alt="Anika Nilles Logo" className="t2-custom-icon" />,
    videoStart: 3527,
    summary: t.t6Summary,
    detail: t.t6Detail,
  }
];

const HolographicImage = ({ src, alt }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // The divisor controls the intensity of the 3D rotation
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
  };

  return (
    <div
      className="holographic-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holographic-card" ref={cardRef}>
        <img src={src} alt={alt} />
        <div className="holo-glow"></div>
        <div className="holo-glare"></div>
      </div>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = useState('pt');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [videoStart, setVideoStart] = useState(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isGershonActive, setIsGershonActive] = useState(false);
  const clickSequence = useRef([]);

  const t = translations[language];
  const topics = getTopics(t);

  const handleCardClick = (topic) => {
    // Record click history for Easter Egg
    const newSequence = [...clickSequence.current, topic.id].slice(-4);
    clickSequence.current = newSequence;

    // Check sequence: t2 -> t1 -> t1 -> t2
    if (newSequence.join(',') === 't2,t1,t1,t2') {
      setIsEasterEggActive(true);
    } else if (isEasterEggActive) {
      setIsEasterEggActive(false);
    }

    const isClosing = expandedTopic === topic.id;
    setExpandedTopic(isClosing ? null : topic.id);
    if (!isClosing) {
      setVideoStart(topic.videoStart);
    }
  };

  const videoSrc = isGershonActive
    ? 'https://www.youtube.com/embed/8WYWcGOGwog?autoplay=1'
    : (isEasterEggActive
      ? 'https://www.youtube.com/embed/wk_Dlx6VL6c?autoplay=1&rel=0'
      : (videoStart !== null
        ? `https://www.youtube.com/embed/GLkvbCn3xbw?start=${videoStart}&autoplay=1&rel=0`
        : 'https://www.youtube.com/embed/GLkvbCn3xbw?autoplay=0&showinfo=0&rel=0'));

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="https://portalrushbrasil.com.br/" target="_blank" rel="noopener noreferrer" className="nav-logo">
            <img src="/logo_portalrush.png" alt="Portal Rush Brasil" className="nav-logo-img" />
          </a>
          <div className="nav-links">
            <a href="#grid">{t.navAEntrevista}</a>
            <a href="#anika">{t.navONovoCapitulo}</a>
            <a href="#livro">{t.navLivro}</a>
            <div className="language-switcher">
              <button className={language === 'pt' ? 'active' : ''} onClick={() => setLanguage('pt')}>PT</button>
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
              <button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>ES</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="bento-bg">
        <img src="/Fundo_hero.png" alt="Cenário de Fundo" />
        <div className="bento-bg-overlay"></div>
      </div>

      {/* ===== HERO + DASHBOARD SECTION ===== */}
      <section className="dashboard-section" id="grid">
        <a href="https://buymeacoffee.com/portalrush" target="_blank" rel="noopener noreferrer" className="hero-bmc-btn-floating">
          <img src="/imgi_17_buy-me-a-coffee.png" alt="Buy Me A Coffee" />
        </a>
        <div className="bento-hero">
          <h1>{t.heroTitle}</h1>
          <div className="bento-hero-subtitle">{t.heroSubtitle}</div>
        </div>

        {/* ===== TWO-COLUMN LAYOUT: VIDEO + SIDE PANEL ===== */}
        <div className="hero-main-layout">

          {/* LEFT: YOUTUBE VIDEO (DYNAMIC) */}
          <div className="dashboard-video-pane">
            <div className="bento-video">
              <iframe
                key={videoStart}
                src={videoSrc}
                title="Geddy Lee & Alex Lifeson — Rick Beato Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* RIGHT: ALL TOPIC CARDS (THIN HORIZONTAL) + ACCORDION */}
          <aside className="hero-side-panel">
            {topics.map(topic => {
              const isExpanded = expandedTopic === topic.id;
              return (
                <div key={topic.id} className="accordion-item">
                  <div
                    className={`interactive-topic-card ${isExpanded ? 'card-active' : ''}`}
                    onClick={() => handleCardClick(topic)}
                  >
                    {/* Collapsed: thin horizontal strip */}
                    <div className="topic-card-row">
                      <div className={`topic-card-icon-wrapper ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon-wrapper' : ''}`}>
                        <div className={`topic-card-icon ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon' : ''}`}>
                          {topic.icon}
                        </div>
                      </div>
                      <h4 className="topic-card-title">{topic.title}</h4>
                      <div className="topic-card-number-wrapper">
                        <span className="topic-card-badge">{topic.badge}</span>
                      </div>
                    </div>

                    {/* Expanded accordion content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className="accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="accordion-inner">
                            <p className="topic-card-summary-expanded">{highlightText(topic.summary)}</p>
                            <div className="accordion-divider"></div>
                            {topic.detail.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{highlightText(paragraph)}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isExpanded && (
                      <span className="accordion-collapse-hint">
                        <ChevronUp size={14} /> {t.collapseHint}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </aside>

        </div>

      </section>

      {/* ===== ANIKA NILLES SECTION (DW DRUMS STYLE) ===== */}
      <section className="anika-dw-section" id="anika" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#111' }}>
        {/* Video Background Mask */}
        <div className="anika-video-mask">
          <video autoPlay loop muted playsInline className="anika-bg-video">
            <source src="/anika-bg-video.mp4" type="video/mp4" />
          </video>
          <div className="anika-video-overlay"></div>
        </div>

        {/* Top Hero Banner */}
        <div className="anika-dw-banner split-layout" style={{ position: 'relative', zIndex: 2 }}>
          <div className="anika-banner-content">
            <h2>{t.anikaHeroTitle}</h2>
            <p>{t.anikaHeroP1}</p>
            <a href="https://portalrushbrasil.com.br/anika-nilles/sobre-anika-nilles-baterista-do-rush/?utm_source=rick_beato_lp&utm_medium=website&utm_campaign=anika_nilles" target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none', textAlign: 'center' }}>
              {t.anikaHeroBtn}
            </a>
          </div>
          <div className="anika-banner-image-container">
            <a href="https://portalrushbrasil.com.br/anika-nilles/sobre-anika-nilles-baterista-do-rush/?utm_source=rick_beato_lp&utm_medium=website&utm_campaign=anika_nilles" target="_blank" rel="noopener noreferrer" style={{display: 'block', height: '100%'}}>
              <HolographicImage
                src="/incompleto-Sobre-Anika-Nilles-about-story.jpg"
                alt="Anika Nilles"
              />
            </a>
          </div>
        </div>

        {/* Bottom Collection Grid (HIDDEN BACKUP) */}
        {false && (
          <div className="anika-dw-grid-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="anika-grid-header" style={{ position: 'relative', zIndex: 2 }}>
              <h3>{t.anikaGridTitle}</h3>
              <p>{t.anikaGridSubtitle}</p>
            </div>

            <div className="anika-dw-grid" style={{ position: 'relative', zIndex: 2 }}>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src="/anika_prato.png" alt="Técnica Rítmica - Anika Nilles" style={{ objectPosition: 'top' }} />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel1}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src="/anika_ensaio_intenso.png" alt="Ensaios Intensos - Anika Nilles" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel2}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src="/trio_pb.png" alt="Novo Setlist - Geddy, Alex e Anika" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel3}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src="/anika_energia.png" alt="Energia Contagiante - Anika Nilles" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel4}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== CARD CAROUSEL (SNAP / CENTER MODE) ===== */}
      <CardCarousel />

      {/* ===== SOBRE MIM SECTION (4TH FOLD) ===== */}
      <AboutMeSection t={t} />

      {/* ===== INTERACTIVE SCULPTURE EASTER EGG ===== */}
      <GeddyEasterEgg 
        onSuccess={() => {
          setIsGershonActive(true);
          document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
        }} 
        t={t} 
      />

      {/* ===== CONTEXTUAL BOOK BANNER (MOVED DOWN) ===== */}
      <section className="bento-hero" id="livro" style={{ minHeight: 'auto', padding: '0 5% 4rem 5%', display: 'flex', justifyContent: 'center' }}>
        <div className="bento-grid-footer" style={{ marginTop: 0, width: '100%', maxWidth: '1200px' }}>
          <div className="bento-card bento-cta bento-card-purple">
            <span className="card-badge">{t.bonusBadge}</span>
            <h3 className="card-title">{t.bonusTitle}</h3>
            <p className="card-text">
              {t.bonusText1}<strong>"My Effin' Life"</strong>. {t.bonusText2}<strong>Editora Belas Letras</strong>.
            </p>
            <a href="https://www.belasletras.com.br/" target="_blank" rel="noopener noreferrer" className="btn-cta-large">
              {t.bonusBtn}
            </a>
          </div>
        </div>
      </section>



      {/* ===== SUPPORT & FOOTER SECTION ===== */}
      <footer className="footer">
        <video 
          className="footer-video-bg" 
          src="/Banner_Animado_Desktop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        ></video>
        <div className="footer-video-overlay"></div>

        <div className="footer-content-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "60px", position: "relative", zIndex: 2 }}>
          <BuyMeCoffeeCard
            image="/imgi_17_buy-me-a-coffee.png"
            coffeeLink="https://buymeacoffee.com/portalrush"
            title={t.bmcTitle}
            description={t.bmcDesc}
            buttonText={t.bmcBtn}
          />

          <div style={{ marginTop: '32px', textAlign: 'center', width: '100%' }}>
            <p style={{ color: '#7bcfe7', fontSize: '0.85rem', fontFamily: 'var(--font-body)', letterSpacing: '0.05em', marginBottom: '0', opacity: 0.9, paddingBottom: '16px' }}>
              15 anos de conteúdos sobre o RUSH
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', marginLeft: 'calc(-50vw + 50%)', gap: 0 }}>
            {[
              { num: 1, href: 'https://www.camisasdorush.com.br/colecoes/geddy-lee/' },
              { num: 2, href: 'https://www.camisasdorush.com.br/colecoes/neil-peart/' },
              { num: 3, href: 'https://www.camisasdorush.com.br/colecoes/alex-lifeson/' },
              { num: 4, href: 'https://www.camisasdorush.com.br/colecoes/albuns/' },
              { num: 5, href: 'https://www.camisasdorush.com.br/colecoes/minimalista/' },
            ].map(({ num, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" key={num} style={{ display: 'block', width: '20%', aspectRatio: '1 / 1', overflow: 'hidden', flexShrink: 0, position: 'relative' }}
                onMouseEnter={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}
              >
                <img src={`/banner-${num}.webp`} alt={`Coleção ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Portal Rush Brasil</h3>
              <p>{t.footerBrandDesc}</p>
            </div>
            <div className="footer-links">
              <h4>{t.footerExplore}</h4>
              <ul>
                <li><a href="#grid">{t.navAEntrevista}</a></li>
                <li><a href="#anika">{t.navONovoCapitulo}</a></li>
                <li><a href="#livro">{t.footerLink3}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footerCopyright}</span>
            <span>{t.footerDisclaimer}</span>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a
        href="https://api.whatsapp.com/send?phone=5531972102112&text=Ol%C3%A1%2C%20pessoal%20do%20Portal%20Rush%20Brasil.%20%F0%9F%A6%89%F0%9F%8E%B8%F0%9F%A5%81%F0%9F%8E%B8Cheguei%20aqui%20atrav%C3%A9s%20do%20site%20do%20Portal.%20RUSH%20ON!"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <img src="/whatsapp-icon.png" alt="WhatsApp" />
      </a>

    </>
  );
};

export default App;
