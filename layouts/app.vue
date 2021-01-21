<template>
  <div>
    <AppHeader/>
    <SiteNavigation/>
    <Nuxt/>
  </div>
</template>

<script>
// Componenets
import AppHeader from '@/components/global/app/AppHeader'
import SiteNavigation from '@/components/global/app/AppNavigation'

export default {
  name: 'app',
  middleware: 'auth-only',
  data() {
    return {

    }
  },
  mounted() {
    this.$store.dispatch('getUserData') // Load user data
    this.$store.dispatch('getActions') // Get actions info
  },
  components: {
    AppHeader,
    SiteNavigation
  }
}
</script>

<style>

/* Page */
.appPageCon {
  padding-left: 350px;
  padding-top: 60px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--background-1)
}
.appPageWrapper {
  padding: 20px;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
  .appPageCon {padding-left: 0;}
}
</style>
