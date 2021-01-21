<template>
    <div>
        
    </div>
</template>

<script>
export default {
    layout: 'blank',
    data() {
        return {

        }
    },
    mounted() {
        this.$store.commit('setSpotifyCallbackData', { 
            code: this.$router.currentRoute.query.code,
            state: this.$router.currentRoute.query.state
        })
        this.$store.dispatch('getNewSpotifyTokens')
    }
}
</script>

<style scoped>

</style>