// src/components/QuickActions.jsx
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Settings } from 'lucide-react'
import ThemeToggle from "@/components/toogle-theme";

export default function QuickActionsComponents({ className = '' }) {
  const { i18n } = useTranslation()
  const setLang = (lng) => i18n.changeLanguage(lng)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Ações rápidas"
          className={`rounded-full ${className}`}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        className="w-auto px-2 py-2 flex items-center gap-1"
      >
        <Button variant="ghost" size="icon" onClick={() => setLang('pt')} aria-label="Português">
          🇧🇷
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setLang('en')} aria-label="English">
          🇺🇸
        </Button>

        <div className="mx-1 h-4 w-px bg-border" />

        <ThemeToggle />
        
      </PopoverContent>
    </Popover>
  )
}
