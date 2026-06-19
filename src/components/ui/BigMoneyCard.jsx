import React, { useRef, useState } from 'react';

export const BigMoneyCard = () => {
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef(null);

  const handleMouseMove = (e) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  const borderColor = "#2ecc71";
  const borderBgColor = "var(--bmc-border-bg)";
  const cardBgColor = "var(--bmc-card-bg)";
  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 60deg, ${borderBgColor} 120deg, ${borderBgColor} 360deg)`;

  return (
    <div 
      className="big-money-card"
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        border: "2px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 30px -10px ${borderColor}60` : "none",
      }}
    >
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
