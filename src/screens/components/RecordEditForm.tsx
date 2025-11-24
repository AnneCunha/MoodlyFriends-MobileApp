import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface RecordEditFormProps {
  initialData: any;
  headers: string[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

const RecordEditForm: React.FC<RecordEditFormProps> = ({ initialData, headers, onSave, onCancel }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const isFieldDisabled = (field: string) => {
    return field === 'id' || field === 'tempo';
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{initialData.id ? 'Editar Registro' : 'Adicionar Registro'}</Text>
      {headers.filter(header => header !== 'actions').map(header => (
        <View key={header} style={styles.inputGroup}>
          <Text style={styles.label}>{header}</Text>
          <TextInput
            style={[styles.input, isFieldDisabled(header) && styles.disabledInput]}
            value={formData[header]?.toString() || ''}
            onChangeText={(value) => handleInputChange(header, value)}
            editable={!isFieldDisabled(header)}
            placeholder={isFieldDisabled(header) ? 'Gerado automaticamente' : `Insira ${header}`}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={() => onSave(formData)} />
        <View style={{height: 10}} />{/* Spacer */}
        <Button title="Cancelar" onPress={onCancel} color="#ff6347" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E4666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#5D6996',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A093C7',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  disabledInput: {
      backgroundColor: '#f0f0f0',
      color: '#888'
  },
  buttonContainer: {
      marginTop: 20,
  }
});

export default RecordEditForm;
