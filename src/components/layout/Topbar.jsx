import { ChevronsLeft, ChevronsRight, LayoutDashboard, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import Breadcrumb from '../navigation/Breadcrumb'
import SearchBar from '../navigation/SearchBar'
import NotificationButton from '../navigation/NotificationButton'
import ThemeToggle from '../navigation/ThemeToggle'
import UserMenu from '../navigation/UserMenu'

function Topbar({ onMenuClick, onToggleSidebar, collapsed = false }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            aria-label="Open mobile dashboard menu"
            onClick={onMenuClick}
            className="rounded-[18px] border border-slate-200 bg-white p-2 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
          >
            <Menu size={16} />
          </motion.button>

          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={onToggleSidebar}
            className="hidden rounded-[18px] border border-slate-200 bg-white p-2 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:block"
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>

          <div className="hidden rounded-[18px] bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-100 md:block">
            <LayoutDashboard size={18} />
          </div>

          <div className="min-w-0">
            <Breadcrumb />
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Smart operations control center</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchBar />
          <NotificationButton />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Topbar
