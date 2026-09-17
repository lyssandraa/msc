import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Deliberately no rehype-raw plugin: any HTML/script tags typed into
// markdown are rendered as inert text, never executed. This is what makes
// it safe to let analysts (not just admins) submit rich content - see
// docs/ARCHITECTURE.md. Don't add rehype-raw without a sanitizer alongside it.
const components = {
  h1: ({ children }) => (
    <h2 className="mt-8 pt-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute first:mt-0 first:pt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 border-t border-line pt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-blue">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-medium">{children}</strong>,
  ul: ({ children }) => <ul className="mt-4 space-y-3 first:mt-0">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 space-y-3 first:mt-0">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-3">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <div className="mt-4 border-l-2 border-blue bg-paper px-5 py-4 text-[0.9rem] leading-relaxed text-mute first:mt-0">
      {children}
    </div>
  ),
  hr: () => <hr className="mt-8 border-line" />,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-b border-blue pb-0.5 text-blue transition-colors hover:border-ink hover:text-ink"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto first:mt-0">
      <table className="w-full border-collapse text-[0.92rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-line text-left">{children}</thead>,
  th: ({ children }) => (
    <th className="py-2.5 pr-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-mute">
      {children}
    </th>
  ),
  tr: ({ children }) => <tr className="border-b border-line">{children}</tr>,
  td: ({ children }) => <td className="py-2.5 pr-4 align-top">{children}</td>,
}

/** Renders markdown (memo full pages, update bodies) with the site's typography. */
export default function MarkdownContent({ children, className = '' }) {
  return (
    <div className={`text-[1.02rem] leading-[1.75] text-ink/90 ${className}`}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
