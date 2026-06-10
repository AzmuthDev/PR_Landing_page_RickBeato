import React, { useRef, useState } from "react";

export const BuyMeCoffeeCard = ({
  image,
  title = "Apoie o Portal Rush Brasil",
  description = "Se você curte o conteúdo exclusivo que trazemos e quer ajudar a manter o portal no ar, considere nos pagar um café!",
  buttonText = "Buy me a Coffee ☕",
  coffeeLink,
  width = 388,
  height = 420,
  borderColor = "var(--bmc-accent)",
  borderBgColor = "var(--bmc-border-bg)",
  borderWidth = 2,
  cardBgColor = "var(--bmc-card-bg)",
  textColor = "var(--bmc-text)",
  accentColor = "var(--bmc-accent)",
}) => {
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

  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 60deg, ${borderBgColor} 120deg, ${borderBgColor} 360deg)`;

  return (
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        width: "100%",
        maxWidth: width,
        height,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "1.5rem",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: 12,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 30px -10px ${accentColor}40` : "none",
        position: "relative",
        fontFamily: "var(--font-family, sans-serif)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 240,
          borderRadius: "1rem",
          overflow: "hidden",
          background: "#121212",
          marginBottom: 16,
        }}
      >
        <img
          src={image}
          alt="Buy me a coffee"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
      
      <div style={{ textAlign: "center", padding: "0 8px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: "bold", color: textColor, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <p style={{ fontSize: 14, color: textColor, opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
        
        <a 
          href={coffeeLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            width: "100%",
            padding: "12px 24px",
            marginTop: 16,
            backgroundColor: accentColor,
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            borderRadius: "0.75rem",
            transition: "filter 0.2s ease",
            filter: hovered ? "brightness(1.1)" : "brightness(1)",
          }}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};
