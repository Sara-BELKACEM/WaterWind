import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui'

function QuickActionCard({ title, description, path, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={path}>
        <Card className="group h-full rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] transition dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
              <Icon size={20} />
            </div>
            <ArrowRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-500" />
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </Card>
      </Link>
    </motion.div>
  )
}

export default QuickActionCard
