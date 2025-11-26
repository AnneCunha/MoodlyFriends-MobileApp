import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function AppearanceScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aparência</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Text style={styles.text}>
        * Tutorial: para ativar o tema global futuramente, basta conectar este switch ao provider de tema.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  label: { fontSize: 16 },
  text: { marginTop: 20, fontSize: 14, color: "#555" },
});
