<template>
  <div class="pageCon">
    <div class="pageWrapper">
      
      <h1>Home</h1>
      <nuxt-link to="/dashboard">Dashboard</nuxt-link>

    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest-only',
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
