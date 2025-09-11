import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
  const navigation = useNavigation(); // <--- aqui

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (email === "teste@email.com" && password === "123456") {
      (navigation as any).navigate("MainTabs"); // <--- navegação direta
    } else {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insira suas informações para efetuar o Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C0D7EE",
    padding: 20,
  },
  title: {
    fontSize: 17,
    marginBottom: 30,
    color: "#5D6996",
    textAlign: "center"
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#A093C7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:"#fff"
  },
  button: {
    backgroundColor: "#A093C7",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    shadowColor: "#5D6996",
    shadowOpacity: 0.4,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    elevation: 3, // sombra no Android
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
