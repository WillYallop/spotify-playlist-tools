<template>
  <div>
    <Banner/>

    <div class="pageWrapper">
      
      <h1>Home</h1>
      <nuxt-link to="/dashboard">Dashboard</nuxt-link>

    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/index/Banner'

export default {
  middleware: 'guest-only',
  data() {
    return {

    }
  },
  components: {
    Banner
  }
}
</script>

<style scoped>

</style>
