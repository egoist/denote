import { userSession } from './userSession'
import { NOTES_FILE } from './constants'

function download(filename, content, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

async function fetchNotes() {
  const file = await userSession.getFile(NOTES_FILE)
  const { notes } = file ? JSON.parse(file) : { notes: [] }
  return notes || []
}

function formatDate(timestamp) {
  return new Date(timestamp).toISOString()
}

export async function exportNotesAsJSON() {
  const notes = await fetchNotes()
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      notes
    },
    null,
    2
  )
  download('denote-notes.json', payload, 'application/json')
}

export async function exportNotesAsMarkdown() {
  const notes = await fetchNotes()
  const sorted = notes.slice().sort((a, b) => b.createdAt - a.createdAt)
  const sections = sorted.map(note => {
    const lines = []
    lines.push(note.title ? `## ${note.title}` : '## Untitled note')
    lines.push('')
    lines.push(`_${formatDate(note.createdAt)}_`)
    lines.push('')
    lines.push(note.content || '')
    return lines.join('\n')
  })
  download('denote-notes.md', sections.join('\n\n---\n\n'), 'text/markdown')
}
