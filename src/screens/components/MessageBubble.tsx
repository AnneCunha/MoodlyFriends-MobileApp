import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MessageBubbleProps = {
  text: string;
  sender: 'user' | 'bot' | string; 
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  const isUser = sender === 'user';

  // Define os estilos com base em quem enviou (usuário ou bot)
  const bubbleStyle = isUser ? styles.userBubble : styles.botBubble;
  const textStyle = isUser ? styles.userText : styles.botText;

  return (
    <View style={[styles.bubble, bubbleStyle]}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '70%',
    marginVertical: 4, // Espaçamento vertical entre bolhas
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#3d3475ff', // Cor roxa para o usuário
    alignSelf: 'flex-end',
    // Borda específica como no seu código anterior
    borderBottomRightRadius: 0, 
  },
  botBubble: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
    // Borda específica para o bot
    borderBottomLeftRadius: 0, 
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#000000',
  },
});

export default MessageBubble;