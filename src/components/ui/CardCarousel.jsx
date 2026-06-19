import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/* ===== CURATED CARDS with metadata (used in Track 1) ===== */
const CURATED_CARDS = [
  { id: 't1-1', src: `${import.meta.env.BASE_URL}rush-reposted-portal-rush1.jpg`, topTitle: 'Rush South Park', description: 'Repostado pelo @RUSH - South Park.', link: 'https://www.instagram.com/stories/highlights/18281584825282043/' },
  { id: 't1-2', src: `${import.meta.env.BASE_URL}Jillian-Maryonovich-rushcon.jpg`, topTitle: 'RushCon', description: 'Jillian Maryonovich - Diretora Criativa da RushCon. "You work is fantastic! Really fun stuff".', link: 'https://x.com/RushFanCast/status/1854733719627608282' },
  { id: 't1-3', src: `${import.meta.env.BASE_URL}portal-rush-mtv-hulk.jpg`, topTitle: 'MTV Hulk', description: 'Carol Zaine - Portal Rush Brasil - MTV - HULK.JPG', link: 'https://www.flickr.com/photos/carolzaine/albums/72157625125588376/' },
  { id: 't1-4', src: `${import.meta.env.BASE_URL}cerveja-do-rush.jpg`, topTitle: 'Cerveja do Rush', description: 'Matéria sobre a cerveja do Rush.', link: 'https://portalrushbrasil.com.br/cerveja-do-rush-reuniao/' },
  { id: 't1-5', src: `${import.meta.env.BASE_URL}tf4-portal-rush.png`, topTitle: 'T4F Tickets for Fun', description: '"Sou Regis, da Tel. Estamos a procura de uns fã do fush para uma materia de TV..." - Regis Motisuki.', link: 'https://imgur.com/a/1RMtEPL' },
  { id: 't1-6', src: `${import.meta.env.BASE_URL}rush-staff-craig-blazier.png`, topTitle: 'Craig Blazier', description: '"Great shirts!! The crew and band will get a kick out of them when I wear them. Thanks!!" - Gerente de Produção do Rush.', link: 'https://imgur.com/a/Zp0oVfJ' },
  { id: 't1-7', src: `${import.meta.env.BASE_URL}something-for-nothing-139.png`, topTitle: 'Maior Podcast do Rush', description: '"That might be the best email you ever read" - Steve. Podcast sobre o Rush no Mundo - Episódio 139.', link: 'https://open.spotify.com/episode/03wWuhH49Z4YNSOryKAX6f' },
  { id: 't1-8', src: `${import.meta.env.BASE_URL}primeiro-show-cover-rio.jpg`, topTitle: 'Carbonmade Portfolio', description: 'Carbonmade Portal Rush Brasil Tanios Acacio Portfolio.jpg', link: 'https://imgur.com/a/rgfIrin' },
  { id: 't1-9', src: `${import.meta.env.BASE_URL}rush-festival-galpao.jpg`, topTitle: 'Rush Festival 2016', description: 'Rush Festival Brasil 2016', link: 'https://imgur.com/a/gmbKqKu' },
  { id: 't1-10', src: `${import.meta.env.BASE_URL}rush-cover-rio-2010.jpg`, topTitle: 'Rush Festival 2015', description: 'Rush Festival Brasil - 2015', link: 'https://portalrushbrasil.com.br/rush-festival-brasil-2015/' },
  { id: 't1-11', src: `${import.meta.env.BASE_URL}rushfest-2022.png`, topTitle: 'Rush Fest 2022', description: 'Rush Fest 2022', link: 'https://portalrushbrasil.com.br/rush-fest-2022/' },
  { id: 't1-12', src: `${import.meta.env.BASE_URL}rush-room-tanios.jpg`, topTitle: 'Rushfans', description: '"Hi Tanios! This sounds like a neat project, and good designs too. Keep me posted!" - Ryan from Rushfans.', link: '#' },
  { id: 't1-13', src: `${import.meta.env.BASE_URL}2112-ticket.jpg`, topTitle: 'Rush History', description: 'Mais um marco na história da comunidade do Rush.', link: '#' },
  { id: 't1-14', src: `${import.meta.env.BASE_URL}rush-staff-bruce-frenchie.png`, topTitle: 'Rush Staff', description: 'Equipe e membros importantes da comunidade do Rush.', link: '#' },
  { id: 't1-15', src: `${import.meta.env.BASE_URL}rush-in-rio2.jpg`, topTitle: 'Rush in Rio', description: 'Rush in Rio - O momento inesquecível da turnê sul-americana.', link: '#' },
  { id: 't1-16', src: `${import.meta.env.BASE_URL}rushinrio2-sp-mtv.jpg`, topTitle: 'Rush in Rio SP MTV', description: 'Matéria e lembranças sobre o show de São Paulo.', link: '#' },
  { id: 't1-17', src: `${import.meta.env.BASE_URL}something-for-nothing-podcast.png`, topTitle: 'Something For Nothing', description: 'Podcast Something for Nothing - Uma análise da discografia e influência do Rush.', link: '#' },
  { id: 't1-18', src: `${import.meta.env.BASE_URL}stories-geddy-lee.jpg`, topTitle: 'Stories Geddy Lee', description: 'Interações e compartilhamentos via Stories.', link: '#' },
  { id: 't1-19', src: `${import.meta.env.BASE_URL}tanios-amigos-rio.jpg`, topTitle: 'Comunidade', description: 'Momentos com os amigos e fãs de Rush no Rio de Janeiro.', link: '#' },
  { id: 't1-20', src: `${import.meta.env.BASE_URL}tanios-whiplash.jpg`, topTitle: 'Whiplash', description: 'Entrevistas e contribuições para o portal Whiplash.', link: '#' },
];

