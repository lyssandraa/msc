import { useState } from 'react'
import MarkdownContent from '../MarkdownContent.jsx'
import { inputClass, labelClass, slugify } from '../formStyles.js'

const kinds = ['Research', 'Market note', 'Fund update']

export default function UpdateFieldsForm({ form, setForm }) {
  const [preview, setPreview] = useState(false)

  function field(key, value) {
    setForm({ ...form, [key]: value })
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            required
            value={form.title ?? ''}
            onChange={(e) => field('title', e.target.value)}
            onBlur={() => {
              if (!form.slug) field('slug', slugify(form.title ?? ''))
            }}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            required
            value={form.slug ?? ''}
            onChange={(e) => field('slug', slugify(e.target.value))}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Kind</label>
          <select
            value={form.kind ?? kinds[0]}
            onChange={(e) => field('kind', e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            required
            value={form.date ?? ''}
            onChange={(e) => field('date', e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={form.status ?? 'draft'}
            onChange={(e) => field('status', e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Summary (shown on the Updates list)</label>
        <textarea
          required
          rows={2}
          value={form.summary ?? ''}
          onChange={(e) => field('summary', e.target.value)}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div>
        <label className={labelClass}>Byline</label>
        <input
          type="text"
          value={form.byline ?? ''}
          onChange={(e) => field('byline', e.target.value)}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className={labelClass}>Body (markdown - blank line = new paragraph, ## for a heading)</label>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="text-sm text-blue hover:text-ink"
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {preview ? (
          <div className="mt-1.5 border border-line bg-white px-3.5 py-3">
            <MarkdownContent>{form.body || '*Nothing to preview yet.*'}</MarkdownContent>
          </div>
        ) : (
          <textarea
            required
            rows={14}
            value={form.body ?? ''}
            onChange={(e) => field('body', e.target.value)}
            className={`mt-1.5 font-mono text-[0.85rem] ${inputClass}`}
          />
        )}
      </div>

      <div>
        <label className={labelClass}>Disclaimer (optional)</label>
        <textarea
          rows={2}
          value={form.disclaimer ?? ''}
          onChange={(e) => field('disclaimer', e.target.value)}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
    </>
  )
}
