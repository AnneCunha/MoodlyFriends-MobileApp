import React from "react";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot" | string; // pode restringir mais se quiser
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  return (
    <div
      style={{
        maxWidth: "70%",
        margin: "8px",
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: sender === "user" ? "#DCF8C6" : "#EAEAEA",
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
