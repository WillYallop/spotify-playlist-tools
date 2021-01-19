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
    data() {
        return {

        }
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
  background-color: var(--background-1)
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
  .appPageCon {padding-left: 0;}
}
</style>
