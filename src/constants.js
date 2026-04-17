export const sectionClass =
  "rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur";
export const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";
export const primaryBtnClass =
  "rounded-xl bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-300";
export const subtleBtnClass =
  "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

export const navBtn = (isActive) =>
  isActive
    ? "rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white"
    : "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50";