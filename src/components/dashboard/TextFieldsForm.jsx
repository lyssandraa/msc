import { inputClass, labelClass } from '../formStyles.js'

/**
 * Renders a flat list of text/textarea/select inputs from a field config.
 * The default `renderFields` for RecordsAdmin's simple tables (committee,
 * sector teams, alumni) - pass `fields` via `renderFieldsProps`.
 */
export default function TextFieldsForm({ fields, form, setForm }) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.key}>
          <label className={labelClass}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              required={field.required}
              rows={3}
              value={form[field.key] ?? ''}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className={`mt-1.5 ${inputClass}`}
            />
          ) : field.type === 'select' ? (
            <select
              required={field.required}
              value={form[field.key] ?? ''}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className={`mt-1.5 ${inputClass}`}
            >
              <option value="" disabled>
                Select…
              </option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              required={field.required}
              value={form[field.key] ?? ''}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className={`mt-1.5 ${inputClass}`}
            />
          )}
        </div>
      ))}
    </>
  )
}
