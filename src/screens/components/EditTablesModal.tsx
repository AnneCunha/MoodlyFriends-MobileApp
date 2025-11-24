import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, Button, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import RecordEditForm from './RecordEditForm';

interface EditTablesModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditTablesModal: React.FC<EditTablesModalProps> = ({ visible, onClose }) => {
  const [view, setView] = useState('select'); // 'select', 'table', 'form'
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const fetchData = useCallback(async () => {
    if (!selectedTable) return;
    setLoading(true);

    const { data, error } = await supabase.from(selectedTable).select('*').order('id', { ascending: true });

    if (error) {
      Alert.alert('Erro ao buscar dados', error.message);
    } else if (data) {
      if (data.length > 0) {
        setTableHeaders(['actions', ...Object.keys(data[0])]);
        setTableData(data);
      } else {
        setTableHeaders([]);
        setTableData([]);
      }
    }
    setLoading(false);
  }, [selectedTable]);

  useEffect(() => {
    if (view === 'table') {
      fetchData();
    }
  }, [view, fetchData]);

  const handleSelectTable = (tableName: string) => {
    setSelectedTable(tableName);
    setView('table');
  };

  const handleBackToSelect = () => {
    setSelectedTable(null);
    setView('select');
  };

  const handleAdd = () => {
    setEditingRecord({}); // New record is an empty object
    setView('form');
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setView('form');
  };

  const handleDelete = (recordId: number) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza que deseja excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive', onPress: async () => {
          setLoading(true);
          const { error } = await supabase.from(selectedTable!).delete().eq('id', recordId);
          if (error) {
            Alert.alert('Erro ao Excluir', error.message);
          } else {
            Alert.alert('Sucesso', 'Registro excluído.');
            fetchData(); // Refresh data
          }
          setLoading(false);
        },
      },
    ]);
  };

  const handleSave = async (record: any) => {
    setLoading(true);
    const { id, ...recordData } = record;

    let error;
    if (id) { // Update existing record
      const { error: updateError } = await supabase.from(selectedTable!).update(recordData).eq('id', id);
      error = updateError;
    } else { // Insert new record
      recordData.tempo = new Date().toISOString();
      const { error: insertError } = await supabase.from(selectedTable!).insert([recordData]);
      error = insertError;
    }

    if (error) {
      Alert.alert('Erro ao Salvar', error.message);
    } else {
      Alert.alert('Sucesso', `Registro ${id ? 'atualizado' : 'adicionado'} com sucesso.`);
      setView('table');
    }
    setLoading(false);
  };
  
  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color="#5D6996" />;

    switch(view) {
      case 'select':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Selecionar Tabela</Text>
            <View style={styles.buttonGroup}><Button title="Gerenciar Usuários" onPress={() => handleSelectTable('usuario')} /></View>
            <View style={styles.buttonGroup}><Button title="Gerenciar Admins" onPress={() => handleSelectTable('adm')} /></View>
          </View>
        );
      case 'table':
        return (
          <View style={{flex: 1}}>
            <View style={styles.tableHeaderContainer}>
              <Button title="< Voltar" onPress={handleBackToSelect} />
              <Text style={styles.title}>Tabela: {selectedTable}</Text>
              <View style={styles.mainActionButtons}><Button title="Adicionar Novo" onPress={handleAdd}/></View>
            </View>
            <ScrollView horizontal><ScrollView vertical>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  {tableHeaders.map(h => <Text key={h} style={[styles.tableCell, styles.headerText, h === 'actions' && {minWidth: 150}]}>{h}</Text>)}
                </View>
                {tableData.map(row => (
                  <View key={row.id} style={styles.tableRow}>
                    {tableHeaders.map(header => {
                      if (header === 'actions') {
                        return (
                          <View key={header} style={[styles.tableCell, styles.actionCell]}>
                            <Button title="Editar" onPress={() => handleEdit(row)} />
                            <Text> </Text>{/* Spacer */}
                            <Button title="Excluir" color="#ff6347" onPress={() => handleDelete(row.id)} />
                          </View>
                        )
                      }
                      return <Text key={header} style={styles.tableCell}>{String(row[header])}</Text>
                    })}
                  </View>
                ))}
              </View>
            </ScrollView></ScrollView>
          </View>
        );
      case 'form':
        return <RecordEditForm initialData={editingRecord} headers={tableHeaders} onSave={handleSave} onCancel={() => setView('table')} />;
      default:
        return null;
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}><Text style={styles.closeButtonText}>X</Text></Pressable>
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { height: '85%', width: '90%', backgroundColor: '#F0F8FF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    closeButton: { position: 'absolute', right: 15, top: 15, backgroundColor: '#e6e6fa', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    closeButtonText: { color: '#5D6996', fontWeight: 'bold', fontSize: 16 },
    contentContainer: { flex: 1, paddingTop: 40, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#3E4666', textAlign: 'center', marginBottom: 10 },
    buttonGroup: { marginVertical: 10 },
    tableHeaderContainer: { marginBottom: 15 },
    mainActionButtons: { marginTop: 10, alignItems: 'center' },
    table: { borderWidth: 1, borderColor: '#A093C7', borderRadius: 8, overflow: 'hidden' },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#A093C7', backgroundColor: '#fff' },
    tableHeader: { backgroundColor: '#E6E6FA' },
    tableCell: { padding: 12, minWidth: 120, textAlign: 'left', borderRightWidth: 1, borderRightColor: '#E0E0E0' },
    actionCell: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', minWidth: 150 },
    headerText: { fontWeight: 'bold', color: '#3E4666' },
});

export default EditTablesModal;
