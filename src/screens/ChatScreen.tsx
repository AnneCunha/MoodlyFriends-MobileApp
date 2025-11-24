<<<<<<< Updated upstream
import React, { useState, useRef } from "react"; // Consolidação das importações
import {
  View,               
  Text,               
  StyleSheet,         
  ScrollView,         
  KeyboardAvoidingView, 
  Platform,           
} from "react-native";
=======
import React, { useState } from "react";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const scrollViewRef = useRef<ScrollView | null>(null); // Uso correto do useRef

  const handleSend = (message: string) => {
    // 1. Adiciona mensagem do usuário
=======

  const handleSend = (message: string) => {
    // adiciona mensagem do usuário
>>>>>>> Stashed changes
    const newMsg: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMsg]);

<<<<<<< Updated upstream
    // 2. Simula resposta do bot (Lógica consolidada e correta)
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1, 
=======
    // simular resposta do bot
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now(),
>>>>>>> Stashed changes
        text: "Resposta do bot para: " + message,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  }; // Fim correto do handleSend

  return (
<<<<<<< Updated upstream
    // Somente o bloco React Native é retornado
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0} 
    >
      <View style={styles.chatContainer}>
        {/* Header - Usando View e Text no lugar de div e span */}
        <View style={styles.header}>
          <Avatar />
          <Text style={styles.headerText}>Chat com o Bot</Text>
        </View>

        {/* Área de Mensagens */}
        <ScrollView
          style={styles.messagesScrollView}
          contentContainerStyle={styles.messagesContent}
          ref={scrollViewRef}
          // Garante que a ScrollView vá para o final ao adicionar novas mensagens
          onContentSizeChange={(w, h) => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
            ))
          )}
          {isTyping && <TypingIndicator />}
        </ScrollView>

        {/* Barra de input */}
        <InputBar onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

// ... estilos (StyleSheet.create) ...
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, 
    backgroundColor: "#b8aeef", 
    padding: 10,
  },
  chatContainer: {
    flex: 1, 
    borderWidth: 2,
    borderColor: "#A093C7",
    borderRadius: 30,
    borderTopLeftRadius: 170,
    borderTopRightRadius: 170,
    overflow: "hidden", 
    backgroundColor: "#6d79bdff",
  },
  header: {
    backgroundColor: "#6d79bdff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#a093c7",
    flexDirection: "row", 
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontWeight: "bold",
    // Adicione uma cor de texto aqui, senão pode estar invisível dependendo do background
    color: '#fff', 
  },
  messagesScrollView: {
    flex: 1, 
    paddingHorizontal: 10,
    backgroundColor: "#6d79bdff",
  },
  messagesContent: {
    flexGrow: 1, 
    justifyContent: "flex-end", 
    paddingVertical: 10,
  },
});

export default ChatScreen;
=======
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
>>>>>>> Stashed changes
