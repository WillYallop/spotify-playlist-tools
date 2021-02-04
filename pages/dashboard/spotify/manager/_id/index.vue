<template>
    <div>
        <!-- Page Content -->
        <div class="managePlaylistCon">
            <ManagePlaylistHeader
            :playlistName="playlist.name"
            @refresh-playlist="refreshPlaylist"
            @toggle-playlist-preview="togglePlaylistPreview = !togglePlaylistPreview"/>
            <div class="managePlaylistWrapper appPageWrapper">

                <!-- Remove Duplicates -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP">Remove Duplicates</p>
                            <p class="sectBodyP">You have <span class="boldify">{{duplicates.length}}</span> duplicate tracks in this playlist!</p>
                        </div>
                        <SwitchInput v-if="duplicates.length > 0" :boolean="removeDuplicates" @update-boolean="removeDuplicates = $event"/>
                    </div>
                    <div v-show="removeDuplicates" class="sectionDropdownCon" style="padding-top: 10px;">
                        <SpotifyTrackRow :key="track.trackId + 1" v-for="track in duplicates"
                        :track="track"/>
                    </div>
                </div>

                <!-- Remove Unplayable Tracks -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP">Remove Unplayable Tracks</p>
                            <p class="sectBodyP">You have <span class="boldify">{{unplayableTracks.length}}</span> tracks in this playlist that are not available in any countries!</p>
                        </div>
                        <SwitchInput v-if="unplayableTracks.length > 0" :boolean="removeUnplayable" @update-boolean="removeUnplayable = $event"/>
                    </div>
                    <div v-show="removeUnplayable" class="sectionDropdownCon" style="padding-top: 10px;">
                        <SpotifyTrackRow :key="track.trackId + 2" v-for="track in unplayableTracks"
                        :track="track"/>
                    </div>
                </div>

                <!-- Re-Order Playlist -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP">Re-Order Playlist</p>
                            <p class="sectBodyP">Decide how you want to re order your playlist</p>
                        </div>
                        <SwitchInput :boolean="reorderPlaylist" @update-boolean="reorderPlaylist = $event"/>
                    </div>
                    <div v-show="reorderPlaylist" class="sectionDropdownCon">
                        <div class="inputSect">
                            <p class="inputTitle">Randomise</p>
                            <SwitchInput :boolean="randomiseOrder" @update-boolean="randomiseOrder = $event"/>
                        </div>
                        <div v-show="!randomiseOrder" class="inputSect">
                            <p class="inputTitle">Order By</p>
                            <select class="selectStyle" v-model="orderBy">
                                <option value="original">Original</option>
                                <option value="descending">Date Descending</option> 
                                <option value="ascending">Date Ascending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Update Playlist -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP">Update playlist!</p>
                            <p class="sectBodyP">Happy with your settings? Hit update to make your changes go live!</p>
                        </div>
                    </div>
                    <button class="updatePlaylistBtn" v-on:click="updatePlaylist(true)">Update</button>
                </div>

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
                <SpotifyPlaylistPreview v-if="!tracksUpdating"
                :playlist="playlist"
                :tracks="showTracks"
                @update-tracks="updateTracks"/>
                <div class="playlistPreviewUpdatingCon" v-else>
                    <div class="skeletonCon">
                        <Skeleton/>
                    </div>
                </div>
            </div>
        </div>
        <div v-on:click="togglePlaylistPreview = !togglePlaylistPreview" class="playlistOverlayBg" :class="{ 'bgActive' : togglePlaylistPreview }"></div>

    </div>
</template>

<script>
// Libs
import axios from 'axios'

// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import ManagePlaylistHeader from '@/components/app/spotify/manager/ManagePlaylistHeader'
import SwitchInput from '@/components/global/SwitchInput'
import SpotifyTrackRow from '@/components/app/spotify/SpotifyTrackRow'
import Skeleton from '@/components/global/Skeleton'

