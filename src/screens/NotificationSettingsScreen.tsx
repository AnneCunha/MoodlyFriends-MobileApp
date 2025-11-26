import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function NotificationSettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Notificações Push</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Notificações por E-mail</Text>
        <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
      </View>
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
  label: {
    fontSize: 16,
  },
});
