import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (email === "teste@email.com" && password === "123456") {
      (navigation as any).navigate("MainTabs");
    } else {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  }

  function handleForgotPassword() {
    Alert.alert("Recuperar senha", "Função em desenvolvimento 😅");
  }

  function handleRegister() {
    (navigation as any).navigate("RegisterScreen"); // ajuste conforme o nome real da sua tela de cadastro
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/icon.png")} // substitua pela sua logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Insira suas informações para efetuar o Login</Text>

      {/* Campos */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Esqueci minha senha */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
        <Text style={styles.forgotText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* Botão principal */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link de cadastro */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 17,
    marginBottom: 30,
    color: "#5D6996",
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#A093C7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#5D6996",
    fontSize: 14,
    textDecorationLine: "underline",
    marginBottom: 10,
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
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  registerText: {
    color: "#5D6996",
    fontSize: 14,
  },
  registerLink: {
    color: "#A093C7",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