export default {
    layout: 'app',
    data() {
        return {
            // Page  logic
            allTrackIds: [],
            tracksUpdating: false,
            togglePlaylistPreview: false,

            // Remove duplicates 
            removeDuplicates: false, 
            duplicatesKey: 1,
            
            // Remove unplayable tracks
            removeUnplayable: false,
            unplayableTracks: [],

            // Reorder Playlist
            reorderPlaylist: false,  
            orderBy: 'original',
            randomiseOrder: false
        }
    },
    mounted() {
        if(this.selectedAccount) {
            this.$store.dispatch('loadSinglePlaylist', {  
                user: this.user,
                playlistId: this.$router.currentRoute.params.id
            })
        } else {
            this.$router.push('/dashboard/spotify/manager')
        }
    },
    components: {
        SpotifyPlaylistPreview,
        ManagePlaylistHeader,
        SwitchInput,
        SpotifyTrackRow,
        Skeleton
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
        playlistSelectLock() {
            return this.$store.state.spotifyPlaylists.playlistSelectLock
        },

        //
        duplicates() {
            if(this.playlist.tracks) {
                let checkedIds = []
                let duplicateIds = []
                for(var i = 0; i < this.playlist.tracks.length; i++) {
                    const check = checkedIds.find( x => x === this.playlist.tracks[i].id)
                    if(check) {
                        let trackObj = this.tracks.find( x => x.trackId === this.playlist.tracks[i].id)
                        if(trackObj) {
                            duplicateIds.push(trackObj)
                        }
                    } else {
                        checkedIds.push(this.playlist.tracks[i].id)
                    }
                }
                return duplicateIds
            } else {
                return []
            }
        },
        showTracks() {
            if(this.playlist.tracks) {
                var array = []
                this.unplayableTracks = []
                for(var i = 0; i < this.playlist.tracks.length; i++) {
                    const trackObj = this.tracks.find( x => x.trackId === this.playlist.tracks[i].id)
                    if(trackObj) {
                        array.push(trackObj)
                        if(!this.playlist.tracks[i].available) {
                            this.unplayableTracks.push(trackObj)
                        }
                    }
                }
                return array
            }
        }
        
    },
    methods: {
        updateTracks(data) {
            this.$store.commit('updateSinglePlaylistTrack', data)
        },
        sortedArray() {
            if(!this.randomiseOrder) {
                // Original order
                if(this.orderBy === 'original') {
                    let array = []
                    for(var i = 0; i < this.playlist.tracks.length; i++) {
                        const trackObj = this.playlist.tracks.find( x => x.pos === i+1)
                        if(trackObj) {
                            array.push(trackObj)
                        }
                    }
                    this.$store.commit('setSinglePlaylistTracks', array)
                }
                //  Descending Order 
                else if(this.orderBy === 'descending') {
                    let array = this.playlist.tracks
                    array.sort(function compare(a, b) {
                        var dateA = new Date(a.addedAt);
                        var dateB = new Date(b.addedAt);
                        return dateB - dateA;
                    });
                    let orderedArray = []
                    for(var i = 0; i < array.length; i++) {
                        orderedArray.push(array[i])
                    }
                    this.$store.commit('setSinglePlaylistTracks', array)
                }
                // Ascending Order 
                else if(this.orderBy === 'ascending') {
                    let array = this.playlist.tracks
                    array.sort(function compare(a, b) {
                        var dateA = new Date(a.addedAt);
                        var dateB = new Date(b.addedAt);
                        return dateA - dateB;
                    });
                    let orderedArray = []
                    for(var i = 0; i < array.length; i++) {
                        orderedArray.push(array[i])
                    }
                    this.$store.commit('setSinglePlaylistTracks', orderedArray)
                } 
            } 
            // Randomise order
            else { 
                let array = this.playlist.tracks
                var currentIndex = array.length, temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                let trackArray = array
                let returnArray = []
                for(var i = 0; i < trackArray.length; i++) {
                    returnArray.push(trackArray[i])
                }
                console.log(returnArray)
                this.$store.commit('setSinglePlaylistTracks', returnArray)
            }
        },
        // Update playlist
        // Main actions
        updatePlaylist() {
            // Check if we have one of the options selected
            if(this.reorderPlaylist || this.removeDuplicates || this.removeUnplayable) {

                // Toggle account lock
                this.$store.commit('toggleAccountLock', true)
                this.tracksUpdating = true

                // If we have tracks to remove from duplicates and/or unplayable tracks
                if(this.removeDuplicates || this.removeUnplayable) {
                    let removeTracks = this.getRemoveIds()
                    if(removeTracks.length > 0) {
                        this.deleteTracks(true, removeTracks, 'remove-only')
                        .then((response) => {
                            // Update playlist tracks array
                            for(var i = 0; i < removeTracks.length; i++) {
                                let indexOf = this.playlist.tracks.findIndex( x => x.id === removeTracks[i])
                                this.$store.commit('spliceSingplePlaylistTrack', indexOf)
                            }
                            this.newPlaylistTracksArray(this.getAllIds())
                            .then((response) => {
                                // Check if we want to re-order the playlist
                                if(this.reorderPlaylist) {
                                    let trackIds = this.getAllIds()
                                    this.deleteTracks(true, trackIds, false)
                                    .then((response) => {
                                        // Add tracks back to playlist
                                        this.addTracks(true, trackIds) 
                                        .then((response) => {
                                            // Update playlist tracks array
                                            this.newPlaylistTracksArray(trackIds)
                                            .then(() => {
                                                this.updateDb() // Update db
                                                this.resetPage() // Reset
                                            })
                                        })
                                    })
                                } else {
                                    this.updateDb() // Update db
                                    this.resetPage() // Reset
                                }
                            })
                        })
                    }
                } else {
                    let trackIds = this.getAllIds()
                    this.deleteTracks(true, trackIds, false)
                    .then((response) => {
                        // Add tracks back to playlist
                        this.addTracks(true, trackIds) 
                        .then((response) => {
                            // Update playlist tracks array
                            this.newPlaylistTracksArray(trackIds)
                            .then(() => {
                                this.updateDb() // Update db
                                this.resetPage() // Reset
                            })
                        })
                    })
                }
            }
        },
        deleteTracks(refresh, array, type) {
            return new Promise((resolve, reject) => {

                let chunkedArray = this.chunkArray(99, array)

                let counter = 0;
                for(var i = 0; i < chunkedArray.length; i++) {
                    counter++
                    // format array into array of objects
                    var tracksArray = chunkedArray[i]
                    const trackUrlObjectsArray = []
                    // Format track values for URL
                    for(var k = 0; k < tracksArray.length; k++) {
                        if(type === 'remove-only') {
                            var trackObj = {
                                uri: 'spotify:track:' + tracksArray[k],
                                positions: [this.playlist.tracks.findIndex( x => x.id === tracksArray[k])]
                            }
                        } else {
                            var trackObj = {
                                uri: 'spotify:track:' + tracksArray[k]
                            }
                        }
                        trackUrlObjectsArray.push(trackObj)
                    }
                    // Delete playlist tracks
                    axios({
                        method: 'delete' ,
                        url: 'https://api.spotify.com/v1/playlists/'+this.$router.currentRoute.params.id+'/tracks',
                        data: {
                            tracks: trackUrlObjectsArray
                        },
                        headers: {
                            Authorization: 'Bearer ' + this.selectedAccount.accessToken,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((result) => {
                        
                    })
                    .catch((err) => {
                        if(err.response.data.error.message === 'The access token expired') {
                            // If token fails retry
                            if(refresh) {
                                this.$store.dispatch('refreshTokens', {
                                    refreshToken: this.selectedAccount.refreshToken,
                                    accountId: this.selectedAccount.accountId
                                })
                                .then((response) => {
                                    this.deleteTracks(false, array, type)
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            }
                        }
                    })
                }

                if(counter === chunkedArray.length) {
                    resolve(true)
                }

            })
        },
        addTracks(refresh, array) {
            return new Promise((resolve, reject) => {

                // Add "allTrackIds" back 
                var chunkedArray = this.chunkArray(99, array)

                let counter = 0;
                for(var i = 0; i < chunkedArray.length; i++) {
                    counter++
                    var tracksArray = chunkedArray[i]
                    const trackUrlArray = [];
                    // Format track values for URL
                    for(var k = 0; k < tracksArray.length; k++) {
                        var string = 'spotify:track:' + tracksArray[k]
                        trackUrlArray.push(string)
                    }
                    // Add playlist track
                    // Headers
                    let header = {
                        headers: {
                            Authorization: 'Bearer ' + this.selectedAccount.accessToken, 
                            'Content-Type': 'application/json' 
                        }
                    }
                    axios.post('https://api.spotify.com/v1/playlists/'+this.$router.currentRoute.params.id+'/tracks', {
                        uris: trackUrlArray
                    }, header)
                    .then((res) => {

                    })
                    .catch((err) => {
                        if(err.response.data.error.message === 'The access token expired') {
                            // If token fails retry
                            if(refresh) {
                                this.$store.dispatch('refreshTokens', {
                                    refreshToken: this.selectedAccount.refreshToken,
                                    accountId: this.selectedAccount.accountId
                                })
                                .then((response) => {
                                    this.addTracks(false, array)
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            }
                        }
                    })
                }

                if(counter === chunkedArray.length) {
                    resolve(true)
                }

            })
        },
        updateDb() {
            // Save playlist track data
            let playlistTrackChunkArray = this.chunkArray(99, this.playlist.tracks)
            var playlistChunkArrayLength = playlistTrackChunkArray.length

            for(var i = 0; i < playlistChunkArrayLength; i++) {
                this.$axios.post(process.env.API_URL + '/playlists/tracks', {
                    chunk: i + 1,
                    playlistId: this.$router.currentRoute.params.id,
                    accountId: this.selectedAccount.accountId,
                    accountType: 'spotify',
                    playlistTrackData: playlistTrackChunkArray[i]
                })
                .then((response) => {
                    // unlock acount swap
                    this.$store.commit('toggleAccountLock', false)
                    this.tracksUpdating = false
                    this.$store.commit('setMessage', 'Updated playlist tracks!')
                })
                .catch((err) => {
                    console.log(err)
                    // unlock acount swap
                    this.$store.commit('toggleAccountLock', false)
                    this.tracksUpdating = false
                })
            }
        },

        // Functions
        getAllIds() {
            this.allTrackIds = []
            let idArray = []
            for(var i = 0; i < this.playlist.tracks.length; i++) {
                idArray.push(this.playlist.tracks[i].id)
            }
            return idArray
        },
        getRemoveIds() {
            let trackIds = []

            // For duplicate tracks
            if(this.removeDuplicates) {
                let duplicateTracks = this.duplicates
                for(var i = 0; i < duplicateTracks.length; i++) {
                    let alreadyAdded = trackIds.find( x => x === duplicateTracks[i].trackId)
                    if(!alreadyAdded) {
                        trackIds.push(duplicateTracks[i].trackId)
                    }
                }
            }

            // For unplayable tracks
            if(this.removeUnplayable) {
                let unplayableTracks = this.unplayableTracks
                for(var n = 0; n < unplayableTracks.length; n++) {
                    let alreadyAdded2 = trackIds.find( x => x === unplayableTracks[n].trackId)
                    if(!alreadyAdded2) {
                        trackIds.push(unplayableTracks[n].trackId)
                    }
                }
            }

            return trackIds
        },
        chunkArray(chunkSize, inputArray) {
            // Spotify can only add 100 songs to a track at a time
            var perChunk = chunkSize;
            var chunkedArray = [];

            // Chunk tracks array into multiples of 100
            let result = inputArray.reduce((resultArray, item, index) => { 
                const chunkIndex = Math.floor(index/perChunk)
                if(!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [] // start a new chunk
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, []);
            chunkedArray = result
            return chunkedArray
        },
        newPlaylistTracksArray(idArray) {
            return new Promise((resolve, reject) => {
                let finalArray = []
                for(var i = 0; i < idArray.length; i++) {
                    let oldTrackObj = this.playlist.tracks.find( x => x.id === idArray[i])
                    if(oldTrackObj) {
                        let newTrackObj = {
                            id: idArray[i],
                            addedAt:new Date(),
                            pos: i+1,
                            available: oldTrackObj.available
                        }
                        finalArray.push(newTrackObj)
                    }
                }
                // Set track data
                this.$store.commit('setSinglePlaylistTracks', finalArray)
                resolve(true)
            })
        },
        resetPage() {
            this.reorderPlaylist = false
            this.randomiseOrder = false
            this.removeUnplayable = false
            this.removeDuplicates = false
        },

        // Refresh page
        refreshPlaylist() {
            this.$store.commit('toggleAccountLock', true)
            this.$store.dispatch('updateSinglePlaylist', {  
                user: this.user,
                playlistId: this.$router.currentRoute.params.id,
                refresh: true
            })

            this.$store.commit('wipePlaylistTrackData')
            this.$store.commit('wipeSinglePlaylistTrackData')
            this.$store.dispatch('updateTracks', { 
                playlist: {
                    playlistId: this.$router.currentRoute.params.id,
                    accountType: 'spotify'
                }, 
                refresh: true 
            })
        }
    },
    watch: {
        selectedAccount(val, oldVal) {
            if(val != oldVal) {
                if(oldVal != false) {
                    this.$router.push('/dashboard/spotify/manager')
                } else {
                    this.$store.commit('toggleAccountLock', true)
                    this.$store.dispatch('loadSinglePlaylist', {  
                        user: this.user,
                        playlistId: this.$router.currentRoute.params.id
                    })
                }
            } else {
                this.$store.commit('toggleAccountLock', true)
                this.$store.dispatch('loadSinglePlaylist', {  
                    user: this.user,
                    playlistId: this.$router.currentRoute.params.id
                })
            }
        },
        orderBy() {
            this.sortedArray()
        },
        randomiseOrder() {
            this.sortedArray()
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

/* Sectioons style */
.sectHeader {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.sectTextarea {
    padding-right: 20px;
}
.sectTitleP {
    font-size: 14px;
    color: var(--title-text);
    font-weight: bold;
    margin-bottom: 2px;
}
.sectBodyP {
    font-size: 14px;
    color: var(--body-text);
}

/* Section dropdown */
.sectionDropdownCon {
    margin-top: 10px;
    border-top: 1px solid var(--border);
}

/* Re order playlist section */
.inputSect {
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
}
.inputTitle {
    font-size: 14px;
    color: var(--title-text);
}
.selectStyle {
    height: 40px;
    width: 100%;
    max-width: 300px;
    background-color: var(--input-bg);
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 14px;
    color: var(--body-text);
    border: 1px solid var(--background-1);
    -webkit-appearance: none;
    cursor: pointer;
}

/* Update btn */
.updatePlaylistBtn {
    padding: 10px 40px;
    background-color: var(--accent-2);
    border-radius: 10px;
    border: none;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 10px;
}
.updatePlaylistBtn:hover {
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
    color: var(--title-text);
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
.playlistPreviewUpdatingCon {
    height: 100%;
    width: 100%;
    background-color: var(--background-3);
    padding: 20px;
}
.skeletonCon {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
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
    opacity: 0.7;
    z-index: 50;
}


/* Media Queries */
@media only screen and (max-width: 1500px) {
    .playlistPreviewCon {right: 10px; left: 360px; width: auto; top: 100%; bottom: -100%; transition: 0.2s; background-color: var(--background-2); border-radius: 20px 20px 0 0; padding: 0 5px 5px;}
    .playlistPreviewCon.mobActive {bottom: 0; top: 140px;}
    .playlistPreviewWrapper { height: calc(100% - 40px); }
    .mobActive .mobilePlaylistHeader {display: flex;}
    .managePlaylistCon {padding-right: 0;}
    .playlistOverlayBg.bgActive {display: flex; pointer-events: all;}
}
@media only screen and (max-width: 1024px) {
    .playlistPreviewCon {left: 10px;}
}
</style>