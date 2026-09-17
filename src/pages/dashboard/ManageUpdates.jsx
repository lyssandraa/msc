import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import RecordsAdmin from '../../components/dashboard/RecordsAdmin.jsx'
import UpdateFieldsForm from '../../components/dashboard/UpdateFieldsForm.jsx'
import Tag from '../../components/Tag.jsx'
import { formatDate } from '../../lib/mappers.js'

const emptyForm = () => ({ status: 'draft', kind: 'Research' })

function buildPayload(form) {
  return {
    slug: form.slug,
    date: form.date,
    kind: form.kind,
    title: form.title,
    summary: form.summary,
    body: form.body,
    byline: form.byline || null,
    disclaimer: form.disclaimer || null,
    status: form.status,
  }
}

const columns = [
  { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
  { key: 'title', label: 'Title' },
  {
    key: 'status',
    label: 'Status',
    render: (r) => <Tag tone={r.status === 'published' ? 'accent' : 'neutral'}>{r.status}</Tag>,
  },
]

export default function ManageUpdates() {
  return (
    <>
      <PageHeader eyebrow="Updates" title="Manage updates." />
      <Container narrow className="py-12">
        <DashboardNav />
        <div className="mt-10">
          <RecordsAdmin
            table="updates"
            title="Posts"
            orderBy={{ column: 'date', ascending: false }}
            emptyForm={emptyForm}
            buildPayload={buildPayload}
            renderFields={UpdateFieldsForm}
            itemLabel="update"
            columns={columns}
          />
        </div>
      </Container>
    </>
  )
}
