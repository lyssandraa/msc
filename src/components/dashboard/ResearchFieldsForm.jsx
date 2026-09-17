import { inputClass, labelClass } from '../formStyles.js'

export default function ResearchFieldsForm({ form, setForm, isNew, pdfFile, setPdfFile, coverFile, setCoverFile }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Category</label>
          <input
            type="text"
            required
            placeholder="e.g. Fixed Income"
            value={form.category ?? ''}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass}>Published date</label>
          <input
            type="date"
            required
            value={form.published_at ?? ''}
            onChange={(e) => setForm({ ...form, published_at: e.target.value })}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          required
          value={form.title ?? ''}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div>
        <label className={labelClass}>Summary (optional)</label>
        <textarea
          rows={2}
          value={form.summary ?? ''}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>PDF {!isNew && '(leave blank to keep the current file)'}</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full text-sm text-mute file:mr-4 file:border file:border-line file:bg-white file:px-4 file:py-2 file:text-sm file:text-ink"
          />
        </div>
        <div>
          <label className={labelClass}>Cover image (optional)</label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full text-sm text-mute file:mr-4 file:border file:border-line file:bg-white file:px-4 file:py-2 file:text-sm file:text-ink"
          />
        </div>
      </div>
    </>
  )
}
