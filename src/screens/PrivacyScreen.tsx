import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacidade</Text>
      <Text style={styles.text}>
        Aqui você poderá ajustar preferências sobre seus dados, permissões e segurança.
      </Text>
      <Text style={styles.subTitle}>Coleta de Dados</Text>
      <Text style={styles.text}>
        O app coleta apenas dados necessários para garantir uma boa experiência.
      </Text>

      <Text style={styles.subTitle}>Permissões</Text>
      <Text style={styles.text}>- Acesso a notificações{"\n"}- Armazenamento{"\n"}- Uso do app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { marginTop: 20, fontWeight: "bold", fontSize: 18 },
  text: { marginTop: 5, fontSize: 16, lineHeight: 22 },
});
