<template>
    <div class="playlistCon">
        <div v-if="hasPlaylist" class="playlistOuterCon">
            <Simplebar class="playlistOuterWrapper" data-simplebar-auto-hide="true">
               <div class="playlistInner">

                   <!-- Playlist Info -->
                   <div class="playlistHeaderCon">
                       <img :src="playlist.image" :alt="playlist.name" class="playlistImg">
                       <div class="headTopRow">
                            <div class="playlistHeadererTextarea">
                                <p class="playlistTitleP">{{playlist.name}}</p>
                                <p class="playlistDescP">{{playlist.description}}</p>
                            </div>
                            <div class="playlistStatsCon">
                                <p><fa class="fas" :icon="['fa', 'users']"/>200 Followers</p>
                                <p><fa class="fas" :icon="['fa', 'music']"/>67 Tracks</p>
                                <p><fa class="fas" :icon="['fa', 'stopwatch']"/>1h 14m</p>
                            </div>
                       </div>
                   </div>

                   <!-- Tracks -->
                   <table class="tracksTable">
                         <tr class="tableHeader">
                            <th style="font-size: 14px;">#</th>
                            <th class="titleCol" style="font-size: 14px;">TITLE</th>
                            <th class="dateCol" style="font-size: 14px;">DATE</th>
                            <th style="font-size: 14px;">TIME</th>
                        </tr>
                        <tr class="trackRow" :key="track.trackId" v-for="track in tracks">
                            <td style="font-size: 12px;">{{tracks.findIndex(x => x === track) + 1}}</td>
                            <td class="titleCol" style="font-size: 16px;">
                                {{track.name}}
                                <br>
                                <div class="trackArtsitCon"><p class="trackArtistsP" :key="artist.name" v-for="artist in track.artists">{{artist.name}}<span v-if="track.artists.indexOf(artist) != track.artists.length - 1">, </span></p></div>
                            </td>
                            <td class="dateCol" style="font-size: 12px;">{{dateAdded(track.trackId)}}</td>
                            <td style="font-size: 12px;">{{ track.duration | msToMinAndSec }}</td>
                        </tr>
                    </table>

               </div>
            </Simplebar>
        </div>      
        <div v-else class="noPlaylistCon">
            <fa class="fas" :icon="['fab', 'spotify']"/>
            <p>Select a playlist to get a preview!</p>
        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'
// Componenets
import Simplebar from 'simplebar-vue'

