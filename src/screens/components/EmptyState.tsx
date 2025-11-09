import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const EmptyState: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Nenhuma mensagem ainda. Comece a conversar!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  }
});

export default EmptyState;