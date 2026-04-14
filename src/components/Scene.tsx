/**
 * Scene — dark background with a trace of warm amber.
 * Philosophy: Dieter Rams / Editorial — "color is information, not decoration."
 * The amber glow is barely perceptible (3–4% opacity) — it echoes the accent
 * system without competing with content. Depth comes from luminance; warmth
 * comes from the accent hue at the edges of perception.
 */
export function Scene({ activeTab: _activeTab = 'Home' }: { activeTab?: string }) {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-hidden="true"
    >
      {/* Central amber glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 60% at 50% 35%, var(--scene-glow-outer) 0%, transparent 70%)',
        }}
      />

      {/* Inner brighter core */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 45% 35% at 50% 28%, var(--scene-glow-inner) 0%, transparent 60%)',
        }}
      />

      {/* Bottom vignette — depth in dark mode, transparent in light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 110% 55% at 50% 105%, var(--scene-vignette) 0%, transparent 65%)',
        }}
      />
    </div>
  )
}
