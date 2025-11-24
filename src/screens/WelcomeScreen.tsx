import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import EditTablesModal from "./components/EditTablesModal";
import EditProfileModal from "./components/EditProfileModal"; // Import the new modal

export default function WelcomeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { name, userId, isAdmin } = route.params as { name: string, userId: number, isAdmin: boolean };
  
  const [isEditTablesModalVisible, setEditTablesModalVisible] = useState(false);
  const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Admin-only button */}
      {isAdmin && (
        <TouchableOpacity style={styles.adminEditButton} onPress={() => setEditTablesModalVisible(true)}>
          <Text style={styles.editButtonText}>Editar Tabelas</Text>
        </TouchableOpacity>
      )}

      {/* Button for all users */}
      <TouchableOpacity style={styles.userEditButton} onPress={() => setEditProfileModalVisible(true)}>
        <Text style={styles.editButtonText}>Editar Info</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>Olá, {name}!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (navigation as any).navigate("MainTabs", { screen: 'Início', params: { name: name } })}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Admin Modal */}
      {isAdmin && (
        <EditTablesModal
          visible={isEditTablesModalVisible}
          onClose={() => setEditTablesModalVisible(false)}
        />
      )}

      {/* User Profile Modal */}
      <EditProfileModal 
        visible={isEditProfileModalVisible}
        onClose={() => setEditProfileModalVisible(false)}
        userId={userId}
        isAdm={isAdmin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D6996",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3E4666",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 20, // Added margin
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  adminEditButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: "#A093C7",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  userEditButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: "#7889B3", // Different color for distinction
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
