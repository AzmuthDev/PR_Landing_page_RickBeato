import React from 'react';

export const BigMoneyCard = () => {
  return (
    <div className="big-money-card">
      <h3 className="big-money-title">💵 THE BIG MONEY</h3>
      
      <div className="big-money-minimal-scale">
        <span className="scale-label">Meta de Apoio:</span>
        <div className="scale-bags">
          <span className="bag-icon active" title="Standard">💰</span>
          <span className="bag-icon active" title="VIP">💰</span>
          <span className="bag-icon active" title="Super Fan">💰</span>
          <span className="bag-icon" title="Meta 4">💰</span>
        </div>
      </div>

      <div className="big-money-actions-row">
        
        <div className="support-action-col">
          <span className="action-label">BUY ME A COFFEE</span>
          <a 
            href="https://buymeacoffee.com/portalrushzine" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bmac-link-square"
          >
            <img src={`${import.meta.env.BASE_URL}imgi_17_buy-me-a-coffee.png`} alt="Buy Me A Coffee" />
          </a>
        </div>

        <div className="support-action-col">
          <span className="action-label">CHAVE PIX</span>
          <button className="pix-btn-square">
            <img src={`${import.meta.env.BASE_URL}pix-qrcode.jpeg`} alt="PIX QR Code" />
          </button>
        </div>

      </div>
    </div>
  );
};
