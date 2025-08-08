import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
