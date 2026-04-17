import { useEffect, useMemo, useRef, useState } from "react";
import mqtt from "mqtt";
import { Hero } from "./components/Hero";
import FlowPage from "./components/FlowPage";
import ProvidersPage from "./components/ProvidersPage";
import LabPage from "./components/LabPage";
import { sectionClass, fieldClass, primaryBtnClass, subtleBtnClass, navBtn } from "./constants";

const PUBLIC_BROKER_URL = "wss://test.mosquitto.org:8081";
const PUBLIC_DEFAULT_TOPIC = "react/mqtt/demo/learning";

const HIVE_DEFAULT_URL = import.meta.env.VITE_HIVEMQ_WS_URL || "";
const HIVE_DEFAULT_USERNAME = import.meta.env.VITE_HIVEMQ_USERNAME || "";
const HIVE_DEFAULT_PASSWORD = import.meta.env.VITE_HIVEMQ_PASSWORD || "";
const HIVE_DEFAULT_TOPIC =
  import.meta.env.VITE_HIVEMQ_TOPIC || "learning/course/created";

const normalizeWsUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("ws://") || trimmed.startsWith("wss://")) return trimmed;
  return `wss://${trimmed}`;
};

const sanitizeTopicPart = (value) =>
  value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");

const makeSession = (topic) => ({
  status: "disconnected",
  topic,
  activeTopic: "",
  isSubscribed: false,
  input: "",
  messages: [],
  error: "",
});

