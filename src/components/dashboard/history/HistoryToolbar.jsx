import { Filter, RefreshCw, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { Button, Input } from '../../ui'

function HistoryToolbar({
  search,
  onSearchChange,
  soilFilter,
  onSoilFilterChange,
  statusFilter,
  onStatusFilterChange,
  deviceFilter,
  onDeviceFilterChange,
  sortBy,
  onSortChange,
  onClear,
  onRefresh,
}) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr_0.8fr_0.8fr_0.8fr]">
        <div className="xl:col-span-2">
          <label className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by crop, soil, device, or ID"
              className="w-full bg-transparent outline-none"
            />
          </label>
        </div>

        <select
          value={soilFilter}
          onChange={(event) => onSoilFilterChange(event.target.value)}
          className="rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All soils</option>
          <option value="Loamy">Loamy</option>
          <option value="Clay">Clay</option>
          <option value="Silty">Silty</option>
          <option value="Sandy">Sandy</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Archived">Archived</option>
        </select>

        <select
          value={deviceFilter}
          onChange={(event) => onDeviceFilterChange(event.target.value)}
          className="rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All devices</option>
          <option value="WaterWind Micro">WaterWind Micro</option>
          <option value="WaterWind Pro">WaterWind Pro</option>
        </select>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            <Filter size={14} />
            <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="bg-transparent outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="score">Highest Match</option>
              <option value="score-low">Lowest Match</option>
            </select>
          </label>

          <Button variant="outline" className="rounded-[18px]" onClick={onRefresh}>
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button variant="ghost" className="rounded-[18px]" onClick={onClear}>
            <RotateCcw size={16} />
            Clear Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-[18px]">
            <SlidersHorizontal size={16} />
            Export CSV
          </Button>
          <Button className="rounded-[18px]">Create New Analysis</Button>
        </div>
      </div>
    </div>
  )
}

export default HistoryToolbar
