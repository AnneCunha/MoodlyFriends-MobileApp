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
<<<<<<< HEAD
        borderRadius: "12px",
        backgroundColor: sender === "user" ? "#DCF8C6" : "#EAEAEA",
=======
        borderRadius: "20px 20px 0px 20px",
        textDecorationColor: "#fff",
        backgroundColor: sender === "user" ? "#3d3475ff" : "#EAEAEA",
>>>>>>> a467f972a7496193efae568a206514b559d2db83
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {text}
    </div>
  );
};

<<<<<<< HEAD
=======

>>>>>>> a467f972a7496193efae568a206514b559d2db83
export default MessageBubble;
