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
        <ddMenu v-if="isSignedIn" 
          :title=" $inter.formatMessage({ path: 'app.profile' })" 
          :items="items"
        />
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
import ddMenu from './Dropdown-menu';

export default Vue.extend({
  components: {
    Logo,
    ddMenu
  },
      data: ()=> { 
        return {
            items: [
                {
                  text:'app.exportNotes',
                  callback:'exportNotes'
                },
                {
                  text:'app.signOut',
                  callback:'signOut'
                },
            ]
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

