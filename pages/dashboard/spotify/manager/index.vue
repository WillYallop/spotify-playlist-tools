<template>
    <div>
        <!-- Page Content -->
        <div class="playlistListCon">
            <PlaylistListHeader/>
            <div class="playlistListWrapper appPageWrapper">
                
                <SpotifyPlaylistRow :key="playlist.playlistId" v-for="playlist in playlists"
                :playlist="playlist"
                @preview-playlist="previewPlaylist"/>

            </div>

            <div v-if="playlistSelectLock" class="playlistsLockedCon">
                <Skeleton :theme="'light'"/>
            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon">
            <SpotifyPlaylistPreview
            :playlist="selectedPlaylist"
            :tracks="tracks"
            @update-tracks="updateTracks"/>
        </div>
    </div>
</template>

<script>
// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import PlaylistListHeader from '@/components/app/spotify/manager/PlaylistListHeader'
import SpotifyPlaylistRow from '@/components/app/spotify/SpotifyPlaylistRow'
import Skeleton from '@/components/global/Skeleton'

export default {
    layout: 'app',  
    data() {
        return {

        }
    },
    mounted() {
        if(this.selectedAccount) {
            this.$store.dispatch('loadPlaylists', {  
                user: this.user
            })
        }
    },
    components: {
        SpotifyPlaylistPreview,
        PlaylistListHeader,
        SpotifyPlaylistRow,
        Skeleton
    },
    computed: {
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
        user() {
            return this.$store.state.user.user
        },
        playlists() {
            return this.$store.state.spotifyPlaylists.playlists
        },
        playlistSelectLock() {
            return this.$store.state.spotifyPlaylists.playlistSelectLock
        },
        selectedPlaylist() {
            return this.$store.state.spotifyPlaylists.selectedPlaylist
        },
        tracks() {
            return this.$store.state.spotifyTracks.tracks
        },
    },
    methods: {
        // Preview Playlist
        previewPlaylist(playlist) {
            this.$store.commit('selectPlaylist', playlist)
            this.$store.dispatch('downloadTracks', {
                playlist: playlist
            })
        },
        updateTracks(track) {
            this.$store.commit('setTracks', track)
        }

        
    },
    watch: {
        selectedAccount() {
            this.$store.commit('toggleAccountLock', true)
            this.$store.commit('togglePlaylistSelectLock', true)
            this.$store.commit('resetTracks')
            this.$store.commit('resetSelectedPlaylist')
            this.$store.dispatch('loadPlaylists', {
                user: this.user
            })
        }
    }
}
</script>

<style scoped>
/* Page Content */
.playlistListCon {
    padding-right: 610px;
    position: relative;
}
.playlistListWrapper {
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

/* Playlist select lock */
.playlistsLockedCon {
    position: fixed;
    top: 0;
    right:0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: 10px;
    opacity: 0.9;
    z-index: 50;
}
</style>
