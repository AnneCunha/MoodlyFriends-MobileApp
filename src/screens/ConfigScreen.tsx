import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ConfigScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Perfil */}
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={40} color="#6A7FDB" />
          </View>
          <View>
            <Text style={styles.profileName}>user</Text>
            <Text style={styles.profileEmail}>user.teste@email.com</Text>
          </View>
        </View>
      </View>

      {/* Preferências */}
      <Text style={styles.sectionTitle}>Preferências</Text>
      <View style={styles.card}>
        <MenuItem title="Notificações" icon="notifications-outline" />
        <MenuItem title="Privacidade" icon="shield-checkmark-outline" />
        <MenuItem title="Aparência" icon="color-palette-outline" />
      </View>

      {/* Suporte */}
      <Text style={styles.sectionTitle}>Suporte</Text>
      <View style={styles.card}>
        <MenuItem title="Ajuda e Suporte" icon="help-circle-outline" />
        <MenuItem title="Termos e Políticas" icon="document-text-outline" />
        <MenuItem title="Sobre o App" icon="information-circle-outline" />
      </View>

      {/* Sair */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="red" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ title, icon }: { title: string; icon: any }) {
  return (
    <TouchableOpacity style={styles.menuRow}>
      <Ionicons name={icon} size={22} color="#6A7FDB" />
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color="#999"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3ECF8",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#425F9C",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#425F9C",
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B7A99",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#425F9C",
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: "bold",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#425F9C",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 30,
    backgroundColor: "white",
    borderRadius: 14,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
