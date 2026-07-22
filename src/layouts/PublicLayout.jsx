import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Menu } from 'lucide-react'
import { publicLinks, publicMetadata } from '../constants/navigation'
import { Button, Container } from '../components/ui'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <Container className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <Droplets size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold">{publicMetadata.brand}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{publicMetadata.tagline}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button variant="secondary" className="md:hidden">
            <Menu size={16} />
          </Button>
        </Container>
      </header>

      <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8">
        <Outlet />
      </motion.main>
    </div>
  )
}

export default PublicLayout
