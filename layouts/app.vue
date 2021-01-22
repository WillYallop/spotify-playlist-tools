<template>
  <div>
    <AppHeader/>
    <SiteNavigation/>
    <Message/>
    <Nuxt/>
  </div>
</template>

<script>
// Componenets
import AppHeader from '@/components/global/app/AppHeader'
import SiteNavigation from '@/components/global/app/AppNavigation'
import Message from '@/components/global/app/Message'

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
    SiteNavigation,
    Message
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

.sectionCon {
  background-color: var(--background-2);
  border: 1px solid var(--border);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.sectionCon:last-child {
  margin-bottom: 0;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
  .appPageCon {padding-left: 0;}
}
</style>
