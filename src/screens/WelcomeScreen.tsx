import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/PofuBackground.png")}
      style={styles.background}
      resizeMode="cover"  
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao MoodlyFriends</Text>
        <TouchableOpacity
          style={styles.button}
onPress={() => (navigation as any).navigate("Login")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#5D6996",
    
  },
  overlay: {
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 30,
    textAlign: "center",
    backgroundColor: "#5D6996",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4B5579",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    elevation: 3,
    boxShadow: "5px 5px 10px 0px #2d2e2fff",

  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
