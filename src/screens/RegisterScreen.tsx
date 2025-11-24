import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [fone, setFone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [comentario, setComentario] = useState("");

  async function handleRegister() {
    if (!name || !nick || !email || !password) {
      Alert.alert("Atenção", "Nome, Nick, Email e Senha são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro de Senha", "As senhas não coincidem!");
      return;
    }

    const { error } = await supabase.from('usuario').insert([{
      name,
      nick,
      email: email.trim().toLowerCase(),
      senha: password,
      cpf,
      fone,
      endereco,
      comentario,
      tempo: new Date().toISOString(),
    }]);

    if (error) {
      Alert.alert("Erro no Cadastro", error.message);
    } else {
      Alert.alert("Sucesso!", "Sua conta foi criada. Você já pode fazer o login.");
      (navigation as any).navigate("Login");
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        onPress={() => (navigation as any).goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Voltar para o Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Criar Nova Conta</Text>

      <TextInput style={styles.input} placeholder="Nome completo *" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Nick (apelido) *" value={nick} onChangeText={setNick} />
      <TextInput style={styles.input} placeholder="Email *" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <TextInput style={styles.input} placeholder="Senha *" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar Senha *" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Telefone" value={fone} onChangeText={setFone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={[styles.input, {height: 80}]} placeholder="Comentário (opcional)" value={comentario} onChangeText={setComentario} multiline />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  backText: {
    color: "#5D6996",
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 25,
    textAlign: 'center'
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
    backgroundColor: "#A093C7",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
