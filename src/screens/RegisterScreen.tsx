import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    Alert.alert("Sucesso", "Conta criada com sucesso!");
    (navigation as any).navigate("LoginScreen");
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => (navigation as any).goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/icon.png")} // substitua pelo seu logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Criar Conta</Text>

      {/* Campos */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Botão Registrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Link para Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => (navigation as any).navigate("LoginScreen")}>
          <Text style={styles.loginLink}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <Text style={styles.footerText}>
        Seu companheiro para gerenciamento emocional
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F6FA",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    paddingBottom: 0,
  },
  backText: {
    color: "#5D6996",
    fontWeight: "600",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#A6D7A0",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  loginText: {
    color: "#555",
    fontSize: 14,
  },
  loginLink: {
    color: "#A093C7",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  footerText: {
    color: "#9BA4B4",
    fontSize: 13,
    marginTop: 60,
    textAlign: "center",
  },
});
