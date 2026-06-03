import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const CAROUSEL_DATA = [
  {
    id: 1,
    src: '/rush-reposted-portal-rush1.jpg',
    topTitle: 'Rush South Park',
    description: 'Repostado pelo @RUSH - South Park.',
    link: 'https://www.instagram.com/stories/highlights/18281584825282043/'
  },
  {
    id: 2,
    src: '/Jillian-Maryonovich-rushcon.jpg',
    topTitle: 'RushCon',
    description: 'Jillian Maryonovich - Diretora Criativa da RushCon. "You work is fantastic! Really fun stuff".',
    link: 'https://x.com/RushFanCast/status/1854733719627608282'
  },
  {
    id: 3,
    src: '/portal-rush-mtv-hulk.jpg',
    topTitle: 'MTV Hulk',
    description: 'Carol Zaine - Portal Rush Brasil - MTV - HULK.JPG',
    link: 'https://www.flickr.com/photos/carolzaine/albums/72157625125588376/'
  },
  {
    id: 4,
    src: '/cerveja-do-rush.jpg',
    topTitle: 'Cerveja do Rush',
    description: 'Matéria sobre a cerveja do Rush.',
    link: 'https://portalrushbrasil.com.br/cerveja-do-rush-reuniao/'
  },
  {
    id: 5,
    src: '/tf4-portal-rush.png',
    topTitle: 'T4F Tickets for Fun',
    description: '"Sou Regis, da Tel. Estamos a procura de uns fã do fush para uma materia de TV..." - Regis Motisuki.',
    link: 'https://imgur.com/a/1RMtEPL'
  },
  {
    id: 6,
    src: '/rush-staff-craig-blazier.png',
    topTitle: 'Craig Blazier',
    description: '"Great shirts!! The crew and band will get a kick out of them when I wear them. Thanks!!" - Gerente de Produção do Rush.',
    link: 'https://imgur.com/a/Zp0oVfJ'
  },
  {
    id: 7,
    src: '/something-for-nothing-139.png',
    topTitle: 'Maior Podcast do Rush',
    description: '"That might be the best email you ever read" - Steve. Podcast sobre o Rush no Mundo - Episódio 139.',
    link: 'https://open.spotify.com/episode/03wWuhH49Z4YNSOryKAX6f'
  },
  {
    id: 8,
    src: '/primeiro-show-cover-rio.jpg',
    topTitle: 'Carbonmade Portfolio',
    description: 'Carbonmade Portal Rush Brasil Tanios Acacio Portfolio.jpg',
    link: 'https://imgur.com/a/rgfIrin'
  },
  {
    id: 9,
    src: '/rush-festival-galpao.jpg',
    topTitle: 'Rush Festival 2016',
    description: 'Rush Festival Brasil 2016',
    link: 'https://imgur.com/a/gmbKqKu'
  },
  {
    id: 10,
    src: '/rush-cover-rio-2010.jpg',
    topTitle: 'Rush Festival 2015',
    description: 'Rush Festival Brasil - 2015',
    link: 'https://portalrushbrasil.com.br/rush-festival-brasil-2015/'
  },
  {
    id: 11,
    src: '/rushfest-2022.png',
    topTitle: 'Rush Fest 2022',
    description: 'Rush Fest 2022',
    link: 'https://portalrushbrasil.com.br/rush-fest-2022/'
  },
  {
    id: 12,
    src: '/rush-room-tanios.jpg',
    topTitle: 'Rushfans',
    description: '"Hi Tanios! This sounds like a neat project, and good designs too. Keep me posted!" - Ryan from Rushfans.',
    link: '#' 
  },
  {
    id: 13,
    src: '/2112-ticket.jpg',
    topTitle: 'Rush History',
    description: 'Mais um marco na história da comunidade do Rush.',
    link: '#'
  },
  {
    id: 14,
    src: '/rush-staff-bruce-frenchie.png',
    topTitle: 'Rush Staff',
    description: 'Equipe e membros importantes da comunidade do Rush.',
    link: '#'
  },
  {
    id: 15,
    src: '/rush-in-rio2.jpg',
    topTitle: 'Rush in Rio',
    description: 'Rush in Rio - O momento inesquecível da turnê sul-americana.',
    link: '#'
  },
  {
    id: 16,
    src: '/rushinrio2-sp-mtv.jpg',
    topTitle: 'Rush in Rio SP MTV',
    description: 'Matéria e lembranças sobre o show de São Paulo.',
    link: '#'
  },
  {
    id: 17,
    src: '/something-for-nothing-podcast.png',
    topTitle: 'Something For Nothing',
    description: 'Podcast Something for Nothing - Uma análise da discografia e influência do Rush.',
    link: '#'
  },
  {
    id: 18,
    src: '/stories-geddy-lee.jpg',
    topTitle: 'Stories Geddy Lee',
    description: 'Interações e compartilhamentos via Stories.',
    link: '#'
  },
  {
    id: 19,
    src: '/tanios-amigos-rio.jpg',
    topTitle: 'Comunidade',
    description: 'Momentos com os amigos e fãs de Rush no Rio de Janeiro.',
    link: '#'
  },
  {
    id: 20,
    src: '/tanios-whiplash.jpg',
    topTitle: 'Whiplash',
    description: 'Entrevistas e contribuições para o portal Whiplash.',
    link: '#'
  }
];

export const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length);
  };

  const handleCardClick = (idx) => {
    setCurrentIndex(idx);
  };

  // Auto-play effect: changes the highlighted card every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextCard();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="interactive-carousel-section" id="carousel">
      <div className="interactive-carousel-container">
        
        <button className="carousel-nav-btn prev-btn" onClick={prevCard} aria-label="Anterior">
          <ChevronLeft size={32} />
        </button>

        <div className="carousel-cards-wrapper">
          <AnimatePresence initial={false} mode="popLayout">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const len = CAROUSEL_DATA.length;
              const index = (currentIndex + offset + len) % len;
              const item = CAROUSEL_DATA[index];
              const isCenter = offset === 0;
              const absDiff = Math.abs(offset);

              // Animation values
              const scale = isCenter ? 1.05 : 0.85;
              const opacity = isCenter ? 1 : 0.5;
              const zIndex = 10 - absDiff;
              const xPos = offset * 260; // spacing in pixels

              return (
                <motion.div
                  key={item.id}
                  className={`interactive-carousel-card ${isCenter ? 'active' : ''}`}
                  onClick={() => handleCardClick(index)}
                  initial={{ 
                    x: xPos + (offset > 0 ? 260 : -260), 
                    opacity: 0, 
                    scale: 0.5 
                  }}
                  animate={{
                    x: xPos,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  exit={{ 
                    x: xPos + (offset < 0 ? -260 : 260), 
                    opacity: 0, 
                    scale: 0.5 
                  }}
                  transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                >
                  
                  {isCenter && (
                    <motion.div 
                      className="carousel-card-top-box"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span className="top-box-title">{item.topTitle}</span>
                    </motion.div>
                  )}

                  <div className="carousel-card-image-wrapper">
                    <img src={item.src} alt={item.topTitle} loading="lazy" />
                  </div>

                  {isCenter && (
                    <motion.div 
                      className="carousel-card-bottom-box"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <h4 className="bottom-box-title">Module Overview</h4>
                      <p className="bottom-box-desc">{item.description}</p>
                      
                      {item.link !== '#' && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="bottom-box-link">
                          Explore History <ExternalLink size={14} />
                        </a>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button className="carousel-nav-btn next-btn" onClick={nextCard} aria-label="Próximo">
          <ChevronRight size={32} />
        </button>

      </div>
    </section>
  );
};
