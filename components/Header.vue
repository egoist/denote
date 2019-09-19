<template>
  <header class="header">
      <style lang="stylus" scoped>
        .dd-class-bp__btn--active {
          background: #202124;
        }
        .dd-class-bp__body {
          background: #202124;
        }
      </style>
    <div class="container">
      <div class="header-left">
        <div class="logo">
          <Logo />
          <nuxt-link to="/">Denote</nuxt-link>
        </div>
      </div>
      <div class="header-right">
        <div  v-if="isSignedIn" class="dropdown">
          <dropdown :class-name="'dd-class'">
              <template slot="btn">{{ $inter.formatMessage({ path: 'app.profile' }) }}</template>
              <template slot="body">
                <ul style="list-style-type: none;">
                  <li @click="exportNotes">
                      {{ $inter.formatMessage({ path: 'app.exportNotes' }) }}
                  </li>
                  <li @click="signOut">
                      {{ $inter.formatMessage({ path: 'app.signOut' }) }}
                  </li>
                  
                </ul>
              </template>
          </dropdown>
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
import Logo from './Logo.vue'
import Dropdown from 'bp-vuejs-dropdown';

export default Vue.extend({
  components: {
    Logo,
    Dropdown
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

    exportNotes() {
      userSession.getFile(NOTES_FILE).then(file=>{
        this.returnDownload(NOTES_FILE,file);
      });
    },

    returnDownload(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
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
</style>

