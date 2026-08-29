/** `tone="light"` is for use on the dark navy backgrounds. */
export default function Eyebrow({ tone = 'dark', className = '', children }) {
  const color = tone === 'light' ? 'text-blue-lift' : 'text-mute'

  return (
    <p
      className={`font-mono text-[0.67rem] uppercase tracking-[0.2em] ${color} ${className}`}
    >
      {children}
    </p>
  )
}
