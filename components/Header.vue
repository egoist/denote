<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <div class="logo">
          <Logo />
          <nuxt-link to="/">Denote</nuxt-link>
        </div>
      </div>
      <div class="header-right">
        <div v-if="isSignedIn" class="nav-menu">
          <button type="button" class="nav-item nav-menu-trigger" @click="toggleMenu">
            {{ $inter.formatMessage({ path: 'app.menu' }) }}
          </button>
          <div v-if="menuOpen" class="nav-menu-list">
            <button type="button" class="nav-menu-item" @click="exportNotes('json')">
              {{ $inter.formatMessage({ path: 'app.exportJson' }) }}
            </button>
            <button type="button" class="nav-menu-item" @click="exportNotes('markdown')">
              {{ $inter.formatMessage({ path: 'app.exportMarkdown' }) }}
            </button>
            <button type="button" class="nav-menu-item" @click="signOut">
              {{ $inter.formatMessage({ path: 'app.signOut' }) }}
            </button>
          </div>
        </div>
        <span v-else class="nav-item" @click="signIn">
          {{ $inter.formatMessage({ path: 'app.signIn' }) }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { userSession } from '../utils/userSession'
import { NOTES_FILE } from '../utils/constants'
import { formatExportDate, notesToJson, notesToMarkdown } from '../utils/exportNotes'
import Logo from './Logo.vue'

function downloadFile(filename, content, type) {
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

export default Vue.extend({
  components: {
    Logo
  },

  data() {
    return {
      menuOpen: false
    }
  },

  computed: {
    isSignedIn() {
      return userSession.isUserSignedIn()
    }
  },

  methods: {
    signIn() {
      userSession.redirectToSignIn()
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },

    async exportNotes(format) {
      const file = await userSession.getFile(NOTES_FILE)
      const data = file ? JSON.parse(file) : { notes: [] }
      const notes = data.notes || []
      const timestamp = formatExportDate(new Date())

      if (format === 'markdown') {
        downloadFile(`denote-notes-${timestamp}.md`, notesToMarkdown(notes), 'text/markdown')
      } else {
        downloadFile(
          `denote-notes-${timestamp}.json`,
          notesToJson(notes),
          'application/json'
        )
      }

      this.menuOpen = false
    },

    signOut() {
      userSession.signUserOut('/')
    }
  }
})
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
}

.header > .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.3rem;

  & svg {
    margin-right: 10px;
  }

  & a {
    text-decoration: none;
  }
}

.nav-item {
  cursor: pointer;
}

.nav-menu {
  position: relative;
}

.nav-menu-trigger {
  background: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  padding: 0;
}

.nav-menu-list {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 3px;
  min-width: 170px;
  padding: 6px 0;
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  z-index: 10;
}

.nav-menu-item {
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: block;
  font: inherit;
  padding: 8px 12px;
  text-align: left;
  width: 100%;

  &:hover {
    background: #000;
  }
}
</style>
