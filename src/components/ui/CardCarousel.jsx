import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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

// Duplicate the array for seamless infinite loop
const DOUBLED_DATA = [...CAROUSEL_DATA, ...CAROUSEL_DATA];

export const CardCarousel = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  const handleCardClick = (item) => {
    if (selectedCardId === item.id) {
      // Deselect
      setSelectedCardId(null);
      setIsPaused(false);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      return;
    }
    // Select card
    setSelectedCardId(item.id);
    setIsPaused(true);
    // Auto-resume after 8 seconds
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setSelectedCardId(null);
      setIsPaused(false);
    }, 8000);
  };

  const cardWidth = 200; // px
  const gap = 16; // px
  const totalWidth = CAROUSEL_DATA.length * (cardWidth + gap);

  return (
    <section className="interactive-carousel-section" id="carousel">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        .marquee-track {
          display: flex;
          gap: ${gap}px;
          animation: marquee-scroll 60s linear infinite;
          width: max-content;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .marquee-card {
          flex-shrink: 0;
          width: ${cardWidth}px;
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease;
          position: relative;
          opacity: 0.75;
        }
        .marquee-card:hover {
          opacity: 1;
        }
        .marquee-card.selected {
          transform: scale(1.15);
          opacity: 1;
          z-index: 20;
          box-shadow: 0 0 30px rgba(123, 207, 231, 0.4), 0 8px 40px rgba(0,0,0,0.5);
        }
        .marquee-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
          border-radius: 1rem;
        }
        .marquee-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%);
          padding: 60px 12px 14px 12px;
          border-radius: 0 0 1rem 1rem;
        }
        .marquee-card-info .info-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7bcfe7;
          margin: 0 0 4px 0;
        }
        .marquee-card-info .info-desc {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.85);
          margin: 0 0 8px 0;
          line-height: 1.4;
        }
        .marquee-card-info .info-link {
          font-size: 0.7rem;
          color: #7bcfe7;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }
        .marquee-card-info .info-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="marquee-container">
        <div className={`marquee-track ${isPaused ? 'paused' : ''}`}>
          {DOUBLED_DATA.map((item, i) => {
            const isSelected = selectedCardId === item.id;
            return (
              <div
                key={`${item.id}-${i}`}
                className={`marquee-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCardClick(item)}
              >
                <img src={item.src} alt={item.topTitle} loading="lazy" />
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      className="marquee-card-info"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="info-title">{item.topTitle}</p>
                      <p className="info-desc">{item.description}</p>
                      {item.link !== '#' && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="info-link" onClick={(e) => e.stopPropagation()}>
                          Explore History <ExternalLink size={12} />
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
