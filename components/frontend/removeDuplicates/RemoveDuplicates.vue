<template>
    <div class="removeDuplicatesCon">
        {{playlists}}
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        playlists: Array
    },
    computed: {
        spotifyFrontendData() {
            return this.$store.state.spotifyFrontend
        },
    },
}
</script>

<style scoped>
.removeDuplicatesCon {
    padding: 10px;
}
</style>