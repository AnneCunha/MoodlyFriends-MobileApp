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
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const emailInput = email.trim().toLowerCase();
    const passwordInput = password.trim();

    if (emailInput === "" || passwordInput === "") {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      // 1. Check in 'usuario' table
      let { data: userData, error: userError } = await supabase
        .from('usuario')
        .select('id, nick') // Fetch id and nick
        .eq('email', emailInput)
        .eq('senha', passwordInput)
        .single();

      if (userError && userError.code !== 'PGRST116') throw new Error(userError.message);

      if (userData) {
        (navigation as any).navigate("Welcome", { name: userData.nick, userId: userData.id, isAdmin: false });
        return;
      }

      // 2. If not found, check in 'adm' table
      let { data: admData, error: admError } = await supabase
        .from('adm')
        .select('id, nick') // Fetch id and nick
        .eq('email', emailInput)
        .eq('senha', passwordInput)
        .single();

      if (admError && admError.code !== 'PGRST116') throw new Error(admError.message);

      if (admData) {
        (navigation as any).navigate("Welcome", { name: admData.nick, userId: admData.id, isAdmin: true });
        return;
      }

      Alert.alert("Falha no Login", "Email ou senha inválidos.");

    } catch (e: any) {
      Alert.alert("Erro de Conexão", e.message);
    }
  }

  function handleRegister() {
    (navigation as any).navigate("RegisterScreen");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Insira suas informações para efetuar o Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
