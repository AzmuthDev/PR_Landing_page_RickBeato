import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PuzzleBoard.css';

const PuzzleBoard = ({ 
  targetWordLength = 7, 
  clickedLetters = [],
  onReset 
}) => {
  const slots = Array.from({ length: targetWordLength });

  return (
    <div className="puzzle-modal">
      <h3 className="instruction-text">
        Clique diretamente nas letras do busto ou use o seu teclado.
      </h3>

      <div className="word-grid">
        {slots.map((_, index) => {
          const letter = clickedLetters[index];
          const isFilled = !!letter;

          return (
            <div 
              key={index}
              className={`letter-box ${isFilled ? 'filled' : 'empty'}`}
            >
              <AnimatePresence>
                {isFilled && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {letter}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="action-area">
        {clickedLetters.length > 0 && (
          <button onClick={onReset} className="reset-button">
            <Trash2 size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;
