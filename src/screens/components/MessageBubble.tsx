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
        borderRadius: "20px 20px 0px 20px",
        textDecorationColor: "#fff",
        backgroundColor: sender === "user" ? "#3d3475ff" : "#EAEAEA",
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {text}
    </div>
  );
};


export default MessageBubble;
