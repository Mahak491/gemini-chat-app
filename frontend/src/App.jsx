import { useState } from "react";
import { sendChatMessage } from "./services/api";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setReply("");
    setError("");
    
    try {
      const data = await sendChatMessage(message);
      setReply(data.reply);
    } catch (error) {
      setError("Error: Could not get response from server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gemini Chat App</h2>

      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />

      <button onClick={sendMessage} disabled={loading} className={loading ? "loading" : ""}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      {error && <p className="error">{error}</p>}
      {reply && <p>{reply}</p>}
    </div>
  );
}

export default App;