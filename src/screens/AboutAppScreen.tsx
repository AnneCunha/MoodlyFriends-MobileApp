import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function AboutAppScreen() {
  const version = Constants.manifest?.version || "1.0.0";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>

      <Text style={styles.label}>Versão:</Text>
      <Text style={styles.version}>{version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  version: {
    fontSize: 18,
    marginTop: 6,
  },
});
