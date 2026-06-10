import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Sparkles, Trash2, Eye, EyeOff, Baby, Guitar } from 'lucide-react';
import PuzzleBoard from './PuzzleBoard';

const secretCode = ['G', 'E', 'R', 'S', 'H', 'O', 'N'];

// Relative coordinates of the letters on the busto image (in percentage)
const letterZones = [
  { letter: 'H', top: '4%', left: '48%', width: '10%', height: '8%', startTop: '-15%', startLeft: '30%' },
  { letter: 'E', top: '18%', left: '26%', width: '14%', height: '12%', startTop: '80%', startLeft: '-5%' },
  { letter: 'G', top: '40%', left: '36%', width: '14%', height: '12%', startTop: '10%', startLeft: '-10%' },
  { letter: 'R', top: '37%', left: '76%', width: '10%', height: '8%', startTop: '-5%', startLeft: '95%' },
  { letter: 'S', top: '51%', left: '68%', width: '10%', height: '8%', startTop: '40%', startLeft: '105%' },
  { letter: 'O', top: '69%', left: '52%', width: '10%', height: '8%', startTop: '85%', startLeft: '90%' },
  { letter: 'N', top: '70%', left: '71%', width: '10%', height: '8%', startTop: '90%', startLeft: '20%' }
];

export const GeddyEasterEgg = ({ onSuccess, t }) => {
  const [userCode, setUserCode] = useState([]);
  const [showDebugBorders, setShowDebugBorders] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHintButton, setShowHintButton] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [showAnimationVideo, setShowAnimationVideo] = useState(false);

  useEffect(() => {
    if (isUnlocked) return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toUpperCase();
      if (secretCode.includes(key) || key.match(/^[A-Z]$/)) {
        handleLetterClick(key, { stopPropagation: () => {} });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userCode, isUnlocked]);

  useEffect(() => {
    if (isUnlocked && !showAnimationVideo) {
      setTimeout(() => {
        document.getElementById('vault-reward')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isUnlocked, showAnimationVideo]);

  const handleLetterClick = (letter, e) => {
    e.stopPropagation(); // Prevent trigger of click outside (which resets the code)

    const nextIndex = userCode.length;
    if (secretCode[nextIndex] === letter) {
      const newSequence = [...userCode, letter];
      setUserCode(newSequence);
      console.log("Current click array:", newSequence);

      if (newSequence.length === secretCode.length) {
        setIsUnlocked(true);
        setShowAnimationVideo(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      // If they click the wrong letter, but it was the start of the sequence ('G'), restart with ['G']
      if (letter === 'G') {
        setUserCode(['G']);
        console.log("Incorrect letter! Restarting sequence with ['G']:", ['G']);
      } else {
        setUserCode([]);
        setShowHintButton(true);
        console.log("Incorrect letter! Sequence reset.", []);
      }
    }
  };

  const handleOutsideClick = () => {
    if (userCode.length > 0) {
      setUserCode([]);
      console.log("Clicked outside active zones! Sequence reset.", []);
    }
  };

  const clearSequence = (e) => {
    e.stopPropagation();
    setUserCode([]);
    console.log("Sequence cleared manually.", []);
  };

  return (
    <section className={`easter-egg-section ${isUnlocked && !showAnimationVideo ? 'reward-unlocked' : ''}`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={600} gravity={0.15} />}
      <div className="easter-egg-header">
        <h2>{t.easterEggTitle}</h2>
        <p className="easter-egg-subtitle">{t.easterEggSubtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <motion.div 
            key="puzzle-container"
            className="easter-egg-container"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
        {/* Left Column: Bust Image */}
        <div 
          className="easter-egg-image-wrapper"
          onClick={handleOutsideClick}
        >
          <img 
            src="/geddy-bust-removebg.png" 
            alt="Geddy Lee sliced sculpture" 
          />

          {/* Click Zones */}
          {letterZones.map((zone, idx) => {
            const isClicked = userCode.includes(zone.letter);
            return (
            <motion.button
              key={idx}
              data-letter={zone.letter}
              onClick={(e) => { if (!isClicked) handleLetterClick(zone.letter, e); else e.stopPropagation(); }}
              className="puzzle-piece"
              whileTap={{ backgroundColor: "rgba(124, 58, 237, 0.6)", scale: 0.95 }}
              animate={{
                backgroundColor: "transparent",
                boxShadow: "none"
              }}
              style={{
                position: 'absolute',
                top: zone.top,
                left: zone.left,
                width: zone.width,
                height: zone.height,
                cursor: isClicked ? 'default' : 'pointer',
                border: showDebugBorders ? '1px dashed rgba(255,0,0,0.5)' : 'none',
                borderRadius: '50%',
                outline: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: showDebugBorders ? '#E50000' : 'transparent',
                fontSize: '10px',
                fontWeight: 'bold',
                zIndex: 20
              }}
              title={showDebugBorders ? `Letter ${zone.letter}` : ''}
            >
              {showDebugBorders ? zone.letter : ''}
            </motion.button>
          )})}

          {/* Interactive Glowing Overlay for success */}
          <AnimatePresence>
            {successStatus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--bmc-accent)',
                  pointerEvents: 'none',
                  zIndex: 4,
                  borderRadius: '24px'
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Puzzle Info Panel */}
        <div className="easter-egg-panel">
          <PuzzleBoard 
            targetWordLength={7} 
            clickedLetters={userCode} 
            onReset={clearSequence}
            instruction={t.easterEggInstruction} 
          />

          <div className="easter-egg-controls mt-6 flex justify-center w-full">
            {showHintButton && !showHintText && (
              <button className="btn-hint" onClick={(e) => { e.stopPropagation(); setShowHintText(true); }}>
                <Sparkles size={14} /> Pista
              </button>
            )}
          </div>

          {showHintText && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="easter-egg-hint-badge"
            >
              <Sparkles size={14} />
              <span>{t.easterEggHint}</span>
            </motion.div>
          )}

          {/* Success Alert */}
          <AnimatePresence>
            {successStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="easter-egg-success-alert"
              >
                <Sparkles size={16} />
                <span>{t.easterEggSuccess}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
          </motion.div>
        )}

        {isUnlocked && showAnimationVideo && (
          <motion.div
            key="animation-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(0,0,0,0.8)',
              marginTop: '2rem'
            }}
          >
            <video
              src="/Animacao_Geddy_Lee_Site.mp4"
              autoPlay
              playsInline
              onEnded={() => setShowAnimationVideo(false)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        )}

        {isUnlocked && !showAnimationVideo && (
          <motion.div 
            id="vault-reward"
            key="reward-vault"
            className="vault-reward-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="reward-quote">
              {t.easterEggRewardQuote}
            </h3>
            <div className="reward-video-wrapper">
              <iframe src="https://www.youtube.com/embed/8WYWcGOGwog?autoplay=1" title="Geddy Lee Fan Question" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <a 
              href="https://www.belasletras.com.br/loja/busca.php?loja=1194178&palavra_busca=My+Effin+Life" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="reward-banner-belas-letras"
              style={{ textDecoration: 'none' }}
            >
              <div className="banner-text">
                <h4>{t.easterEggRewardTitle}</h4>
                <p>{t.easterEggRewardDesc}</p>
              </div>
              <div className="banner-coupon"><span>{t.easterEggCouponLabel}</span><strong>PORTALRUSH10</strong></div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
