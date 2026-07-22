import { Download, RefreshCw, Search } from 'lucide-react'
import { Button } from '../../ui'

function SoilToolbar({ search, onSearchChange, retentionFilter, onRetentionFilterChange, drainageFilter, onDrainageFilterChange, sortBy, onSortChange, onRefresh }) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.8fr_auto_auto]">
        <label className="block">
          <span className="sr-only">Search soils</span>
          <div className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search soil types"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </label>

        <label className="block">
          <span className="sr-only">Filter by retention</span>
          <select
            value={retentionFilter}
            onChange={(event) => onRetentionFilterChange(event.target.value)}
            className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">All retention</option>
            <option value="high">High retention</option>
            <option value="medium">Medium retention</option>
            <option value="low">Low retention</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Filter by drainage</span>
          <select
            value={drainageFilter}
            onChange={(event) => onDrainageFilterChange(event.target.value)}
            className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">All drainage</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Sort soils</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="name">Sort: Name</option>
            <option value="retention">Sort: Retention</option>
            <option value="status">Sort: Status</option>
          </select>
        </label>

        <Button variant="ghost" onClick={onRefresh} className="rounded-[18px]">
          <RefreshCw size={15} />
          Refresh
        </Button>

        <Button variant="outline" className="rounded-[18px]">
          <Download size={15} />
          Export
        </Button>
      </div>
    </div>
  )
}

export default SoilToolbar
