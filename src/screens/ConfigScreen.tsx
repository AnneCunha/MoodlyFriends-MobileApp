import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfigScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Configurações Rápidas</Text>
      <Text>Aqui você pode ajustar as preferências do app.</Text>
    </View>
  );
};

export default ConfigScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 10 },
});
