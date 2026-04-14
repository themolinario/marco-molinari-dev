import { useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggle() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    applyThemeMode(next)
    window.localStorage.setItem('theme', next)
  }

  const isLight = mode === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Modalità chiara attiva. Clicca per scuro.' : 'Modalità scura attiva. Clicca per chiaro.'}
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px 4px 6px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        cursor: 'pointer',
        flexShrink: 0,
        transition: `border-color var(--duration-normal) var(--easing-default),
                     background-color var(--duration-normal) var(--easing-default)`,
      }}
    >
      {/* pill track */}
      <span style={{
        position: 'relative',
        display: 'inline-flex',
        width: 32,
        height: 18,
        borderRadius: 'var(--radius-full)',
        backgroundColor: isLight ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        flexShrink: 0,
        transition: `background-color var(--duration-normal) var(--easing-default)`,
      }}>
        {/* thumb */}
        <span style={{
          position: 'absolute',
          top: 1,
          left: isLight ? 'calc(100% - 16px - 1px)' : 1,
          width: 14,
          height: 14,
          borderRadius: 'var(--radius-full)',
          backgroundColor: isLight ? '#fff' : 'var(--color-text-tertiary)',
          transition: `left var(--duration-normal) var(--easing-default),
                       background-color var(--duration-normal) var(--easing-default)`,
        }} />
      </span>

      {/* icon */}
      <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
        {isLight ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  )
}
