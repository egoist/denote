<template>
  <div class="wrap">
    <Header />
    <Dashboard v-if="isSignedIn" />
    <Landing v-else />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { userSession } from '../utils/userSession'
import Landing from '../components/Landing'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default Vue.extend({
  components: {
    Landing,
    Dashboard,
    Header,
    Footer
  },

  data() {
    return {
      isSignedIn: userSession.isUserSignedIn(),
      user: null,
      profile: null
    }
  },

  mounted() {
    if (userSession.isUserSignedIn()) {
      this.user = userSession.loadUserData()
      this.profile = this.user.profile
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.location = window.location.origin
      })
    }
  }
})
</script>