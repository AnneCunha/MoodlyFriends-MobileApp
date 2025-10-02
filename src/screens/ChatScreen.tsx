import React, { useState } from "react";
import {
  Avatar,
  EmptyState,
  InputBar,
  MessageBubble,
  TypingIndicator,
} from "./components";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message: string) => {
    // adiciona mensagem do usuário
    const newMsg: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMsg]);

    // simular resposta do bot
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now(),
        text: "Resposta do bot para: " + message,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        border: "1px solid #ccc",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Avatar />
        <span style={{ fontWeight: "bold" }}>Chat com o Bot</span>
      </div>

      {/* Área de mensagens */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))
        )}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Barra de input */}
      <InputBar onSend={handleSend} />
    </div>
  );
};

export default ChatScreen;
