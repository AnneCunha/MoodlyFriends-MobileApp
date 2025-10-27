import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [text, setText] = useState("");

  const moods = ["😊", "😢", "😡", "😴"]; // lista dos emojis
  const history = ["😊", "😢", "😊", "😡", "😴", "🙂", "😊"]; // simulação últimos dias

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.greeting}>Olá, Usuário!</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={36} color="#5D6996" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Mood tracker */}
      <Text style={styles.sectionTitle}>Como você está hoje?</Text>
      <View style={styles.moodContainer}>
        {Array.from({ length: 12 }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.moodButton,
              selectedMood === moods[i % moods.length] && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(moods[i % moods.length])}
          >
            <Text style={styles.moodText}>{moods[i % moods.length]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Conte mais sobre como você está se sentindo..."
        value={text}
        onChangeText={setText}
        multiline
      />

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Registrar</Text>
      </TouchableOpacity>

      {/* Progress */}
      <Text style={styles.sectionTitle}>Seu progresso</Text>
      <View style={styles.progressContainer}>
        {history.map((mood, i) => (
          <View key={i} style={styles.progressItem}>
            <Text style={styles.progressEmoji}>{mood}</Text>
            <Text style={styles.progressDay}>
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9E6F2",
    padding: 20,
  },
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 0,
  backgroundColor: "#fff",   // fundo branco do header
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
  marginBottom: 15,
},
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  moodButton: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: "#5D6996",
  },
  moodText: {
    fontSize: 26,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 200,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#A6D7A0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 25,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },
  progressItem: {
    alignItems: "center",
  },
  progressEmoji: {
    fontSize: 20,
  },
  progressDay: {
    fontSize: 12,
    color: "#666",
  },
});
