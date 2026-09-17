import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import RecordsAdmin from '../../components/dashboard/RecordsAdmin.jsx'
import TextFieldsForm from '../../components/dashboard/TextFieldsForm.jsx'
import { categories } from '../../data/alumni.js'

const alumniFields = [
  { key: 'firm', label: 'Firm', required: true },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    options: categories.filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label })),
  },
  { key: 'detail', label: 'Detail', required: true },
]

function buildPayload(form) {
  const payload = Object.fromEntries(alumniFields.map((f) => [f.key, form[f.key] ?? '']))
  payload.sort_order = Number(form.sort_order) || 0
  return payload
}

export default function ManageAlumni() {
  return (
    <>
      <PageHeader eyebrow="Alumni" title="Manage alumni destinations." />
      <Container narrow className="py-12">
        <DashboardNav />
        <div className="mt-10">
          <RecordsAdmin
            table="alumni_destinations"
            title="Destinations"
            orderBy={{ column: 'sort_order', ascending: true }}
            emptyForm={(rows) => ({ sort_order: String(rows.length) })}
            rowToForm={(row) => ({ ...row, sort_order: String(row.sort_order) })}
            buildPayload={buildPayload}
            showSortOrder
            renderFields={TextFieldsForm}
            renderFieldsProps={{ fields: alumniFields }}
            itemLabel="destination"
            columns={alumniFields.map((f) => ({ key: f.key, label: f.label }))}
          />
        </div>
      </Container>
    </>
  )
}
