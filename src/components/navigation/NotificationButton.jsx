import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { Button } from '../ui'

function NotificationButton() {
  return (
    <motion.div whileTap={{ scale: 0.96 }}>
      <Button variant="ghost" className="relative rounded-[18px] border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-900/70">
        <Bell size={16} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
      </Button>
    </motion.div>
  )
}

export default NotificationButton
