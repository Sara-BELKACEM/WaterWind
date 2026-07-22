import { useMemo } from 'react'
import { ChevronsLeft, ChevronsRight, Droplets, LogOut, Settings, Sparkles, X } from 'lucide-react'
import { dashboardLinks } from '../../constants/navigation'
import SidebarItem from '../navigation/SidebarItem'

function Sidebar({ collapsed = false, mobile = false, onClose, onToggle }) {
  const items = useMemo(
    () =>
      dashboardLinks.map((item) => ({
        ...item,
        icon: item.icon,
      })),
    [],
  )

  return (
    <aside
      className={[
        'flex h-full flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90',
        mobile ? 'w-[280px]' : '',
        collapsed ? 'w-[80px]' : 'w-[280px]',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
            <Droplets size={18} />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">WaterWind</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Operations Center</p>
            </div>
          ) : null}
        </div>

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            className="hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:block"
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-3">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            label={item.label}
            path={item.path}
            icon={item.icon}
            collapsed={collapsed}
            onNavigate={onClose}
          />
        ))}
      </nav>

      <div className="space-y-2 px-3 pb-4">
        <div className="border-t border-slate-200 pt-4 dark:border-slate-800" />

        <SidebarItem
          label="Settings"
          path="/dashboard/settings"
          icon={Settings}
          collapsed={collapsed}
          onNavigate={onClose}
        />
        <SidebarItem
          label="Logout"
          path="/dashboard/logout"
          icon={LogOut}
          collapsed={collapsed}
          onNavigate={onClose}
        />

        <div className="rounded-[20px] bg-gradient-to-r from-emerald-50 to-sky-50 p-3 text-xs text-slate-700 dark:from-emerald-950/50 dark:to-sky-950/50 dark:text-slate-100">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            <Sparkles size={14} />
            System health
          </div>
          <p>Premium dashboard shell ready for production modules.</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
