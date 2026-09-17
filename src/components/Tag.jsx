const toneStyles = {
  accent: 'border-blue text-blue',
  neutral: 'border-line text-mute',
}

/** Small pill, e.g. a research category label. */
export default function Tag({ tone = 'neutral', children }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] ${toneStyles[tone]}`}
    >
      {children}
    </span>
  )
}