export default {
    data() {
        return {
            tracks: [],
            playlistTrackData: [],
            retryDownloadTracks: 0
        }
    },
    props: {
        playlist: Object
    },
    components: {
        Simplebar
    },
    computed: {
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
        hasPlaylist() {
            for(var prop in this.playlist) {
                if(this.playlist.hasOwnProperty(prop))
                return true;
            }
            return false;
        }
    },
    methods: {
        downloadTracks() {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.get(process.env.API_URL + '/tracks/'+this.playlist.accountType+'/'+this.playlist.playlistId, config)
            .then((response) => {
                // Download new playlist tracks from Spotify API
                // Else - set saved data
                if(response.data.update) {
                    this.updateTracks()
                } else {
                    this.tracks = response.data.tracks
                }
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status === 404) {
                    this.updateTracks()
                }
            })
        },
        updateTracks() {
            // Header
            let config = {
                headers: {
                    Authorization: 'Bearer ' + this.selectedAccount.accessToken
                }
            }
            axios.get('https://api.spotify.com/v1/playlists/'+this.playlist.playlistId+'/tracks', config)
            .then((response) => {
                console.log(response.data)
                // Loop over response playlists 
                for(var i = 0; i < response.data.items.length; i++) {
                    var track = {
                        trackId: response.data.items[i].track.id,
                        name: response.data.items[i].track.name,
                        popularity: response.data.items[i].track.popularity,
                        artists: response.data.items[i].track.artists,
                        duration: response.data.items[i].track.duration_ms,
                        explicit: response.data.items[i].track.explicit,
                        images: response.data.items[i].track.album.images,
                        trackPlatform: 'spotify'
                    }
                    this.tracks.push(track)
                    this.playlistTrackData.push({
                        id: response.data.items[i].track.id,
                        addedAt: response.data.items[i].added_at
                    })
                }

                if(response.data.next) {
                    // Reset
                    this.retryDownloadTracks = 0
                    // Load more
                    this.loadMoreTracks(response.data.next)
                } else {
                    // Done loading more
                    // Save playlists to db
                    this.saveTracksToDb()
                }
            })
            .catch((err) => {
                if(err.response.data.error.message === 'The access token expired') {
                    // If token fails retry
                    if(this.retryDownloadTracks < 1) {
                        this.$store.dispatch('refreshTokens', {
                            refreshToken: this.selectedAccount.refreshToken,
                            accountId: this.selectedAccount.accountId
                        })
                        .then((response) => {
                            this.updateTracks()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        this.retryDownloadTracks++
                    } else if (this.retryDownloadTracks === 1) {
                        // It has been attempted twice and still failed
                        // Show error message
                        this.$store.commit('setMessage', 'There was an issue getting tracks data.')
                    }
                }
            })
        },
        loadMoreTracks(nextUrl) {
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
                    var track = {
                        trackId: response.data.items[i].track.id,
                        name: response.data.items[i].track.name,
                        popularity: response.data.items[i].track.popularity,
                        artists: response.data.items[i].track.artists,
                        duration: response.data.items[i].track.duration_ms,
                        explicit: response.data.items[i].track.explicit,
                        images: response.data.items[i].track.album.images,
                        trackPlatform: 'spotify'
                    }
                    this.tracks.push(track)
                    this.playlistTrackData.push({
                        id: response.data.items[i].track.id,
                        addedAt: response.data.items[i].added_at
                    })
                }

                if(response.data.next) {
                    this.loadMoreTracks(response.data.next)
                } else {
                    // Done loading more
                    // Save playlists to db
                    this.saveTracksToDb()
                    this.retryDownloadTracks = 0
                }
            })
            .catch((err) => {
                if(err.response.data.error.message === 'The access token expired') {
                    // If token fails retry
                    if(this.retryDownloadTracks < 1) {
                        this.$store.dispatch('refreshTokens', {
                            refreshToken: this.selectedAccount.refreshToken,
                            accountId: this.selectedAccount.accountId
                        })
                        .then((response) => {
                            this.loadMoreTracks(nextUrl)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        this.retryDownloadTracks++
                    } else if (this.retryDownloadTracks === 1) {
                        // It has been attempted twice and still failed
                        // Show error message
                        this.$store.commit('setMessage', 'There was an issue getting tracks data.')
                    }
                }
            })
        },
        saveTracksToDb() {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.post(process.env.API_URL + '/tracks/multiple', {
                tracks: this.tracks,
                playlistId: this.playlist.playlistId,
                accountId: this.selectedAccount.accountId,
                accountType: 'spotify',
                playlistTrackData: this.playlistTrackData
            }, config)
            .then((response) => {
                this.$emit('playlist-track-data', this.playlistTrackData)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        //
        dateAdded(id) {
            if(this.playlist.tracks.length > 0) {
                let obj = this.playlist.tracks.find(x => x.id === id)
                let addedAtDate = obj.addedAt

                const diffTime = Math.abs(new Date() - new Date(addedAtDate));
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 

                if(diffDays > 10) {
                    return new Date(addedAtDate).toLocaleDateString()
                } else {
                    return diffDays + ' days ago'
                }
            }
        },

    },
    watch: {
        playlist() {
            this.tracks = []
            this.playlistTrackData = []
            this.downloadTracks()
        }
    }
}
</script>

<style scoped>
.playlistCon {
    height: 100%;
    width: 100%;
    background-color: var(--background-3);
}

/* playlist */
.playlistOuterCon {
    height: 100%;
    color: #FFF;
}
.playlistOuterWrapper {
    height: 100%;
}
.playlistInner {
    width: 100%;
}

/* No playlist selected */
.noPlaylistCon {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.noPlaylistCon p {
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
}
.noPlaylistCon .fas {
    font-size: 20px;
    color: #FFF;
    margin-bottom: 5px;
}

/* Header */
.playlistHeaderCon {
    width: 100%;
    background-color: #050817;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
} 
.headTopRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.playlistImg {
    width: 110px;
    height: 110px;
    object-fit: cover;
    min-width: 110px;
    border-radius: 10px;
} 
.playlistHeadererTextarea {
    padding-left: 10px;
    width: 100%;
} 
.playlistTitleP {
    font-size: 20px;
    color: #FFF;
    font-weight: bold;
    margin-bottom: 5px;
} 
.playlistDescP {
    font-size: 14px;
    color: #F0EFEF;
}
/* Playlist info */
.playlistStatsCon {
    width: 100%;
    padding-left: 10px;
    display: flex;
    border-top: 1px solid #111639;
    border-bottom: 1px solid #111639;
    margin: 5px 0 0 10px;
    padding: 5px 0;
}
.playlistStatsCon p {
    font-size: 14px;
    margin-right: 10px;
}
.playlistStatsCon .fas {
    color: var(--accent-2);
    margin-right: 5px;
}

/* Tracks */
.tracksTable {
    width: 100%;
    border-spacing: 0;
    padding: 0 10px 10px;
}
.tableHeader {
    background-color: #101539;
    border-radius: 5px;
    overflow: hidden;
}
.tracksTable th {
    text-align: left;
    font-size: 14px;
    color: #ACA8A8;
    padding: 5px;
}
.trackArtsitCon {
    display: flex;
    flex-wrap: wrap;
}
.trackArtistsP {
    font-size: 14px;
    margin-right: 5px;
    color: #9C9797;
}
.dateCol {
    min-width: 100px;
}
.trackRow td {
    border-bottom: 1px solid #131A41 !important;
    padding: 5px 0;
}
.titleCol {
    padding-left: 10px !important;
    font-size: 14px !important;
}
</style>

<style>
.playlistOuterWrapper .simplebar-content {
    height: 100%;
}
.playlistOuterWrapper .simplebar-scrollbar:before {
  background: #FFF;
}
</style>