<template>
  <div class="container">
    <div class="main" v-if="sortedNotes">
      <div class="columns">
        <div class="column is-4">
          <div class="add-note" v-if="addNote">
            <div class="form-group">
              <input type="text" placeholder="Title" v-model="title" />
            </div>
            <div class="form-group">
              <textarea v-model="content" rows="10" autofocus placeholder="Type something.."></textarea>
            </div>
            <button
              type="button"
              :disabled="saving"
              @click="handleSaveNote"
            >{{ saving ? 'Saving' : 'Save' }}</button>
            <button type="button" @click="addNote = false">Cancel</button>
          </div>
          <div class="add-note-trigger" v-else @click="addNote = true">
            <Edit3Icon />Add note..
          </div>
        </div>
        <div class="column is-8">
          <div class="notes">
            <div class="note" v-for="note in sortedNotes" :key="note.id">
              <div class="note-title" v-if="note.title">{{ note.title }}</div>
              <div class="note-content">{{ note.content }}</div>
              <div class="note-meta">
                <span class="note-date">{{ formatDate(new Date(note.createdAt)) }}</span>
                <span class="note-action" @click="deleteNote(note.id)">
                  {{ deletingId === note.id ? 'Deleting' : 'Delete' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-else>Loading...</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { userSession } from '../utils/userSession'
import { uid } from '../utils/uid'
import tinydate from 'tinydate'
import { Edit3Icon } from 'vue-feather-icons'

const formatDate = tinydate('{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}')

export default Vue.extend({
  components: {
    Edit3Icon
  },

  data() {
    return {
      addNote: false,
      notes: null,
      fetchedNotes: null,
      title: '',
      content: '',
      saving: false,
      deletingId: null
    }
  },

  async mounted() {
    const file = await userSession.getFile('notes.json')
    this.notes = JSON.parse(file || '[]')
    this.fetchedNotes = await this.fetchNotes(this.notes)
  },

  methods: {
    formatDate,

    signout() {
      userSession.signUserOut('/')
    },

    async handleSaveNote() {
      this.saving = true

      const meta = {
        id: uid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: []
      }
      const note = {
        ...meta,
        title: this.title,
        content: this.content
      }

      // Create the node
      await userSession.putFile(`notes/${meta.id}.json`, JSON.stringify(note))

      // Update notes list
      this.notes.push(meta)
      this.fetchedNotes.push(note)
      await userSession.putFile('notes.json', JSON.stringify(this.notes))

      this.saving = false
      this.title = ''
      this.content = ''
    },

    async fetchNotes(notes) {
      return Promise.all(
        notes.map(async note => {
          const file = await userSession.getFile(`notes/${note.id}.json`)
          return JSON.parse(file)
        })
      )
    },

    async deleteNote(id) {
      this.deletingId = id
      await userSession.deleteFile(`notes/${id}.json`)
      const newNotes = this.notes.filter(note => note.id !== id)
      await userSession.putFile('notes.json', JSON.stringify(newNotes))
      this.notes = newNotes
      this.fetchedNotes = this.fetchedNotes.filter(note => note.id !== id)
      this.deletingId = null
    }
  },

  computed: {
    sortedNotes() {
      return (
        this.fetchedNotes &&
        this.fetchedNotes.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate - aDate
        })
      )
    }
  }
})
</script>

<style scoped>
.add-note-trigger {
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: var(--card-border-radius);
  cursor: text;
  background: var(--card-bg);
  display: flex;
  align-items: center;

  & svg {
    margin-right: 10px;
  }
}

.add-note {
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: var(--card-border-radius);
  width: 100%;
  font-size: 1rem;
  background: var(--card-bg);
}

.notes {
}

.note {
  border: 1px solid var(--border-color);
  border-radius: var(--card-border-radius);
  padding: 15px 20px;
  background: var(--card-bg);
  margin-bottom: 20px;
}

.note-title {
  margin-bottom: 10px;
}

.note-meta {
  font-size: 0.875rem;
  margin-top: 10px;
  color: var(--fade-text-color);
}

.note-meta {
  & span {
    margin-right: 20px;
  }

  & .note-action:hover {
    cursor: pointer;
    color: var(--active-text-color);
  }
}
</style>