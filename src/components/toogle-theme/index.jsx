import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/useTheme'

export default function ThemeToggle() {
  const { toggle } = useTheme()
//   const { toggle, theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {/* Toggle light/dark */}
      <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Se quiser botões específicos para light/dark/system */}
      {/* 
      <Button onClick={() => setTheme('light')}>Claro</Button>
      <Button onClick={() => setTheme('dark')}>Escuro</Button>
      <Button onClick={() => setTheme('system')}>Sistema</Button>
      */}
    </div>
  )
}
