import { Search } from 'lucide-react'

function SearchBar({ placeholder = 'Search insights' }) {
  return (
    <div className="hidden items-center gap-2 rounded-[18px] border border-slate-200/80 bg-white/70 px-3 py-2 text-sm text-slate-500 shadow-sm backdrop-blur md:flex dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
      <Search size={15} />
      <input
        type="text"
        placeholder={placeholder}
        className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  )
}

export default SearchBar
