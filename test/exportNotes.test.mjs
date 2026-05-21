import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const source = readFileSync(join(__dirname, '../utils/exportNotes.js'), 'utf8')
const loadExports = new Function(
  `${source.replace(/export function /g, 'function ')}
return { formatExportDate, notesToJson, notesToMarkdown }`
)
const { formatExportDate, notesToJson, notesToMarkdown } = loadExports()

const notes = [
  {
    title: 'First note',
    content: 'Hello **world**',
    createdAt: '2019-09-19T01:43:45.000Z',
    updatedAt: '2019-09-20T01:43:45.000Z'
  },
  {
    title: '',
    content: 'Untitled content'
  }
]

assert.equal(formatExportDate('2019-09-19T01:43:45.000Z'), '2019-09-19T01-43-45-000Z')

assert.deepEqual(JSON.parse(notesToJson(notes)), notes)

assert.equal(
  notesToMarkdown(notes),
  [
    '# First note',
    '',
    'Created: 2019-09-19T01:43:45.000Z',
    'Updated: 2019-09-20T01:43:45.000Z',
    '',
    'Hello **world**',
    '',
    '---',
    '',
    '# Untitled',
    '',
    'Untitled content'
  ].join('\n')
)
