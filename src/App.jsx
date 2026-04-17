import { useEffect, useState } from "react";
import mqtt from "mqtt";

const BROKER_URL = "wss://test.mosquitto.org:8081";
const TOPIC = "react/mqtt/demo";

function App() {
  const [client, setClient] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const mqttClient = mqtt.connect(BROKER_URL);

    mqttClient.on("connect", () => {
      console.log("Connected ✅");
      mqttClient.subscribe(TOPIC);
    });

    mqttClient.on("message", (topic, payload) => {
      const msg = payload.toString();
      setMessages((prev) => [...prev, msg]);
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  const sendMessage = () => {
    if (client && input) {
      client.publish(TOPIC, input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚀 MQTT Chat Demo</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>

      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;