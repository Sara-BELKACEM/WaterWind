import { Globe2, Mail, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">WaterWind</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Smart water intelligence for modern agriculture.</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Quick Links</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600 sm:flex-col sm:gap-2 dark:text-slate-300">
            <li><Link to="/about" className="transition hover:text-emerald-600 dark:hover:text-emerald-300">About</Link></li>
            <li><Link to="/products" className="transition hover:text-emerald-600 dark:hover:text-emerald-300">Products</Link></li>
            <li><Link to="/contact" className="transition hover:text-emerald-600 dark:hover:text-emerald-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Company</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600 sm:flex-col sm:gap-2 dark:text-slate-300">
            <li>AgriTech</li>
            <li>Renewable Water Systems</li>
            <li>Crop Intelligence</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Social</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Globe2 size={16} /></span>
            <span className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Send size={16} /></span>
            <span className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Mail size={16} /></span>
          </div>
        </div>
      </Container>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800">
        © 2026 WaterWind. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
