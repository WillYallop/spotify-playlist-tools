<template>
    <div>
        
    </div>
</template>

<script>
export default {
    layout: 'blank',
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
        this.$store.dispatch('getFrontendNewSpotifyTokens')
    }
}
</script>

<style scoped>

</style>