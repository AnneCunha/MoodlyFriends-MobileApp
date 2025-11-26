import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function TermsPoliciesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Termos e Políticas</Text>

      <Text style={styles.text}>
        Estes termos descrevem como seus dados são utilizados no Moodly Friends.
      </Text>

      <Text style={styles.subTitle}>1. Uso do Aplicativo</Text>
      <Text style={styles.text}>
        O usuário concorda em utilizar o app de maneira responsável.
      </Text>

      <Text style={styles.subTitle}>2. Privacidade</Text>
      <Text style={styles.text}>
        Dados pessoais são tratados de acordo com a LGPD.
      </Text>

      <Text style={styles.subTitle}>3. Segurança</Text>
      <Text style={styles.text}>
        Implementamos medidas técnicas para proteger suas informações.
      </Text>

      <Text style={styles.subTitle}>4. Alterações</Text>
      <Text style={styles.text}>Os termos podem ser atualizados periodicamente.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
  text: { marginTop: 8, fontSize: 15, lineHeight: 22 },
});
