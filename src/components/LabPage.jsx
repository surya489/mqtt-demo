import TopicHelper from "./TopicHelper";
import BrokerSelector from "./BrokerSelector";
import ConnectionSteps from "./ConnectionSteps";
import MessagesPanel from "./MessagesPanel";

const LabPage = ({
  mode,
  setMode,
  publicBrokerUrl,
  hiveWsUrl,
  setHiveWsUrl,
  hiveUsername,
  setHiveUsername,
  hivePassword,
  setHivePassword,
  hiveDefaultUrl,
  hiveDefaultUsername,
  hiveDefaultPassword,
  sectionClass,
  primaryBtnClass,
  subtleBtnClass,
  fieldClass,
  brokerConfig,
  current,
  isConnected,
  connectBroker,
  disconnectBroker,
  updateTopic,
  subscribeTopic,
  setInputForMode,
  publishMessage,
  updateSession,
  cleanupAll,
  topicParts,
  handleFieldChange,
  suggestedTopic,
  useSuggestedTopic,
  fields,
}) => {
  return (
    <>
      <TopicHelper
        sectionClass="mb-5"
        fieldClass={fieldClass}
        primaryBtnClass={primaryBtnClass}
        title="Topic Naming Helper"
        description="Fill these fields to generate a clean topic."
        fields={fields}
        values={topicParts}
        onFieldChange={handleFieldChange}
        suggestedTopic={suggestedTopic}
        onUseTopic={useSuggestedTopic}
        buttonText="Use This Topic In Step 2"
      />

      <BrokerSelector
        mode={mode}
        setMode={setMode}
        publicBrokerUrl={publicBrokerUrl}
        hiveWsUrl={hiveWsUrl}
        setHiveWsUrl={setHiveWsUrl}
        hiveUsername={hiveUsername}
        setHiveUsername={setHiveUsername}
        hivePassword={hivePassword}
        setHivePassword={setHivePassword}
        hiveDefaultUrl={hiveDefaultUrl}
        hiveDefaultUsername={hiveDefaultUsername}
        hiveDefaultPassword={hiveDefaultPassword}
        sectionClass={sectionClass}
        primaryBtnClass={primaryBtnClass}
        subtleBtnClass={subtleBtnClass}
        fieldClass={fieldClass}
      />

      <ConnectionSteps
        sectionClass={sectionClass}
        fieldClass={fieldClass}
        primaryBtnClass={primaryBtnClass}
        subtleBtnClass={subtleBtnClass}
        brokerLabel={brokerConfig.label}
        brokerUrl={brokerConfig.brokerUrl}
        status={current.status}
        isConnected={isConnected}
        onConnect={connectBroker}
        onDisconnect={disconnectBroker}
        topic={current.topic}
        onTopicChange={updateTopic}
        onSubscribe={subscribeTopic}
        canSubscribe={
          isConnected &&
          current.status !== "disconnected" &&
          !!current.topic.trim()
        }
        isSubscribed={current.isSubscribed}
        activeTopic={current.activeTopic}
        input={current.input}
        onInputChange={setInputForMode}
        onPublish={publishMessage}
        canPublish={current.isSubscribed && !!current.input.trim()}
      />

      {current.error ? (
        <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Error: <strong>{current.error}</strong>
        </p>
      ) : null}

      <MessagesPanel
        sectionClass={sectionClass}
        subtleBtnClass={subtleBtnClass}
        messages={current.messages}
        onClear={() => updateSession(mode, { messages: [] })}
      />

      <div className="mt-5">
        <button type="button" onClick={cleanupAll} className={subtleBtnClass}>
          Disconnect All Connections
        </button>
      </div>
    </>
  );
};

export default LabPage;