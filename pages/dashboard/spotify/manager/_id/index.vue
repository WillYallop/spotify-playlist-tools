<template>
    <div>
        <!-- Page Content -->
        <div class="managePlaylistCon">
            <ManagePlaylistHeader/>
            <div class="managePlaylistWrapper appPageWrapper">
                
                

            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon">
            <SpotifyPlaylistPreview/>
        </div>
    </div>
</template>

<script>
// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import ManagePlaylistHeader from '@/components/app/spotify/manager/ManagePlaylistHeader'

export default {
    layout: 'app',
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.$router.currentRoute.params.id)
    },
    components: {
        SpotifyPlaylistPreview,
        ManagePlaylistHeader
    },
    methods: {

    }
}
</script>

<style scoped>
/* Page Content */
.managePlaylistCon {
    padding-right: 610px;
    position: relative;
}
.managePlaylistWrapper {
    margin-top: -40px;
    z-index: 10;
    position: relative;
}

/* Playlist Preview */
.playlistPreviewCon {
    position: fixed;
    top: 70px;
    right: 10px;
    bottom: 10px;
    width: 600px;
    border-radius: 10px;
    overflow: hidden;
    z-index: 100;
}
</style>