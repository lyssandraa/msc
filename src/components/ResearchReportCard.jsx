import Reveal from './Reveal.jsx'
import Tag from './Tag.jsx'
import { formatDate } from '../lib/mappers.js'
import { publicUrl } from '../lib/publicUrl.js'

export default function ResearchReportCard({ report, delay = 0 }) {
  const cover = publicUrl('research', report.cover_image_path)
  const pdfHref = publicUrl('research', report.pdf_path)

  return (
    <Reveal delay={delay} as="article" className="border border-line">
      <a href={pdfHref} target="_blank" rel="noreferrer" className="block">
        <div className="aspect-[4/5] w-full bg-slate">
          {cover ? (
            <img src={cover} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute-dark">PDF</span>
            </div>
          )}
        </div>
      </a>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Tag tone="accent">{report.category}</Tag>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-mute">
            {formatDate(report.published_at)}
          </span>
        </div>
        <p className="mt-3 font-display text-lg leading-snug">{report.title}</p>
        {report.summary && <p className="mt-2 text-[0.88rem] leading-relaxed text-mute">{report.summary}</p>}
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block border-b border-blue pb-0.5 text-sm text-blue transition-colors hover:border-ink hover:text-ink"
        >
          Download PDF
        </a>
      </div>
    </Reveal>
  )
}
