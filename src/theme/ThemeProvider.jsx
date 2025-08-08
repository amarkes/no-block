import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './useTheme'

const STORAGE_KEY = 'theme' // 'light' | 'dark' | 'system'

function applyTheme(theme) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const wantDark = theme === 'dark' || (theme === 'system' && prefersDark)
  root.classList.toggle('dark', wantDark)
}

export default function ThemeProvider({ defaultTheme = 'system', children }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem(STORAGE_KEY) || defaultTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const stored = localStorage.getItem(STORAGE_KEY) || 'system'
      if (stored === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const value = useMemo(() => ({
    theme,
    setTheme: (t) => setThemeState(t),
    toggle: () =>
      setThemeState(document.documentElement.classList.contains('dark') ? 'light' : 'dark'),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
