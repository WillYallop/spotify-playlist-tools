<template>
    <div>
        <!-- Page Content -->
        <div class="managePlaylistCon">
            <ManagePlaylistHeader/>
            <div class="managePlaylistWrapper appPageWrapper">

                <!-- Remove Duplicates -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP"></p>
                            <p class="sectBodyP"></p>
                        </div>
                        <SwitchInput :boolean="removeDuplicates" @update-boolean="removeDuplicates = $event"/>
                    </div>
                </div>

                <!-- Remove Unplayable Tracks -->
                <div class="sectionCon">
                    
                </div>

                <!-- Re-Order Playlist -->
                <div class="sectionCon">
                    
                </div>

                <!-- Update Playlist -->
                <div class="sectionCon">
                    
                </div>

            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon">
            <SpotifyPlaylistPreview
            :playlist="playlist"
            :tracks="tracks"
            @update-tracks="updateTracks"/>
        </div>
    </div>
</template>

<script>
// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import ManagePlaylistHeader from '@/components/app/spotify/manager/ManagePlaylistHeader'
import SwitchInput from '@/components/global/SwitchInput'

export default {
    layout: 'app',
    data() {
        return {
            // Remove duplicates
            removeDuplicates: false
        }
    },
    mounted() {
        if(this.selectedAccount) {
            this.$store.dispatch('loadSinglePlaylist', {  
                user: this.user,
                playlistId: this.$router.currentRoute.params.id
            })
        }
    },
    components: {
        SpotifyPlaylistPreview,
        ManagePlaylistHeader,
        SwitchInput
    },
    computed: {
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
        user() {
            return this.$store.state.user.user
        },
        playlist() {
            return this.$store.state.spotifyPlaylists.playlist
        },
        tracks() {
            return this.$store.state.spotifyTracks.tracks
        },
    },
    methods: {
        updateTracks(track) {
            this.$store.commit('setTracks', track)
        }
    },
    watch: {
        selectedAccount(val, oldVal) {
            if(val != oldVal) {
                this.$router.push('/dashboard/spotify/manager')
            } else {
                this.$store.commit('toggleAccountLock', true)
                this.$store.dispatch('loadSinglePlaylist', {  
                    user: this.user,
                    playlistId: this.$router.currentRoute.params.id
                })
            }
        }
    },
    destroyed() {
        this.$store.commit('resetSelectedPlaylist')
        this.$store.commit('resetTracks')
        this.$store.commit('resetSinglePlaylist')
        this.$store.commit('resetPlaylists')
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