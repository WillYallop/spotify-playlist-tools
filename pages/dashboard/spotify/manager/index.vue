<template>
    <div>
        <!-- Page Content -->
        <div class="playlistListCon">
            <PlaylistListHeader
            @refresh-playlists="refreshPlaylists"
            @toggle-playlist-preview="togglePlaylistPreview = !togglePlaylistPreview"/>
            <div class="playlistListWrapper appPageWrapper">

                <div class="playlistCon">
                    <SpotifyPlaylistRow :key="playlist.playlistId" v-for="playlist in playlists"
                    :playlist="playlist"
                    @preview-playlist="previewPlaylist"/>
                </div>
            
                <button class="loadMoreBtn" v-on:click="loadMorePlaylists" v-if="playlists.length >= this.skip">Load More</button>

            </div>

            <div v-if="playlistSelectLock" class="playlistsLockedCon">
                <Skeleton :theme="'light'"/>
            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon" :class="{ 'mobActive' : togglePlaylistPreview }">
            <div class="mobilePlaylistHeader">
                <button class="closePlaylistBtn" v-on:click="togglePlaylistPreview = !togglePlaylistPreview">close</button>
            </div>
            <div class="playlistPreviewWrapper">
                <SpotifyPlaylistPreview
                :playlist="selectedPlaylist"
                :tracks="tracks"
                @update-tracks="updateTracks"/>
            </div>
        </div>
        <div v-on:click="togglePlaylistPreview = !togglePlaylistPreview" class="playlistOverlayBg" :class="{ 'bgActive' : togglePlaylistPreview }"></div>
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
            togglePlaylistPreview: false,
            skip: 15,
            limit: 15

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
            this.togglePlaylistPreview = !this.togglePlaylistPreview
        },
        updateTracks(data) {
            this.$store.commit('setTracks', data.array)
        },
        // Refresh playlists
        refreshPlaylists() {
            this.$store.commit('toggleAccountLock', true)
            this.$store.commit('togglePlaylistSelectLock', true)
            this.$store.commit('resetPlaylists')
            this.$store.dispatch('updatePlaylists', {
                user: this.user,
                refresh: true
            })
        },
        // Load more playlists
        loadMorePlaylists() {
            this.$axios.get(process.env.API_URL + '/playlists/'+this.selectedAccount.accountType+'/'+this.selectedAccount.accountId+'/'+this.skip+'/'+this.limit)
            .then((response) => {
                if(!response.data.updatePlaylist) {
                    for(var i = 0; i < response.data.playlists.length; i++) {
                        this.$store.commit('pushToPlaylists', response.data.playlists[i])
                    }
                }
                this.skip = this.skip + this.limit
            })
            .catch((err) => {
                console.log(err)
            })
        },
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
    },
    destroyed() {
        this.$store.commit('resetSelectedPlaylist')
        this.$store.commit('resetTracks')
    }
}
</script>

<style scoped>
/* Page Content */
.playlistListCon {
    padding-right: 610px;
    position: relative;
    overflow: hidden;
}
.playlistListWrapper {
    margin-top: -40px;
    z-index: 10;
    position: relative;
}

/* Playlist */
.playlistCon {
    width: 100%;
}

/* Load more btn */
.loadMoreBtn {
    margin-top: 10px;
    padding: 10px 40px;
    background-color: var(--accent-2);
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
    cursor: pointer;
    transition: 0.2s;
}
.loadMoreBtn:hover {
    background-color: var(--accent-2-hover);
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
.playlistPreviewWrapper {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}

.mobilePlaylistHeader {
    width: 100%;
    display: none;
    height: 40px;
}
.closePlaylistBtn {
    background-color: none;
    margin: auto;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}
.playlistOverlayBg {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 90;
    pointer-events: none;
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

/* Media Queries */
@media only screen and (max-width: 1500px) {
    .playlistPreviewCon {right: 10px; left: 360px; width: auto; top: 100%; bottom: -100%; transition: 0.2s; background-color: #FFF; border-radius: 20px 20px 0 0; padding: 0 5px 5px;}
    .playlistPreviewCon.mobActive {bottom: 0; top: 140px;}
    .playlistPreviewWrapper { height: calc(100% - 40px); }
    .mobActive .mobilePlaylistHeader {display: flex;}
    .playlistListCon {padding-right: 0;}
    .playlistOverlayBg.bgActive {display: flex; pointer-events: all;}
}
@media only screen and (max-width: 1024px) {
    .playlistPreviewCon {left: 10px;}
}
</style>
