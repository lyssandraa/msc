import { useState } from 'react'
import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import RecordsAdmin from '../../components/dashboard/RecordsAdmin.jsx'
import SponsorFieldsForm from '../../components/dashboard/SponsorFieldsForm.jsx'
import { sanitizeFilename } from '../../lib/files.js'
import { supabase } from '../../lib/supabaseClient.js'
import { publicUrl } from '../../lib/publicUrl.js'

const columns = [
  {
    key: 'logo_path',
    label: 'Logo',
    render: (r) => <img src={publicUrl('sponsors', r.logo_path)} alt={r.name} className="h-8 w-auto object-contain" />,
  },
  { key: 'name', label: 'Name' },
]

export default function ManageSponsors() {
  const [logoFile, setLogoFile] = useState(null)

  async function buildPayload(form, { isNew }) {
    if (isNew && !logoFile) {
      throw new Error('Please attach a logo.')
    }

    let logoPath = form.logo_path
    if (logoFile) {
      const path = `${crypto.randomUUID()}-${sanitizeFilename(logoFile.name)}`
      const { error } = await supabase.storage.from('sponsors').upload(path, logoFile)
      if (error) throw new Error('Could not upload the logo: ' + error.message)
      logoPath = path
    }

    return {
      name: form.name,
      website_url: form.website_url || null,
      sort_order: Number(form.sort_order) || 0,
      logo_path: logoPath,
    }
  }

  return (
    <>
      <PageHeader eyebrow="Sponsors" title="Manage sponsors." />
      <Container narrow className="py-12">
        <DashboardNav />
        <div className="mt-10">
          <RecordsAdmin
            table="sponsors"
            title="Sponsors"
            orderBy={{ column: 'sort_order', ascending: true }}
            emptyForm={(rows) => ({ sort_order: String(rows.length) })}
            rowToForm={(row) => ({ ...row, sort_order: String(row.sort_order) })}
            buildPayload={buildPayload}
            showSortOrder
            onReset={() => setLogoFile(null)}
            renderFields={SponsorFieldsForm}
            renderFieldsProps={{ logoFile, setLogoFile }}
            itemLabel="sponsor"
            columns={columns}
          />
        </div>
      </Container>
    </>
  )
}