/* ===== ALL POST IMAGES — Pool unificado de 241 imagens ===== */
const ALL_POSTS = [
  '17842051340128126','17842653982957578','17842747775703897','17843656753726529','17844393162634581',
  '17848013387470588','17848297095677319','17848371319534105','17848618230662973','17849730673947215',
  '17850941332804740','17851720358463067','17851780159788147','17852803521646347','17853515951119000',
  '17854689082764027','17855159723071214','17855545215601743','17856349244342793','17858227702709140',
  '17860381632668489','17861233504906483','17861556874456643','17861769096616859','17865014814611117',
  '17865868490204817','17866582839457874','17867115950576386','17867325166568215','17867715287144508',
  '17868275320976712','17868770571526090','17871275236825400','17871674112595031','17876837578766105',
  '17878134941079682','17881583814511916','17886200083825329','17888122159791818','17889788510999159',
  '17890726162998955','17891456396437269','17892829633773842','17893231416263674','17893336978451190',
  '17893765140450671','17895213049621675','17899978703968359','17904247607315224','17904399142486298',
  '17905306096403151','17905586307242061','17905718403411990','17911712565359759','17912637210326598',
  '17912729805341925','17916033978166806','17918641167337057','17919216285071066','17919758094070595',
  '17920301559124354','17921539954368886','17922339813277147','17922396350031237','17933469805882647',
  '17936050958998137','17937913744769893','17938342623215037','17943159769369531','17945001246130900',
  '17945105248721002','17947644710978969','17949531649598200','17959372192327468','17962172424117382',
  '17964302594904068','17964698762866915','17968222419042268','17969987931099708','17973328369475029',
  '17980482792003836','17981347835739815','17981524541959033','17983346597698794','17985613520992662',
  '17991859961811249','17992061795761506','17992567205920636','17997183896931686','18002239931714402',
  '18002323241729206','18004370695278678','18004711952899639','18009069014190269','18015492802358575',
  '18018138043347771','18018228155485695','18020723173943982','18021074687753604','18021714859907035',
  '18028592651423180','18029273531716343','18033451496443217','18036778628572043','18037217684647735',
  '18039016399236573','18039112553549445','18039646820775406','18040454131692279','18042352505713293',
  '18042775591957341','18043589045738050','18048420086443603','18050972147708282','18051136373702642',
  '18052797667200869','18057653474465102','18060821554179132','18060920771558194','18064745795565922',
  '18065458555893940','18065548718427832','18068247757241581','18068368310477578','18072155702414346',
  '18073202564282482','18075411077549017','18077942039424666','18080412329164154','18081087634924311',
  '18081444677413683','18083979317458661','18084217021151008','18084293156591509','18085299697801893',
  '18085790998982186','18086452100327781','18087410312520085','18088089515043418','18088430270225194',
  '18088631563794873','18088705246835231','18088756703142249','18089388631162441','18089395466272775',
  '18089539360834725','18090320638583903','18090536828520886','18090562067136858','18091550048265884',
  '18091610870128336','18091667755748825','18092160907872722','18092449127039682','18092656006858961',
  '18092765594599952','18092937487530484','18093412627529208','18093483104044780','18093533197105338',
  '18093646786912548','18096588871886658','18096983806779423','18097888702506531','18098292010830329',
  '18100435769051309','18100727384088895','18100879795997228','18101128567946467','18101728741620952',
  '18102472406480153','18102834829071113','18103008688737629','18103167542077885','18106141585641319',
  '18106824487673943','18106842058780454','18108141649837725','18109376599835177','18111086020696076',
  '18112305520742176','18113332273710233','18113788324699962','18115235050606606','18116006137727794',
  '18116464624570306','18117254611557534','18117660151726951','18117756415672088','18118486045563967',
  '18120765295550034','18121087234492965','18121977166636796','18123243571525079','18123581353004510',
  '18124415413721079','18126884371494101','18127431967149085','18128986672494448','18129608455605670',
  '18129878932544283','18131372941551137','18134145847478177','18134558647502855','18145916023488183',
  '18151718410470274','18153532555422064','18160224553427035','18161971708426505','18167488198410806',
  '18183295339324181','18184374193032764','18189864277360318','18199517644349958','18200183935327356',
  '18203870626328235','18314817925282381','18318249643257665','18323435203248818','18331135531220547',
  '18336177418169931','18338486635174317','18359506786231668','18365030110227889','18371549125134232',
  '18380449177144996','18398476858118541','18401927545113762','18406087546177291','18412797496120042',
  '18448728343116561','18451488358106382','18454923889097900','18462425467101663','18513597760076058',
  '18544620979048642','18546304465071106','18547765888027765','18574034140055206','18589524406007985',
  '18596014447047822',
].map(n => `${import.meta.env.BASE_URL}posts/${n}.jpg`);

