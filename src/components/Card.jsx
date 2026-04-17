
export const Card = ({ customClass, title, description, children }) => {
  return (
    <section
      className={`${customClass} rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur`}
    >
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        {description || children}
      </p>
    </section>
  );
};
