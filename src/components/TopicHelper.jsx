function TopicHelper({
  sectionClass,
  fieldClass,
  primaryBtnClass,
  title,
  description,
  fields,
  values,
  onFieldChange,
  suggestedTopic,
  onUseTopic,
  buttonText,
}) {
  return (
    <section className={`${sectionClass} rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur`}>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-700">{description}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.id}
              className="mb-1 block text-xs font-medium text-slate-600"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.name}
              value={values[field.name] || ""}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              className={fieldClass}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Suggested topic: <code>{suggestedTopic || "complete all fields"}</code>
      </p>

      <button
        onClick={onUseTopic}
        disabled={!suggestedTopic}
        type="button"
        className={`${primaryBtnClass} mt-2`}
      >
        {buttonText}
      </button>
    </section>
  );
}

export default TopicHelper;