/* ===== Distribuição equilibrada: ~80 posts por trilho ===== */
const BATCH_SIZE = Math.ceil(ALL_POSTS.length / 3);
const POSTS_BATCH_1 = ALL_POSTS.slice(0, BATCH_SIZE);
const POSTS_BATCH_2 = ALL_POSTS.slice(BATCH_SIZE, BATCH_SIZE * 2);
const POSTS_BATCH_3 = ALL_POSTS.slice(BATCH_SIZE * 2);

/* Track 1: 20 curated cards + ~80 posts = ~100 items (LTR) */
const TRACK_1_IMAGES = [...CURATED_CARDS, ...POSTS_BATCH_1];
/* Track 2: ~80 posts (RTL) */
const TRACK_2_IMAGES = POSTS_BATCH_2;
/* Track 3: ~81 posts (LTR) */
const TRACK_3_IMAGES = POSTS_BATCH_3;

const CARD_W = 170;
const CARD_H = 230;
const GAP = 16;

/* ===== Memoized individual card — avoids re-render of all 600 cards on click ===== */
const MarqueeCard = memo(({ itemData, cardId, isSelected, shouldLoadImage, isPriority, onClick }) => {
  const isSimple = typeof itemData === 'string';
  const src = isSimple ? itemData : itemData.src;

  return (
    <div
      className={`mq-card ${isSelected ? 'mq-card--selected' : ''}`}
      onClick={onClick}
    >
      {shouldLoadImage ? (
        <img src={src} alt="Portal Rush Brasil" decoding="async" loading={isPriority ? "eager" : "lazy"} />
      ) : (
        <div className="mq-card-placeholder" />
      )}
      <AnimatePresence>
        {isSelected && !isSimple && (
          <motion.div
            className="mq-card-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mq-info-title">{itemData.topTitle}</p>
            <p className="mq-info-desc">{itemData.description}</p>
            {itemData.link && itemData.link !== '#' && (
              <a href={itemData.link} target="_blank" rel="noopener noreferrer" className="mq-info-link" onClick={(e) => e.stopPropagation()}>
                Explore History <ExternalLink size={12} />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
MarqueeCard.displayName = 'MarqueeCard';

/* ===== Memoized marquee track with progressive loading ===== */
const MarqueeTrack = memo(({ images, speed, direction, trackId, selectedCardId, onCardClick, canLoad, canLoadDupe }) => {
  /* Doubled array for seamless loop */
  const doubled = [...images, ...images];

  /* Animation class based on direction */
  const animClass = direction === 'rtl' ? 'mq-track--rtl' : 'mq-track--ltr';

  return (
    <div className="mq-container">
      <div
        className={`mq-track ${animClass} ${selectedCardId ? 'mq-track--paused' : ''}`}
        style={{ '--mq-speed': `${speed}s` }}
      >
        {doubled.map((item, i) => {
          const isDupe = i >= images.length;
          const shouldLoadImage = canLoad && (!isDupe || canLoadDupe);
          const isSimple = typeof item === 'string';
          const id = isSimple ? `${trackId}-${i}` : `${item.id}-${i}`;
          const isSelected = selectedCardId === id;

          let isPriority = false;
          if (direction === 'rtl') {
            isPriority = i < 15;
          } else {
            isPriority = isDupe && (i - images.length) < 15;
          }

          return (
            <MarqueeCard
              key={`${trackId}-${i}`}
              itemData={item}
              cardId={id}
              isSelected={isSelected}
              shouldLoadImage={shouldLoadImage}
              isPriority={isPriority}
              onClick={() => onCardClick(id, isSimple ? null : item)}
            />
          );
        })}
      </div>
    </div>
  );
});
MarqueeTrack.displayName = 'MarqueeTrack';

/* ===== Main exported component ===== */
export const CardCarousel = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const resumeTimerRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: true, margin: "600px 0px" });

  const handleCardClick = useCallback((id, item) => {
    if (!item) return; /* Ignore clicks on simple post images */

    setSelectedCardId((prev) => {
      if (prev === id) {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        return null;
      }
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        setSelectedCardId(null);
      }, 4000);
      return id;
    });
  }, []);

  return (
    <section className="interactive-carousel-section" id="carousel" ref={carouselRef}>
      <style>{`
        /* ===== KEYFRAMES — Percentage-based for pixel-perfect loop ===== */
        @keyframes mq-scroll-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @keyframes mq-scroll-rtl {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        /* ===== Container: clips overflow + fade edges ===== */
        .mq-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          z-index: 1;
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          padding: 6px 0;
        }

        /* ===== Track: the animated strip ===== */
        .mq-track {
          display: inline-flex;
          gap: ${GAP}px;
          padding-right: ${GAP}px;
          width: max-content;
          will-change: transform;
        }
        .mq-track--ltr {
          animation: mq-scroll-ltr var(--mq-speed) linear infinite;
        }
        .mq-track--rtl {
          animation: mq-scroll-rtl var(--mq-speed) linear infinite;
        }
        .mq-track--paused {
          animation-play-state: paused !important;
        }

        /* ===== Card: lightweight box ===== */
        .mq-card {
          flex-shrink: 0;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          border-radius: 0.75rem;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          opacity: 0.7;
          background: rgba(255, 255, 255, 0.05);
          transition: transform 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease;
        }
        .mq-card:hover {
          opacity: 1;
        }
        .mq-card--selected {
          transform: scale(1.15);
          opacity: 1;
          z-index: 20;
          box-shadow: 0 0 30px rgba(123, 207, 231, 0.4), 0 8px 40px rgba(0,0,0,0.5);
        }

        /* ===== Card image ===== */
        .mq-card img {
          width: 100%;
          height: ${CARD_H}px;
          object-fit: cover;
          display: block;
          border-radius: 0.75rem;
        }

        /* ===== Placeholder: same size, no image ===== */
        .mq-card-placeholder {
          width: 100%;
          height: ${CARD_H}px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.75rem;
        }

        /* ===== Info overlay (curated cards) ===== */
        .mq-card-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%);
          padding: 60px 12px 14px 12px;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .mq-info-title {
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #7bcfe7; margin: 0 0 4px 0;
        }
        .mq-info-desc {
          font-size: 0.7rem; color: rgba(255,255,255,0.85); margin: 0 0 8px 0; line-height: 1.4;
        }
        .mq-info-link {
          font-size: 0.7rem; color: #7bcfe7; text-decoration: none;
          display: inline-flex; align-items: center; gap: 4px; font-weight: 600;
        }
        .mq-info-link:hover { text-decoration: underline; }

        /* ===== Wrapper for the 3 tracks ===== */
        .triple-carousel-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 2rem 0;
        }
        @media (max-width: 768px) {
          .triple-carousel-wrapper {
            padding: 0.5rem 0;
          }
        }
      `}</style>

      {isInView && (
        <div className="triple-carousel-wrapper">
          {/* Track 1: LTR — 20 curated cards + ~80 posts */}
          <MarqueeTrack
            images={TRACK_1_IMAGES}
            speed={180}
            direction="ltr"
            trackId="track1"
            selectedCardId={selectedCardId}
            onCardClick={handleCardClick}
            canLoad={true}
            canLoadDupe={true}
          />
          {/* Track 2: RTL — ~80 posts */}
          <MarqueeTrack
            images={TRACK_2_IMAGES}
            speed={200}
            direction="rtl"
            trackId="track2"
            selectedCardId={selectedCardId}
            onCardClick={handleCardClick}
            canLoad={true}
            canLoadDupe={true}
          />
          {/* Track 3: LTR — ~81 posts */}
          <MarqueeTrack
            images={TRACK_3_IMAGES}
            speed={220}
            direction="rtl"
            trackId="track3"
            selectedCardId={selectedCardId}
            onCardClick={handleCardClick}
            canLoad={true}
            canLoadDupe={true}
          />
        </div>
      )}
    </section>
  );
};
