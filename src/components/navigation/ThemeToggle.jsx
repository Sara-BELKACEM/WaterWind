import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('waterwind-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme = storedTheme ?? (prefersDark ? 'dark' : 'light')
    const shouldDark = nextTheme === 'dark'

    setIsDark(shouldDark)
    document.documentElement.classList.toggle('dark', shouldDark)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDark
    setIsDark(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme)
    window.localStorage.setItem('waterwind-theme', nextTheme ? 'dark' : 'light')
  }

  return (
    <motion.div whileTap={{ scale: 0.96 }}>
      <Button
        variant="ghost"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={toggleTheme}
        className="rounded-[18px] border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-900/70"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
    </motion.div>
  )
}

export default ThemeToggle
