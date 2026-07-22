import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Droplets } from 'lucide-react'
import { publicLinks } from '../../constants/navigation'
import { Button, Container } from '../ui'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <Droplets size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">WaterWind</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Smart Water Recommendation Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {publicLinks.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-emerald-500 after:transition-transform after:duration-300 hover:after:scale-x-100">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink to="/login">
            <Button variant="primary">Login</Button>
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-2xl bg-slate-100 p-2 text-slate-700 md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <Container className="space-y-2 py-4">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </NavLink>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
