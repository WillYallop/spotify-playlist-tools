<template>
    <div>
        <!-- Page Content -->
        <div class="managePlaylistCon">
            <ManagePlaylistHeader
            :playlistName="playlist.name"/>
            <div class="managePlaylistWrapper appPageWrapper">

                <!-- Remove Duplicates -->
                <div class="sectionCon">
                    <div class="sectHeader">
                        <div class="sectTextarea">
                            <p class="sectTitleP">Remove Duplicates</p>
                            <p class="sectBodyP">You have <span class="boldify">{{duplicates.length}}</span> duplicate tracks in this playlist!</p>
                        </div>
                        <SwitchInput :boolean="removeDuplicates" @update-boolean="removeDuplicates = $event"/>
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
                        <SwitchInput :boolean="removeUnplayable" @update-boolean="removeUnplayable = $event"/>
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
                    <button class="updatePlaylistBtn" v-on:click="updatePlaylist">Update</button>
                </div>

            </div>
        </div>
        <!-- Playlist Preview -->
        <div class="playlistPreviewCon">
            <SpotifyPlaylistPreview
            :playlist="playlist"
            :tracks="showTracks"
            @update-tracks="updateTracks"/>
        </div>
    </div>
</template>

<script>
// Components
import SpotifyPlaylistPreview from '@/components/app/spotify/SpotifyPlaylistPreview'
import ManagePlaylistHeader from '@/components/app/spotify/manager/ManagePlaylistHeader'
import SwitchInput from '@/components/global/SwitchInput'
import SpotifyTrackRow from '@/components/app/spotify/SpotifyTrackRow'

export default {
    layout: 'app',
    data() {
        return {
            // Page  logic

            // Remove duplicates
            removeDuplicates: false,
            
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
        }
    },
    components: {
        SpotifyPlaylistPreview,
        ManagePlaylistHeader,
        SwitchInput,
        SpotifyTrackRow
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

        //
        duplicates() {
            if(this.tracks) {
                let checkedIds = []
                let duplicateIds = []
                for(var i = 0; i < this.tracks.length; i++) {
                    const check = checkedIds.find( x => x === this.tracks[i].trackId)
                    if(check) {
                        duplicateIds.push(this.tracks[i])
                    } else {
                        checkedIds.push(this.tracks[i].trackId)
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
                let array = this.tracks
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
                    let trackObj = this.playlist.tracks.find( x => x.id === trackArray[i].trackId)
                    if(trackObj) {
                        returnArray.push(trackObj)
                    }
                }
                this.$store.commit('setSinglePlaylistTracks', returnArray)
            }
        },
        updatePlaylist() {

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
    background-color: #FDFDFD;
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
</style>