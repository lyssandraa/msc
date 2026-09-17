import { useParams } from 'react-router-dom'
import MarkdownContent from '../../components/MarkdownContent.jsx'
import { useUpdateBySlug } from '../../hooks/useUpdateBySlug.js'
import { formatDate } from '../../lib/mappers.js'
import NotFound from '../NotFound.jsx'
import NoteLayout from './NoteLayout.jsx'

export default function UpdateDetail() {
  const { slug } = useParams()
  const { update, loading } = useUpdateBySlug(slug)

  if (loading) {
    return <p className="p-16 text-center text-sm text-mute">Loading…</p>
  }
  if (!update) {
    return <NotFound />
  }

  return (
    <NoteLayout
      kind={update.kind}
      date={formatDate(update.date)}
      title={update.title}
      byline={update.byline}
      disclaimer={update.disclaimer}
    >
      <MarkdownContent>{update.body}</MarkdownContent>
    </NoteLayout>
  )
}
