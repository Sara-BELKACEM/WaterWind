import { ChevronDown, LogOut, Settings, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'

function UserMenu() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-slate-200/80 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-bold text-white">
        O
      </div>

      <div className="hidden min-w-0 md:block">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">Omar</p>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">System Administrator</p>
      </div>

      <div className="ml-auto hidden items-center gap-2 lg:flex">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Online
        </span>
        <Button variant="ghost" aria-label="Open user menu" className="rounded-xl p-2">
          <ChevronDown size={16} />
        </Button>
      </div>

      <div className="hidden items-center gap-1 lg:flex">
        <Button variant="ghost" aria-label="Open settings" className="rounded-xl p-2">
          <Settings size={16} />
        </Button>
        <Button variant="ghost" aria-label="Log out" className="rounded-xl p-2" onClick={handleLogout}>
          <LogOut size={16} />
        </Button>
      </div>

      <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800 lg:hidden">
        <ShieldCheck size={14} className="text-emerald-500" />
        Admin
      </div>
    </div>
  )
}

export default UserMenu