function App() {
  const clientsRef = useRef({ public: null, hive: null });

  const [mode, setMode] = useState("public");
  const [activePage, setActivePage] = useState("flow");
  const [sessions, setSessions] = useState({
    public: makeSession(PUBLIC_DEFAULT_TOPIC),
    hive: makeSession(HIVE_DEFAULT_TOPIC),
  });

  const [hiveWsUrl, setHiveWsUrl] = useState(HIVE_DEFAULT_URL);
  const [hiveUsername, setHiveUsername] = useState(HIVE_DEFAULT_USERNAME);
  const [hivePassword, setHivePassword] = useState(HIVE_DEFAULT_PASSWORD);

  const [topicParts, setTopicParts] = useState({
    domain: "learning",
    module: "course",
    action: "created",
  });

  const fields = [
    { id: "helper-domain", name: "domain", label: "Domain", placeholder: "learning" },
    { id: "helper-module", name: "module", label: "Module", placeholder: "course" },
    { id: "helper-action", name: "action", label: "Action", placeholder: "created" },
  ];

  const updateSession = (targetMode, patch) => {
    setSessions((prev) => ({
      ...prev,
      [targetMode]: {
        ...prev[targetMode],
        ...patch,
      },
    }));
  };

  const current = sessions[mode];
  const isConnected = current.status === "connected" || current.status === "reconnecting";

  const suggestedTopic = useMemo(() => {
    const domain = sanitizeTopicPart(topicParts.domain || "");
    const module = sanitizeTopicPart(topicParts.module || "");
    const action = sanitizeTopicPart(topicParts.action || "");
    return [domain, module, action].filter(Boolean).join("/");
  }, [topicParts]);

  const brokerConfig = useMemo(() => {
    if (mode === "public") {
      return {
        label: "Public Mosquitto (learning only)",
        brokerUrl: PUBLIC_BROKER_URL,
      };
    }

    return {
      label: "HiveMQ Cloud",
      brokerUrl: hiveWsUrl,
    };
  }, [mode, hiveWsUrl]);

  const connectBroker = () => {
    const activeMode = mode;
    if (clientsRef.current[activeMode]) return;

    const brokerUrl = normalizeWsUrl(brokerConfig.brokerUrl || "");
    if (!brokerUrl) {
      updateSession(activeMode, { error: "Broker URL is required." });
      return;
    }

    if (activeMode === "hive" && (!hiveUsername.trim() || !hivePassword.trim())) {
      updateSession(activeMode, {
        error: "HiveMQ username and password are required.",
      });
      return;
    }

    updateSession(activeMode, { error: "", status: "connecting" });

    const mqttOptions = {
      clientId: `react_demo_${activeMode}_${Math.random().toString(16).slice(2, 10)}`,
      clean: true,
      reconnectPeriod: 1500,
      connectTimeout: 10000,
    };

    if (activeMode === "hive") {
      mqttOptions.username = hiveUsername.trim();
      mqttOptions.password = hivePassword;
    }

    const client = mqtt.connect(brokerUrl, mqttOptions);
    clientsRef.current[activeMode] = client;

    client.on("connect", () => {
      updateSession(activeMode, { status: "connected", error: "" });
    });

    client.on("reconnect", () => {
      updateSession(activeMode, { status: "reconnecting" });
    });

    client.on("error", (err) => {
      updateSession(activeMode, {
        status: "error",
        error: err?.message || "Connection error",
      });
    });

    client.on("close", () => {
      clientsRef.current[activeMode] = null;
      updateSession(activeMode, {
        status: "disconnected",
        isSubscribed: false,
        activeTopic: "",
      });
    });

    client.on("message", (receivedTopic, payload) => {
      setSessions((prev) => {
        const session = prev[activeMode];
        if (session.activeTopic && receivedTopic !== session.activeTopic) {
          return prev;
        }

        return {
          ...prev,
          [activeMode]: {
            ...session,
            messages: [`[${receivedTopic}] ${payload.toString()}`, ...session.messages],
          },
        };
      });
    });
  };

  const disconnectBroker = () => {
    const client = clientsRef.current[mode];
    if (!client) return;
    client.end(true);
  };

  const subscribeTopic = () => {
    const activeMode = mode;
    const session = sessions[activeMode];
    const client = clientsRef.current[activeMode];
    const nextTopic = session.topic.trim();

    if (!client || !nextTopic) return;

    if (session.isSubscribed && session.activeTopic === nextTopic) {
      updateSession(activeMode, { error: "Already subscribed to this topic." });
      return;
    }

    const finalizeSubscribe = () => {
      client.subscribe(nextTopic, { qos: 1 }, (error) => {
        if (error) {
          updateSession(activeMode, { error: error.message || "Subscribe failed" });
          return;
        }

        updateSession(activeMode, {
          isSubscribed: true,
          activeTopic: nextTopic,
          messages: [],
          error: "",
        });
      });
    };

    if (session.activeTopic && session.activeTopic !== nextTopic) {
      client.unsubscribe(session.activeTopic, () => finalizeSubscribe());
      return;
    }

    finalizeSubscribe();
  };

  const publishMessage = () => {
    const activeMode = mode;
    const session = sessions[activeMode];
    const client = clientsRef.current[activeMode];

    const topic = session.activeTopic || session.topic.trim();
    const value = session.input.trim();

    if (!client || !session.isSubscribed || !topic || !value) return;

    client.publish(topic, value, { qos: 1 }, (error) => {
      if (error) {
        updateSession(activeMode, { error: error.message || "Publish failed" });
        return;
      }

      updateSession(activeMode, { input: "", error: "" });
    });
  };

  const updateTopic = (value) => {
    const activeMode = mode;
    const session = sessions[activeMode];

    updateSession(activeMode, {
      topic: value,
      isSubscribed: value.trim() === session.activeTopic,
    });
  };

  const setInputForMode = (value) => {
    updateSession(mode, { input: value });
  };

  const useSuggestedTopic = () => {
    if (!suggestedTopic) return;
    updateTopic(suggestedTopic);
  };

  const handleFieldChange = (name, value) => {
    setTopicParts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanupAll = () => {
    const publicClient = clientsRef.current.public;
    const hiveClient = clientsRef.current.hive;
    if (publicClient) publicClient.end(true);
    if (hiveClient) hiveClient.end(true);
  };

  useEffect(() => {
    const publicClient = clientsRef.current.public;
    const hiveClient = clientsRef.current.hive;
    return () => {
      if (publicClient) publicClient.end(true);
      if (hiveClient) hiveClient.end(true);
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <Hero
        title="MQTT Demo Playground"
        subTitle="MQTT Learning Lab"
        description="Learn MQTT in order, compare providers, and use the hands-on lab without long scrolling."
      />

      <section className={`${sectionClass} mb-5`}>
        <h2 className="text-xl font-semibold text-slate-900">Navigation</h2>
        <p className="mt-2 text-sm text-slate-700">
          Open one page at a time: Learn flow, Providers, or Hands-on Lab.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={navBtn(activePage === "flow")} onClick={() => setActivePage("flow")}>
            1. MQTT Flow
          </button>
          <button type="button" className={navBtn(activePage === "providers")} onClick={() => setActivePage("providers")}>
            2. Providers
          </button>
          <button type="button" className={navBtn(activePage === "lab")} onClick={() => setActivePage("lab")}>
            3. Hands-on Lab
          </button>
        </div>
      </section>

      {activePage === "flow" ? <FlowPage /> : null}

      {activePage === "providers" ? <ProvidersPage /> : null}

      {activePage === "lab" ? (
        <LabPage
          mode={mode}
          setMode={setMode}
          publicBrokerUrl={PUBLIC_BROKER_URL}
          hiveWsUrl={hiveWsUrl}
          setHiveWsUrl={setHiveWsUrl}
          hiveUsername={hiveUsername}
          setHiveUsername={setHiveUsername}
          hivePassword={hivePassword}
          setHivePassword={setHivePassword}
          hiveDefaultUrl={HIVE_DEFAULT_URL}
          hiveDefaultUsername={HIVE_DEFAULT_USERNAME}
          hiveDefaultPassword={HIVE_DEFAULT_PASSWORD}
          sectionClass={sectionClass}
          primaryBtnClass={primaryBtnClass}
          subtleBtnClass={subtleBtnClass}
          fieldClass={fieldClass}
          brokerConfig={brokerConfig}
          current={current}
          isConnected={isConnected}
          connectBroker={connectBroker}
          disconnectBroker={disconnectBroker}
          updateTopic={updateTopic}
          subscribeTopic={subscribeTopic}
          setInputForMode={setInputForMode}
          publishMessage={publishMessage}
          updateSession={updateSession}
          cleanupAll={cleanupAll}
          topicParts={topicParts}
          handleFieldChange={handleFieldChange}
          suggestedTopic={suggestedTopic}
          useSuggestedTopic={useSuggestedTopic}
          fields={fields}
        />
      ) : null}
    </main>
  );
}

export default App;
