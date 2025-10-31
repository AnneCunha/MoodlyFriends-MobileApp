import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

export default function HomeScreen() {
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(null);
  const [text, setText] = useState("");

  // Imagens das emoções
  const moodImages = [
    require("../../assets/moods/happy.png"),
    require("../../assets/moods/sleepy.png"),
    require("../../assets/moods/sad.png"),
    require("../../assets/moods/angry.png"),
    require("../../assets/moods/love.png"),
    require("../../assets/moods/sick.png"),
    require("../../assets/moods/thinking.png"),
    require("../../assets/moods/tired.png"),
  ];

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
        {moodImages.map((img, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.moodButton,
              selectedMoodIndex === i && styles.selectedMood,
            ]}
            onPress={() => setSelectedMoodIndex(i)}
          >
            <Image source={img} style={styles.moodImage} />
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

      {/* Gráfico */}
      <Text style={[styles.sectionTitle, { marginTop: 5 }]}>Tendência Emocional</Text>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartMonth}>Outubro 2025</Text>
          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Humor</Text>
          </View>
        </View>

        <View style={styles.chartWithImages}>
          {/* Emojis no eixo Y */}
          <View style={styles.yAxis}>
            {moodImages.slice(0, 5).map((img, i) => (
              <Image key={i} source={img} style={styles.yAxisImage} />
            ))}
          </View>

          {/* Gráfico principal */}
          <View style={{ flex: 1, overflow: "hidden" }}>
            <LineChart
              data={{
                labels: ["01/10", "07/10", "13/10", "19/10", "25/10"],
                datasets: [
                  {
                    data: [4, 5, 3, 5, 4, 2, 4, 3, 5, 4, 5, 1],
                    color: (opacity = 1) => `rgba(160,147,199,${opacity})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={280}     // ← largura fixa do SVG
              height={180}    // ← altura fixa do SVG
              withVerticalLabels={false}
              yLabelsOffset={-50}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(160,147,199,${opacity})`,
                labelColor: () => "transparent",
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#5D6996",
                },
                propsForBackgroundLines: {
                  stroke: "#eee",
                },
              }}
              bezier
              style={{
                borderRadius: 16,
                marginLeft: -10,
                transform: [{ scaleX: 1.2 }],
              }}
            />
          </View>
        </View>
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
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#333" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#333" },
  moodContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  moodButton: {
    width: 70,
    height: 70,
    margin: 7,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#5D6996",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedMood: { borderWidth: 3, borderColor: "#5D6996" },
  moodImage: { width: 50, height: 50, borderRadius: 25 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 150,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#A6D7A0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  registerText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chartMonth: { fontWeight: "600", color: "#444" },
  legend: { flexDirection: "row", alignItems: "center" },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5D6996",
    marginRight: 6,
  },
  legendText: { color: "#5D6996", fontSize: 13 },
  chartWithImages: { flexDirection: "row", alignItems: "center" },
  yAxis: {
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 2,
  },
  yAxisImage: { width: 35, height: 35, resizeMode: "contain", marginTop: 5 },
  chartStyle: { borderRadius: 16 },
});
