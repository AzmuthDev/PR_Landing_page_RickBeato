import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PuzzleBoard.css';

const PuzzleBoard = ({ 
  targetWordLength = 7, 
  clickedLetters = [],
  onReset,
  instruction = "Clique diretamente nas letras do\nbusto ou use o seu teclado."
}) => {
  const slots = Array.from({ length: targetWordLength });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="easter-egg-spelling-container">
        {instruction && (
          <p className="easter-egg-instruction-inside">
            {instruction.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < instruction.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        )}
        <div className="easter-egg-spelling">
          {slots.map((_, index) => {
            const letter = clickedLetters[index];
            const isFilled = !!letter;
            const isSuccess = clickedLetters.length === targetWordLength;

            return (
              <motion.div
                key={index}
                className={`easter-egg-spelling-box ${
                  isSuccess ? 'success' : isFilled ? 'filled' : ''
                }`}
                animate={isFilled ? { scale: [0.8, 1.2, 1], borderColor: "#FFD700", color: "#FFD700", textShadow: "0 0 10px rgba(255,215,0,0.5)" } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isFilled ? letter : <span className="spelling-box-dash">—</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="action-area mt-4">
        {clickedLetters.length > 0 && (
          <button onClick={onReset} className="btn-reset">
            <Trash2 size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;
