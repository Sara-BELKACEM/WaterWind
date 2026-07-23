import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Menu, X } from 'lucide-react'
import { publicLinks, publicMetadata } from '../constants/navigation'
import Footer from '../components/layout/Footer'
import ThemeToggle from '../components/navigation/ThemeToggle'
import { Button, Container } from '../components/ui'

function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <Container className="flex items-center justify-between gap-3 py-4">
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

          <div className="flex items-center gap-2">
            <NavLink to="/login" className="hidden md:block">
              <Button variant="secondary">Login</Button>
            </NavLink>
            <ThemeToggle />
            <Button
              variant="secondary"
              className="md:hidden"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </Container>

        {mobileOpen ? (
          <div className="border-t border-slate-200 bg-white/95 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
            <Container className="space-y-2 py-4">
              {publicLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
              >
                Login
              </NavLink>
            </Container>
          </div>
        ) : null}
      </header>

      <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8">
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  )
}

export default PublicLayout
