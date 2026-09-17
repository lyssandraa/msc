import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import RecordsAdmin from '../../components/dashboard/RecordsAdmin.jsx'
import TextFieldsForm from '../../components/dashboard/TextFieldsForm.jsx'

const committeeFields = [
  { key: 'name', label: 'Name', required: true },
  { key: 'role', label: 'Role', required: true },
  { key: 'remit', label: 'Remit', type: 'textarea', required: true },
]

const sectorTeamFields = [
  { key: 'sector', label: 'Sector', required: true },
  { key: 'lead', label: 'Head Analyst', required: true },
]

function rowToForm(row) {
  return { ...row, sort_order: String(row.sort_order) }
}

function buildPayload(fields) {
  return (form) => {
    const payload = Object.fromEntries(fields.map((f) => [f.key, form[f.key] ?? '']))
    payload.sort_order = Number(form.sort_order) || 0
    return payload
  }
}

export default function ManageCommittee() {
  return (
    <>
      <PageHeader eyebrow="Committee" title="Manage committee." />
      <Container narrow className="py-12">
        <DashboardNav />
        <div className="mt-10 space-y-16">
          <RecordsAdmin
            table="committee_members"
            title="Executive committee"
            orderBy={{ column: 'sort_order', ascending: true }}
            emptyForm={(rows) => ({ sort_order: String(rows.length) })}
            rowToForm={rowToForm}
            buildPayload={buildPayload(committeeFields)}
            showSortOrder
            renderFields={TextFieldsForm}
            renderFieldsProps={{ fields: committeeFields }}
            itemLabel="committee member"
            columns={committeeFields.map((f) => ({ key: f.key, label: f.label }))}
          />
          <RecordsAdmin
            table="sector_teams"
            title="Sector teams"
            orderBy={{ column: 'sort_order', ascending: true }}
            emptyForm={(rows) => ({ sort_order: String(rows.length) })}
            rowToForm={rowToForm}
            buildPayload={buildPayload(sectorTeamFields)}
            showSortOrder
            renderFields={TextFieldsForm}
            renderFieldsProps={{ fields: sectorTeamFields }}
            itemLabel="sector team"
            columns={sectorTeamFields.map((f) => ({ key: f.key, label: f.label }))}
          />
        </div>
      </Container>
    </>
  )
}
