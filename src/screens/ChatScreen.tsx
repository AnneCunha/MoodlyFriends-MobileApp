import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from 'axios';
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
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleSend = async (message: string) => {
    const newMsg: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMsg]);

setIsTyping(true);
try {
  const res = await axios.post(
    "https://JorgeDev47.pythonanywhere.com/moodly/message",
    {
      mensagem: message,
      user_id: "usuario-teste-123"
    }
  );

  const botMsg: Message = {
    id: Date.now() + 1,
    text: res.data.resposta, // <-- seu Flask retorna "resposta"
    sender: "bot",
  };

  setMessages((prev) => [...prev, botMsg]);
} catch (error) {
  console.error("Erro na chamada:", error);

  const botMsg: Message = {
    id: Date.now() + 1,
    text: "Erro ao conectar com o bot.",
    sender: "bot",
  };

  setMessages((prev) => [...prev, botMsg]);
} finally {
  setIsTyping(false);
}
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0} 
    >
      <View style={styles.chatContainer}>
        <View style={styles.header}>
          <Avatar />
          <Text style={styles.headerText}>Chat com o Bot</Text>
        </View>

        <ScrollView
          style={styles.messagesScrollView}
          contentContainerStyle={styles.messagesContent}
          ref={scrollViewRef}
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

        <InputBar onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

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
