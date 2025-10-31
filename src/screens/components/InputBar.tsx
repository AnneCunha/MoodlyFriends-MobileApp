import React, { useState } from "react";
<<<<<<< HEAD
=======
import { 
  View,           
  TextInput,      
  TouchableOpacity, 
  Text,           
  StyleSheet      
} from "react-native";
>>>>>>> a467f972a7496193efae568a206514b559d2db83

type InputBarProps = {
  onSend: (message: string) => void;
};

const InputBar: React.FC<InputBarProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
<<<<<<< HEAD
    <div
      style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}
    >
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        placeholder="Digite sua mensagem..."
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={handleSend} style={{ marginLeft: "8px" }}>
        Enviar
      </button>
    </div>
  );
};

export default InputBar;
=======
    <View style={styles.container}>

      <View style={styles.inputArea}>
        <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem..."
        onSubmitEditing={handleSend} 
      />
      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#6d79bdff",
    alignItems: 'center',
  },
inputArea: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff", 
    marginRight: 8,
    position: 'relative',
    minHeight: 44,
  },

  textInput: {
    flex: 1, 
    padding: 8,
    paddingRight: 85, 
    minHeight: 44, 
  },
  
  button: {
    position: 'absolute',
    right: 5, 
    backgroundColor: "#A093C7", 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14, 
  },
});

export default InputBar;
>>>>>>> a467f972a7496193efae568a206514b559d2db83
