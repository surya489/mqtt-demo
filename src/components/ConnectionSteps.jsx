function ConnectionSteps({
  sectionClass,
  fieldClass,
  primaryBtnClass,
  subtleBtnClass,
  brokerLabel,
  brokerUrl,
  status,
  isConnected,
  onConnect,
  onDisconnect,
  topic,
  onTopicChange,
  onSubscribe,
  canSubscribe,
  isSubscribed,
  activeTopic,
  input,
  onInputChange,
  onPublish,
  canPublish,
}) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-slate-900">Step 1: Connect</h3>
        <p className="mt-2 text-sm text-slate-700">
          Broker: <strong>{brokerLabel}</strong>
        </p>
        <p className="mt-1 text-sm text-slate-700 break-all">
          URL: <code>{brokerUrl || "not set"}</code>
        </p>
        <p className="mt-1 text-sm text-slate-700">
          Status: <strong>{status}</strong>
        </p>
        <div className="mt-4 flex gap-2">
          <button onClick={onConnect} disabled={isConnected} type="button" className={primaryBtnClass}>
            Connect
          </button>
          <button onClick={onDisconnect} disabled={!isConnected} type="button" className={subtleBtnClass}>
            Disconnect
          </button>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-slate-900">Step 2: Subscribe</h3>
        <p className="mt-2 text-sm text-slate-700">Change topic and subscribe.</p>
        <input
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="Enter topic"
          className={`${fieldClass} mt-3`}
        />
        <button onClick={onSubscribe} disabled={isSubscribed} type="button" className={`${primaryBtnClass} mt-3 ${isSubscribed ? "cursor-not-allowed pointer-none:" : ""}`}>
          Subscribe
        </button>
        <p className="mt-2 text-sm text-slate-700">
          Subscribed: <strong>{isSubscribed ? "yes" : "no"}</strong>
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Active topic: <code>{activeTopic || "none"}</code>
        </p>
      </div>

      <div className={sectionClass}>
        <h3 className="text-lg font-semibold text-slate-900">Step 3: Publish</h3>
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type message"
          className={`${fieldClass} mt-3`}
        />
        <button onClick={onPublish} disabled={!canPublish} type="button" className={`${primaryBtnClass} mt-3`}>
          Publish
        </button>
      </div>
    </section>
  );
}

export default ConnectionSteps;
