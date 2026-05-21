export function formatExportDate(date) {
  return new Date(date).toISOString().replace(/[:.]/g, '-')
}

export function notesToMarkdown(notes) {
  return notes
    .map(note => {
      const title = note.title || 'Untitled'
      const createdAt = note.createdAt ? `Created: ${new Date(note.createdAt).toISOString()}` : null
      const updatedAt = note.updatedAt ? `Updated: ${new Date(note.updatedAt).toISOString()}` : null
      const metadata = [createdAt, updatedAt].filter(Boolean).join('\n')
      return `# ${title}\n\n${metadata ? `${metadata}\n\n` : ''}${note.content || ''}`
    })
    .join('\n\n---\n\n')
}

export function notesToJson(notes) {
  return JSON.stringify(notes, null, 2)
}
