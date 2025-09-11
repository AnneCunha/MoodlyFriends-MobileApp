import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/PofuBackground.png")} // mascote do projeto
        style={styles.mascot}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => (navigation as any).navigate("Login")}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D6996", // fundo azul do protótipo
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mascot: {
    width: 450,  // tamanho ajustável até parecer o protótipo
    height: 450,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3E4666",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
