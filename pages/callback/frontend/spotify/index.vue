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
        this.$store.commit('fe_setSpotifyCallbackData', { 
            code: this.$router.currentRoute.query.code,
            state: this.$router.currentRoute.query.state
        })
        this.$store.dispatch('fe_getNewSpotifyTokens')
        this.$router.push(this.spotifyFrontendData.redirectUrl)
    }
}
</script>

<style scoped>

</style>