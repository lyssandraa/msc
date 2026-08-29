/** Shared long-form typography for memos and update notes. */
export function Section({ number, title, children }) {
  return (
    <section className="mt-12 border-t border-line pt-7">
      <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
        {number ? `${number} · ${title}` : title}
      </h2>
      <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.75] text-ink/90">
        {children}
      </div>
    </section>
  )
}

export function Callout({ label, children }) {
  return (
    <div className="mt-8 border-l-2 border-blue bg-paper px-5 py-4">
      {label && (
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
          {label}
        </p>
      )}
      <div className="mt-2 text-[0.98rem] leading-relaxed">{children}</div>
    </div>
  )
}

export function Banner({ children }) {
  return (
    <p className="border border-line bg-paper px-5 py-4 text-[0.85rem] leading-relaxed text-mute">
      {children}
    </p>
  )
}

export function Disclaimer({ children }) {
  return (
    <p className="mt-14 border-t border-line pt-6 text-[0.8rem] leading-relaxed text-mute">
      {children}
    </p>
  )
}
