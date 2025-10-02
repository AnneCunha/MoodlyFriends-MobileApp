import React, { useState } from "react";

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
