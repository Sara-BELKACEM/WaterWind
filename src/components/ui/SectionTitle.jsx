function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

export default SectionTitle
