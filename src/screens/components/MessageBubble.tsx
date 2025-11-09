import React from "react";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot" | string; // pode restringir mais se quiser
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  return (
    // Observação: Se este é um projeto React Native, você deve usar <View> e <Text>
    // e o `style` deve ser criado com `StyleSheet.create`.
    // O <div> com styles em linha é típico de React para Web.
    <div
      style={{
        maxWidth: "70%",
        margin: "8px",
        padding: "10px",
        
        // Apenas uma definição de borderRadius
        borderRadius: "20px 20px 0px 20px", 
        
        // Apenas uma definição de backgroundColor
        backgroundColor: sender === "user" ? "#3d3475ff" : "#EAEAEA",
        
        textDecorationColor: "#fff", // Esta propriedade não faz nada no <div>
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {text}
    </div>
  );
};

export default MessageBubble;