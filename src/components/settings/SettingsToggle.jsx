function SettingsToggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 px-3 py-3 dark:border-slate-800 dark:bg-slate-800/50">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${checked ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>
    </label>
  )
}

export default SettingsToggle
