import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PixCard = ({
  qrImage,
  bannerImage,
  title = "Apoie com PIX",
  description = "Aponte a câmera do seu celular para apoiar o portal via PIX.",
  width = 388,
  height = 420,
  borderColor = "#32BCAD",
  borderBgColor = "rgba(50, 188, 173, 0.2)",
  borderWidth = 2,
  cardBgColor = "var(--bmc-card-bg, #1e1e1e)",
  textColor = "var(--bmc-text, #ffffff)",
  accentColor = "#32BCAD",
}) => {
  const [hovered, setHovered] = useState(false);
  const [showQR, setShowQR] = useState(false);
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
    <>
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          boxSizing: "border-box"
        }}
      >
        <img
          src={bannerImage}
          alt="Apoie o Portal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            borderRadius: "0.5rem",
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
        
        <button 
          onClick={() => setShowQR(true)}
          style={{
            display: "inline-block",
            width: "100%",
            padding: "12px 24px",
            marginTop: 16,
            backgroundColor: accentColor,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "0.75rem",
            transition: "filter 0.2s ease",
            filter: hovered ? "brightness(1.1)" : "brightness(1)",
            cursor: "pointer",
            boxSizing: "border-box",
            border: "none",
            fontFamily: "inherit",
            fontSize: "1rem"
          }}
        >
          Gerar QR Code
        </button>
      </div>
    </div>

    <AnimatePresence>
      {showQR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQR(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box"
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: "1rem",
              padding: "24px",
              maxWidth: "500px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              position: "relative"
            }}
          >
            <button
              onClick={() => setShowQR(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#666",
                lineHeight: 1,
                padding: "0 8px"
              }}
            >
              &times;
            </button>
            <h3 style={{ color: "#333", marginTop: 0, marginBottom: "20px", fontSize: "24px", fontWeight: "bold", fontFamily: "var(--font-family, sans-serif)" }}>
              Apoie com PIX
            </h3>
            <img 
              src={qrImage} 
              alt="PIX QR Code" 
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
                borderRadius: "0.5rem"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
