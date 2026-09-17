/**
 * Minimal generic table for the dashboard. `columns` is [{ key, label, render? }],
 * `actions` (optional) renders trailing buttons for a row.
 */
export default function DataTable({ columns, rows, rowKey = 'id', actions, emptyMessage = 'No records yet.' }) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full border-collapse text-[0.88rem]">
        <thead>
          <tr className="border-b border-line bg-paper text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-mute"
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-mute">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-line last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-top">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {actions && <td className="px-4 py-3 text-right whitespace-nowrap">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
