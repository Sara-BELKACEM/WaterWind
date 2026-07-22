import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import MobileSidebar from '../components/layout/MobileSidebar'

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <div className={`fixed inset-y-0 left-0 z-30 hidden transition-all duration-300 lg:block`}>
            <Sidebar collapsed={isCollapsed} onToggle={() => setIsCollapsed((value) => !value)} />
          </div>
        </div>

        <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`}>
          <Topbar
            onMenuClick={() => setIsMobileSidebarOpen(true)}
            onToggleSidebar={() => setIsCollapsed((value) => !value)}
            collapsed={isCollapsed}
          />

          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="py-6 sm:py-8"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>

      <MobileSidebar open={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </div>
  )
}

export default DashboardLayout
