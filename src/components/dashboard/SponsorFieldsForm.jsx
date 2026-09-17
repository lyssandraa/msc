import { inputClass, labelClass } from '../formStyles.js'

export default function SponsorFieldsForm({ form, setForm, isNew, logoFile, setLogoFile }) {
  return (
    <>
      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          required
          value={form.name ?? ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div>
        <label className={labelClass}>Website (optional)</label>
        <input
          type="url"
          placeholder="https://…"
          value={form.website_url ?? ''}
          onChange={(e) => setForm({ ...form, website_url: e.target.value })}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <div>
        <label className={labelClass}>Logo {!isNew && '(leave blank to keep the current logo)'}</label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
          className="mt-1.5 block w-full text-sm text-mute file:mr-4 file:border file:border-line file:bg-white file:px-4 file:py-2 file:text-sm file:text-ink"
        />
      </div>
    </>
  )
}
