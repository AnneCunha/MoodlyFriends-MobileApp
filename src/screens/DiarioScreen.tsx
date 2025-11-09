import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  TouchableOpacity,
  ListRenderItem,
  Modal, 
  SafeAreaView 
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
// A importação do Icon não é mais necessária, pois o botão de check foi removido.
// import Icon from 'react-native-vector-icons/FontAwesome';

type EmotionalEntry = {
  id: number;
  date: string; 
  emoji: string; 
  details: string;
};

type MarkedDates = {
  [date: string]: {
    marked: boolean;
    selected?: boolean;
    selectedDotColor?: string; 
    customStyles?: any;
    dots?: { color: string }[];
  };
};

type RecordsListProps = {
  selectedDate: string;
  entries: EmotionalEntry[];
  onShowAll: () => void; 
};

type RecordItemProps = {
  item: EmotionalEntry;
  selectedDate?: string; 
};

LocaleConfig.locales['pt-BR'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-BR';


const INITIAL_ENTRIES: EmotionalEntry[] = [
  { id: 1, date: '2025-08-01', emoji: '😔', details: 'Dia difícil no trabalho, muita ansiedade com o projeto.' },
  { id: 2, date: '2025-08-09', emoji: '😊', details: 'Dia produtivo, consegui terminar meu projeto. Me senti aliviado!' },
  { id: 3, date: '2025-08-07', emoji: '😠', details: 'Recebi um feedback negativo inesperado. Fiquei irritado o dia todo.' },
  { id: 4, date: '2025-08-02', emoji: '😐', details: 'Dia normal, nada de especial aconteceu.' },
  { id: 5, date: '2025-08-09', emoji: '🤩', details: 'Bônus confirmado! Muito feliz.' },
];

const RecordItemView: React.FC<RecordItemProps> = ({ item, selectedDate }) => (
  <View style={styles.recordItem}>
    <View style={styles.recordContent}>
      <Text style={styles.recordDate}>
        {selectedDate && item.date === selectedDate 
          ? `Registro de ${item.date.substring(8, 10)} Set` 
          : `${item.date.substring(8, 10)} Set`
        }
      </Text>
      <Text style={styles.recordDetail}>
        {item.details}
      </Text>
    </View>
    <Text style={styles.recordEmoji}>{item.emoji}</Text>
  </View>
);

const RecordsList: React.FC<RecordsListProps> = ({ selectedDate, entries, onShowAll }) => {
  
  const filteredEntries = entries
    .filter(entry => entry.date === selectedDate)
    .sort((a, b) => b.id - a.id); 
    
  const displayedEntries = filteredEntries.length > 0 
    ? filteredEntries
    : entries.slice(0, 3).sort((a, b) => b.id - a.id);

  const renderItem: ListRenderItem<EmotionalEntry> = ({ item }) => (
    <RecordItemView item={item} selectedDate={selectedDate} />
  );

  return (
    <View style={styles.recordsContainer}>
      <Text style={styles.recordsHeader}>
        {filteredEntries.length > 0 
          ? `Registros de ${selectedDate}` 
          : 'Registros Recentes'
        }
      </Text>
      <FlatList
        data={displayedEntries}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false} 
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registro encontrado.</Text>}
      />
      
      <TouchableOpacity style={styles.viewAllButton} onPress={onShowAll}>
        <Text style={styles.viewAllText}>Ver todos os registros</Text>
      </TouchableOpacity>
    </View>
  );
};

const DiarioScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-08-01');
  const [entries, setEntries] = useState<EmotionalEntry[]>(INITIAL_ENTRIES);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const markedDates = useMemo(() => {
    const marked: MarkedDates = {};
    entries.forEach(entry => {
      let dotColor = '#b8aeef'; 
      if (entry.emoji === '😊' || entry.emoji === '🤩') dotColor = '#A6D7A0'; 
      else if (entry.emoji === '😔') dotColor = '#ffad99'; 
      else if (entry.emoji === '😠') dotColor = '#ff6b6b'; 

      if (marked[entry.date]) {
        marked[entry.date].dots?.push({ color: dotColor });
      } else {
        marked[entry.date] = {
          dots: [{ color: dotColor }],
          marked: true,
        };
      }
    });

    marked[selectedDate] = {
      ...(marked[selectedDate] || { marked: true }), 
      selected: true,
      selectedDotColor: 'white', 
    };
    
    return marked;
  }, [entries, selectedDate]);

  return (
    <> 
      <ScrollView 
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.fullScreenContainer}
      >
        <Calendar
          current={'2025-08-01'}
          markedDates={markedDates}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markingType={'multi-dot'} 
          theme={{
            backgroundColor: '#f5f5f5',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#6d79bdff',
            selectedDayBackgroundColor: '#6d79bdff',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#A093C7',
            dayTextColor: '#2d4150',
            dotColor: '#6d79bdff', 
          }}
          style={styles.calendarStyle}
        />
        
        {/* Bloco de "quick entry" removido daqui */}

        <RecordsList 
          selectedDate={selectedDate} 
          entries={entries} 
          onShowAll={() => setIsModalVisible(true)} 
        />
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Todos os Registros</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Voltar ao calendário</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={entries.sort((a, b) => b.id - a.id)} 
            renderItem={({ item }) => <RecordItemView item={item} />} 
            keyExtractor={item => item.id.toString()}
            style={styles.modalList}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: { 
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullScreenContainer: {
    padding: 10,
    paddingBottom: 40, 
  },
  calendarStyle: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  recordsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recordsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff', 
    paddingHorizontal: 10, 
  },
  recordContent: {
    flex: 1,
    marginRight: 10,
  },
  recordDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  recordDetail: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  recordEmoji: {
    fontSize: 28,
    marginLeft: 15,
  },
  viewAllButton: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6d79bdff',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: 10,
  },
  // Estilos para a simulação do quick entry (caixa de Hora/Resetar/Check) - REMOVIDOS
  
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    fontSize: 16,
    color: '#6d79bdff',
    fontWeight: '600',
  },
  modalList: {
    flex: 1,
  },
});

export default DiarioScreen;