

export const Hero = ({
    title,
    subTitle,
    description
}) => {
    return (
        <div className="mb-6 rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-900 via-teal-800 to-emerald-800 p-6 text-left text-white shadow-lg md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                {subTitle}
            </p>
            <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-cyan-50 md:text-base">
                {description}
            </p>
        </div>
    )
}