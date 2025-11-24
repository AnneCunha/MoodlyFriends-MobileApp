import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, Button, Pressable, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
  isAdm: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose, userId, isAdm }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});

  const tableName = isAdm ? 'adm' : 'usuario';

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      Alert.alert('Erro ao buscar perfil', error.message);
    } else {
      setFormData(data);
    }
    setLoading(false);
  }, [userId, tableName]);

  useEffect(() => {
    if (visible) {
      fetchProfile();
    }
  }, [visible, fetchProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { id, tempo, ...updatedData } = formData; // Exclude id and tempo from update payload

    const { error } = await supabase
      .from(tableName)
      .update(updatedData)
      .eq('id', userId);

    if (error) {
      Alert.alert('Erro ao Salvar', error.message);
    } else {
      Alert.alert('Sucesso', 'Suas informações foram atualizadas.');
      onClose();
    }
    setLoading(false);
  };

  const getEditableFields = () => {
      if (!formData) return [];
      return Object.keys(formData).filter(key => key !== 'id' && key !== 'tempo');
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}><Text style={styles.closeButtonText}>X</Text></Pressable>
          <ScrollView>
            <Text style={styles.title}>Editar Minhas Informações</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#5D6996" />
            ) : (
              <View>
                {getEditableFields().map(field => (
                  <View key={field} style={styles.inputGroup}>
                    <Text style={styles.label}>{field}</Text>
                    <TextInput
                      style={styles.input}
                      value={formData[field]?.toString() || ''}
                      onChangeText={(value) => handleInputChange(field, value)}
                      placeholder={`Insira seu ${field}`}
                    />
                  </View>
                ))}
                <View style={{marginTop: 20}}>
                    <Button title="Salvar Alterações" onPress={handleSave} />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { height: '85%', width: '90%', backgroundColor: '#F0F8FF', borderRadius: 20, padding: 20, paddingTop: 50 },
  closeButton: { position: 'absolute', right: 15, top: 15, backgroundColor: '#e6e6fa', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  closeButtonText: { color: '#5D6996', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#3E4666', textAlign: 'center', marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, color: '#5D6996', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#A093C7', borderRadius: 8, padding: 10, backgroundColor: '#fff', fontSize: 16 },
});

export default EditProfileModal;
