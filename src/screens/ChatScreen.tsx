import React, { useState, useRef } from "react";
import {
  View,               
  Text,               
  StyleSheet,         
  ScrollView,         
  KeyboardAvoidingView, 
  Platform,           
} from "react-native";
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

  const handleSend = (message: string) => {
    const newMsg: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMsg]);

    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1, 
        text: "Resposta do bot para: " + message,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
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