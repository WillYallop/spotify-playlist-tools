<template>
    <div>
        
    </div>
</template>

<script>
export default {
    layout: 'blank',
    colorMode: 'light',
    middleware: 'guest-only',
    data() {
        return {

        }
    },
    mounted() {
        this.$store.commit('setFrontendSpotifyCallbackData', { 
            code: this.$router.currentRoute.query.code,
            state: this.$router.currentRoute.query.state
        })
        this.$store.dispatch('getFrontendNewSpotifyTokens', this.$router.currentRoute.query.redirect)
        this.$router.push('/spotify/'+this.$router.currentRoute.query.redirect)
    }
}
</script>

<style scoped>

</style>