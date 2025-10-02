import React from "react";

const TypingIndicator: React.FC = () => (
  <div style={{ display: "flex", gap: "4px", padding: "8px" }}>
    <span className="dot">•</span>
    <span className="dot">•</span>
    <span className="dot">•</span>
    <style>{`
      .dot {
        animation: blink 1.4s infinite both;
        font-size: 20px;
      }
      .dot:nth-child(2) { animation-delay: 0.2s; }
      .dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes blink {
        0% { opacity: .2; }
        20% { opacity: 1; }
        100% { opacity: .2; }
      }
    `}</style>
  </div>
);

export default TypingIndicator;
