import { useMemo } from 'react'

const images = import.meta.glob('/src/assets/images/login/*.{png,jpg,jpeg,webp}', { eager: true })

const TTL_MS = 60 * 60 * 1000

export default function LoginImageComponent({
  className = '',
  storageKey = 'login-random-image',
}) {
  const src = useMemo(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const { url, ts, listHash } = JSON.parse(raw)
        const stillValid = Date.now() - ts < TTL_MS
        const currentList = Object.keys(images).sort().join('|')
        const currentHash = String(currentList.length) + ':' + currentList

        if (stillValid && listHash === currentHash) {
          return url
        }
      }
    } catch { /* ignore */ }

    const files = Object.values(images).map((m) => m.default)
    const idx = Math.floor(Math.random() * files.length)
    const chosen = files[idx]
    try {
      const list = Object.keys(images).sort().join('|')
      const listHash = String(list.length) + ':' + list
      localStorage.setItem(storageKey, JSON.stringify({ url: chosen, ts: Date.now(), listHash }))
    } catch { /* ignore */ }

    return chosen
  }, [storageKey])

  return (
    <img
      src={src}
      alt="Login background"
      className={`object-cover w-full h-full ${className} absolute inset-0 dark:brightness-[0.6] dark:grayscale`}
    />
  )
}
