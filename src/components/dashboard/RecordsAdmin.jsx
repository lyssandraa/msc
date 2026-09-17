import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import DataTable from './DataTable.jsx'
import { inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from '../formStyles.js'

/**
 * Generic CRUD admin for a Postgres table: fetch, inline create/edit form,
 * delete, all with consistent loading/error handling. This is the one CRUD
 * engine behind every /dashboard/* content screen - simple text-only tables
 * (committee, sector teams, alumni) use the default `renderFields` (see
 * TextFieldsForm.jsx); tables that need file uploads or richer editing
 * (research reports, sponsors, updates) pass their own `renderFields`
 * component and a `buildPayload` that can upload files before saving.
 *
 * `renderFields` must be a stable component reference (imported at module
 * scope, not created inline during render) - React remounts a component on
 * every render if its type identity changes, which would reset any state
 * inside it (e.g. a markdown preview toggle) on every keystroke.
 */
export default function RecordsAdmin({
  table,
  title,
  orderBy,
  emptyForm,
  rowToForm = (row) => row,
  buildPayload,
  columns,
  rowActions,
  itemLabel = 'record',
  showSortOrder = false,
  renderFields: RenderFields,
  renderFieldsProps = {},
  onReset,
}) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [editingId, setEditingId] = useState(null) // null = closed, 'new' = creating, else row id
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy.column, { ascending: orderBy.ascending })
    // Surfaced separately from `loadError` so a failed fetch (e.g. RLS
    // denial, transient DB error) doesn't render as an indistinguishable
    // "no records yet" empty state.
    if (error) {
      setLoadError(error.message)
    } else {
      setLoadError(null)
      setRows(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  function startCreate() {
    setError(null)
    setEditingId('new')
    setForm(emptyForm(rows))
    onReset?.()
  }

  function startEdit(row) {
    setError(null)
    setEditingId(row.id)
    setForm(rowToForm(row))
    onReset?.()
  }

  function cancel() {
    setEditingId(null)
    setError(null)
    onReset?.()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    let payload
    try {
      payload = await buildPayload(form, { isNew: editingId === 'new' })
    } catch (err) {
      setSaving(false)
      setError(err.message)
      return
    }

    const { error } =
      editingId === 'new'
        ? await supabase.from(table).insert(payload)
        : await supabase.from(table).update(payload).eq('id', editingId)

    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setEditingId(null)
    onReset?.()
    load()
  }

  async function handleDelete(id) {
    if (!window.confirm(`Delete this ${itemLabel}? This cannot be undone.`)) return
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) {
      window.alert('Could not delete: ' + error.message)
      return
    }
    load()
  }

  const isNew = editingId === 'new'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">{title}</h2>
        {editingId === null && (
          <button type="button" onClick={startCreate} className={secondaryButtonClass}>
            Add
          </button>
        )}
      </div>

      {editingId !== null && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 border border-line bg-paper p-5">
          <RenderFields form={form} setForm={setForm} isNew={isNew} {...renderFieldsProps} />

          {showSortOrder && (
            <div>
              <label className={labelClass}>Order (lower shows first)</label>
              <input
                type="number"
                value={form.sort_order ?? '0'}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className={`mt-1.5 w-32 ${inputClass}`}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className={primaryButtonClass}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={cancel} className={secondaryButtonClass}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-mute">Loading…</p>
        ) : loadError ? (
          <p className="text-sm text-red-600">Could not load {title.toLowerCase()}: {loadError}</p>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            actions={(row) => (
              <>
                {rowActions?.(row)}
                <button
                  type="button"
                  onClick={() => startEdit(row)}
                  className={`text-blue hover:text-ink ${rowActions ? 'ml-4' : ''}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  className="ml-4 text-mute hover:text-ink"
                >
                  Delete
                </button>
              </>
            )}
          />
        )}
      </div>
    </div>
  )
}
