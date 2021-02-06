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
    computed: {
        spotifyFrontendData() {
            return this.$store.state.spotifyFrontend
        }
    },
    mounted() {
        this.$store.commit('setFrontendSpotifyCallbackData', { 
            code: this.$router.currentRoute.query.code,
            state: this.$router.currentRoute.query.state
        })
        this.$store.dispatch('getFrontendNewSpotifyTokens')
        this.$router.push(this.spotifyFrontendData.redirectUrl)
    }
}
</script>

<style scoped>

</style>