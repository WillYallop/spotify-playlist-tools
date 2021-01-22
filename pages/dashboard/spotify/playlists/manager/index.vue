<template>
    <div class="appPageCon">
        <!-- Page Content -->
        <div class="playlistListCon">
            <PlaylistListHeader/>
            <div class="playlistListWrapper appPageWrapper">
                
                <div class="sectionCon" :key="playlist.playlistId" v-for="playlist in playlists">
                    {{playlist.name}}
                    <p>hello</p>
                </div>
                
            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon">
            <SpotifyPlaylistPreview/>
        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'

// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import PlaylistListHeader from '@/components/app/spotify/manager/PlaylistListHeader'

export default {
    layout: 'app',  
    data() {
        return {
            playlists: [],
            retryDownloadPlaylists: 0
        }
    },
    mounted() {
        if(this.selectedAccount) {
            this.loadPlaylists() 
        }
    },
    components: {
        SpotifyPlaylistPreview,
        PlaylistListHeader
    },
    computed: {
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
        user() {
            return this.$store.state.user.user
        },
    },
    methods: {
        loadPlaylists() {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.get(process.env.API_URL + '/playlists/'+this.selectedAccount.accountType+'/'+this.selectedAccount.accountId, config)
            .then((response) => {
                // Download new playlist data from Spotify API
                // Else - set saved data
                if(response.data.updatePlaylist) {
                    this.updatePlaylists()
                } else {
                    this.playlists = response.data.playlists
                }
            })
            .catch((err) => {
                if(err.response.status === 404) {
                    this.updatePlaylists()
                }
            })
        },
        updatePlaylists() {
            // Header
            let config = {
                headers: {
                    Authorization: 'Bearer ' + this.selectedAccount.accessToken
                }
            }
            axios.get('https://api.spotify.com/v1/me/playlists', config)
            .then((response) => {

                // Loop over response playlists 
                for(var i = 0; i < response.data.items.length; i++) {
                    var playlistObject = {
                        userId: this.user._id,
                        accountId: this.selectedAccount.accountId,
                        playlistId: response.data.items[i].id, 
                        accountType: 'spotify',
                        tracks: [],
                        name: this.decodeHtml(response.data.items[i].name),
                        image: response.data.items[i].images[0].url,
                        followers: 0,
                        description: response.data.items[i].description
                    }
                    this.playlists.push(playlistObject)
                }

                if(response.data.next) {
                    // Reset
                    this.retryDownloadPlaylists = 0
                    // Load more
                    this.loadMorePlaylists(response.data.next)
                } else {
                    // Done loading more
                    // Save playlists to db
                    this.savePlaylistsToDb()
                }
            })
            .catch((err) => {
                if(err.response.data.error.message === 'The access token expired') {
                    // If token fails retry
                    if(this.retryDownloadPlaylists < 1) {
                        this.$store.dispatch('refreshTokens', {
                            refreshToken: this.selectedAccount.refreshToken,
                            accountId: this.selectedAccount.accountId
                        })
                        .then((response) => {
                            this.updatePlaylists()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        this.retryDownloadPlaylists++
                    } else if (this.retryDownloadPlaylists === 1) {
                        // It has been attempted twice and still failed
                        // Show error message
                        this.$store.commit('setMessage', 'There was an issue getting playlist data.')
                    }
                }
            })
        },
        // If playlists is greater than 20
        loadMorePlaylists(nextUrl) {
            // Header
            let config = {
                headers: {
                    Authorization: 'Bearer ' + this.selectedAccount.accessToken
                }
            }
            axios.get(nextUrl, config)
            .then((response) => {
                // Loop over response playlists 
                for(var i = 0; i < response.data.items.length; i++) {
                    var playlistObject = {
                        userId: this.user._id,
                        accountId: this.selectedAccount.accountId,
                        playlistId: response.data.items[i].id, 
                        accountType: 'spotify',
                        tracks: [],
                        name: this.decodeHtml(response.data.items[i].name),
                        image: response.data.items[i].images[0].url,
                        followers: 0,
                        description: response.data.items[i].description
                    }
                    this.playlists.push(playlistObject)
                }

                if(response.data.next) {
                    this.loadMorePlaylists(response.data.next)
                } else {
                    // Done loading more
                    // Save playlists to db
                    this.savePlaylistsToDb()
                    this.retryDownloadPlaylists = 0
                }
            })
            .catch((err) => {
                if(err.response.data.error.message === 'The access token expired') {
                    // If token fails retry
                    if(this.retryDownloadPlaylists < 1) {
                        this.$store.dispatch('refreshTokens', {
                            refreshToken: this.selectedAccount.refreshToken,
                            accountId: this.selectedAccount.accountId
                        })
                        .then((response) => {
                            this.loadMorePlaylists(nextUrl)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        this.retryDownloadPlaylists++
                    } else if (this.retryDownloadPlaylists === 1) {
                        // It has been attempted twice and still failed
                        // Show error message
                        this.$store.commit('setMessage', 'There was an issue getting playlist data.')
                    }
                }
            })
        },
        // Save playlists to db
        savePlaylistsToDb() {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.post(process.env.API_URL + '/playlists/multiple', {
                playlists: this.playlists,
                accountId: this.selectedAccount.accountId,
                accountType: 'spotify'
            }, config)
            .then((response) => {
                console.log('saved')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        decodeHtml(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        },
    },
    watch: {
        selectedAccount() {
            setTimeout(() => {
                this.playlists = []
                this.loadPlaylists() 
            },200)
        }
    }
}
</script>

<style scoped>
/* Page Content */
.playlistListCon {
    padding-right: 600px;
}
.playlistListWrapper {
    margin-top: -40px;
    z-index: 10;
    position: relative;
}

/* Playlist Preview */
.playlistPreviewCon {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    width: 600px;
    border-radius: 0 0 0 20px;
    overflow: hidden;
}
</style>
