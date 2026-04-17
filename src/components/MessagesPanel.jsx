function MessagesPanel({ sectionClass, subtleBtnClass, messages, onClear }) {
  return (
    <section className={`${sectionClass} mt-5`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Incoming Messages</h3>
        <button onClick={onClear} className={subtleBtnClass} type="button">
          Clear
        </button>
      </div>
      {messages.length === 0 ? (
        <p className="mt-2 text-sm text-slate-600">No messages yet for current active topic.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {messages.map((msg, i) => (
            <li key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {msg}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MessagesPanel;
