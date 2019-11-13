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
        <div v-if="isSignedIn" class="dropdown">
          <button class="dropbtn"> 
            &#9660;
          </button>
          <div class="dropdown-content">
            <span @click="signOut" class="nav-item">  {{ $inter.formatMessage({ path: 'app.signOut' }) }}</span>
            <span @click="downloadNotes" class="nav-item">  {{ $inter.formatMessage({ path: 'app.downloadNotes' }) }}</span>
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
import Logo from './Logo.vue'
import { NOTES_FILE } from '../utils/constants'

async function fetchNotes() {
  const file = await userSession.getFile(NOTES_FILE)
    const { notes } = file ? JSON.parse(file) : { notes: [] }
    return notes
}

function saveFile(data) {
    console.log("data", data)
    const blob = new Blob([data], {type: 'text/plain'})
    const e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
    a.download = "notes.json";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}

export default Vue.extend({
  components: {
    Logo
  },
  data(){
    return{
      notes: null,
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
    signOut() {
      userSession.signUserOut('/')
    },
    downloadNotes(){
      const notes = fetchNotes().then(notes => {
      const data = JSON.stringify(notes)
      saveFile(data)
      })

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

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover, .dropdown:hover .dropbtn {
  background-color: rgb(244,182,4);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content span {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content span:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>