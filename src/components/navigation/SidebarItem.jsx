import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SidebarItem({ label, path, icon: Icon, collapsed = false, onNavigate }) {
  return (
    <NavLink
      to={path}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex w-full items-center gap-3 overflow-hidden rounded-[20px] px-3 py-3 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
          collapsed && 'justify-center px-0',
        )
      }
    >
      {({ isActive }) => (
        <>
          <motion.span
            layout
            className={cn(
              'relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10',
              !isActive && 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
            )}
          >
            <Icon size={17} />
          </motion.span>

          {!collapsed ? (
            <span className="relative z-10 flex-1 truncate text-left">{label}</span>
          ) : null}

          {isActive ? (
            <motion.span
              layoutId="active-indicator"
              className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-emerald-500 to-sky-500"
            />
          ) : null}
        </>
      )}
    </NavLink>
  )
}

export default SidebarItem
