import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HelpSupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajuda e Suporte</Text>
      <Text style={styles.text}>
        Precisa de ajuda? Entre em contato com nosso suporte.
      </Text>

      <Text style={styles.subTitle}>E-mail:</Text>
      <Text style={styles.text}>suporte@moodlyfriends.com</Text>

      <Text style={styles.subTitle}>Perguntas Frequentes:</Text>
      <Text style={styles.text}>
        • Como funciona o app?{"\n"}
        • Problemas no login{"\n"}
        • Falha nas notificações
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  subTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
  text: { marginTop: 8, fontSize: 16, lineHeight: 22 },
});
