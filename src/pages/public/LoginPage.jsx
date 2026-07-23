import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Droplets, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-sky-500 p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.24),_transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Droplets size={22} />
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back to WaterWind</h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50/90 sm:text-base">
                Access your smart irrigation operations, review analysis history, and manage premium field recommendations from one secure workspace.
              </p>
            </div>

            <div className="space-y-3 rounded-[24px] border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck size={16} />
                Enterprise-ready authentication
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-50/80">
                <Sparkles size={14} />
                Secure, responsive access for field operators and administrators
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="p-6 sm:p-8 lg:p-10"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Secure sign in</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Sign in to your dashboard</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use your workspace credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@waterwind.io"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>
              <Link to="/" className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-300">
                Need help?
              </Link>
            </div>

            <Button type="submit" className="w-full rounded-[18px]">
              Sign in
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
            Demo access: use any email and password to continue to the dashboard.
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
