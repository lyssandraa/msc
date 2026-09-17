import { useState } from 'react'
import Container from '../../components/Container.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import DashboardNav from '../../components/dashboard/DashboardNav.jsx'
import RecordsAdmin from '../../components/dashboard/RecordsAdmin.jsx'
import ResearchFieldsForm from '../../components/dashboard/ResearchFieldsForm.jsx'
import { sanitizeFilename } from '../../lib/files.js'
import { supabase } from '../../lib/supabaseClient.js'
import { formatDate } from '../../lib/mappers.js'
import { publicUrl } from '../../lib/publicUrl.js'

const emptyForm = () => ({
  category: '',
  title: '',
  summary: '',
  published_at: new Date().toISOString().slice(0, 10),
})

const columns = [
  { key: 'published_at', label: 'Date', render: (r) => formatDate(r.published_at) },
  { key: 'category', label: 'Category' },
  { key: 'title', label: 'Title' },
]

export default function ManageResearch() {
  const [pdfFile, setPdfFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)

  async function buildPayload(form, { isNew }) {
    if (isNew && !pdfFile) {
      throw new Error('Please attach the PDF.')
    }

    // Neither upload depends on the other, so run them in parallel rather
    // than waiting for the PDF to finish before starting the cover image.
    const newPdfPath = pdfFile ? `pdfs/${crypto.randomUUID()}-${sanitizeFilename(pdfFile.name)}` : null
    const newCoverPath = coverFile ? `covers/${crypto.randomUUID()}-${sanitizeFilename(coverFile.name)}` : null

    const [pdfResult, coverResult] = await Promise.all([
      pdfFile ? supabase.storage.from('research').upload(newPdfPath, pdfFile) : Promise.resolve(null),
      coverFile ? supabase.storage.from('research').upload(newCoverPath, coverFile) : Promise.resolve(null),
    ])

    if (pdfResult?.error) throw new Error('Could not upload the PDF: ' + pdfResult.error.message)
    if (coverResult?.error) throw new Error('Could not upload the cover image: ' + coverResult.error.message)

    return {
      category: form.category,
      title: form.title,
      summary: form.summary || null,
      published_at: form.published_at,
      pdf_path: newPdfPath ?? form.pdf_path,
      cover_image_path: newCoverPath ?? form.cover_image_path ?? null,
    }
  }

  return (
    <>
      <PageHeader eyebrow="Research" title="Manage research reports." />
      <Container narrow className="py-12">
        <DashboardNav />
        <div className="mt-10">
          <RecordsAdmin
            table="research_reports"
            title="Reports"
            orderBy={{ column: 'published_at', ascending: false }}
            emptyForm={emptyForm}
            buildPayload={buildPayload}
            onReset={() => {
              setPdfFile(null)
              setCoverFile(null)
            }}
            renderFields={ResearchFieldsForm}
            renderFieldsProps={{ pdfFile, setPdfFile, coverFile, setCoverFile }}
            itemLabel="report"
            columns={columns}
            rowActions={(row) => (
              <a
                href={publicUrl('research', row.pdf_path)}
                target="_blank"
                rel="noreferrer"
                className="text-mute hover:text-ink"
              >
                View
              </a>
            )}
          />
        </div>
      </Container>
    </>
  )
}
