<template>
  <div class="main">
    <div class="container">
      <div class="hero">
        <Logo size="4em" />
        <h2>
          {{ $inter.formatMessage({ path: 'app.slogan' }) }}
        </h2>
        <div class="actions">
          <button class="button" @click="signIn">
            {{ $inter.formatMessage({ path: 'app.signIn' }) }}
          </button>
        </div>
      </div>
      <div class="features">
        <div class="feature" v-for="feature in features" :key="feature.title">
          <div class="feature-title" v-html="feature.title"></div>
          <div class="feature-content" v-html="feature.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from './Logo.vue'
import { userSession } from '../utils/userSession'

export default Vue.extend({
  components: {
    Logo
  },

  computed: {
    features() {
      return this.$inter.formatMessage({ path: 'app.features' })
    }
  },

  methods: {
    signIn() {
      userSession.redirectToSignIn()
    }
  }
})
</script>

<style scoped>
.hero {
  text-align: center;
  color: var(--active-text-color);
  margin: 100px 0;
  & h2 {
    font-weight: 400;
    font-size: 3rem;
    margin: 20px 0;
  }
}

.actions {
  margin-top: 50px;
}

.features {
  display: flex;
  text-align: center;

  @media (max-width: 992px) {
    flex-direction: column;

    & .feature {
      padding: 0;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}

.feature {
  padding: 0 15px;
}

.feature-title {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--active-text-color);
}
</style>