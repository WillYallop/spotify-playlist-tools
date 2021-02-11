<template>
    <div class="removeDuplicatesCon">

        <div class="playlistRowCon" :key="playlist.playlistId" v-for="playlist in playlists">
            <!-- Playlist Header -->
            <div class="playlistHeader">
                <div class="playlistHeaderLeftCon">
                    <img :src="playlist.image" class="playlistImg">
                    <div class="playlistHeaderTextarea">
                        <p class="titleP">{{playlist.name}}</p>
                        <p class="bodyP">This playlist has <span class="boldify">{{playlist.duplicateTracks.length}}</span> duplicate!</p>
                    </div>
                </div>
                <button class="removeDuplicatesBtn" v-on:click="removeDuplicateTracks(playlist)">Remove Duplicates</button>
            </div>
            <!-- Playlist Body --> 
            <div class="playlistBodyCon">
                <div class="duplicateTrackRow" :key="duplicate.trackId" v-for="duplicate in playlist.duplicateTracks">
                    <div class="duplicateIcon">duplicate</div>
                    <p class="bodyP">{{duplicate.name}} <span class="greyedText">by</span> {{duplicate.artists[0].name}}</p>
                </div>
            </div>
        </div>

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
    methods: {
        removeDuplicateTracks(playlist) {
            this.$store.dispatch('fe_removeTracksFromSpotifyPlaylist', {
                playlistId: playlist.playlistId,
                tracks: playlist.duplicateTracks,
                refresh: true
            })
            .then((snapshot) => {
                if(snapshot) {
                    this.$store.dispatch('fe_updatePlaylistsSnapshot', {
                        accountId: this.spotifyFrontendData.userData.id,
                        playlistId: playlist.playlistId,
                        snapshot: snapshot,
                        hasDuplicates: false,
                        duplicateTracks: [],
                        beenChecked: true
                    })
                    this.$store.commit('fe_removeSpecificPlaylist', playlist.playlistId)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.removeDuplicatesCon {
    padding: 10px;
}

/* Playlist */
.playlistRowCon {
    width: 100%;
    margin-bottom: 10px;
    background-color: #EFEFEF;
    border-radius: 10px;
    padding: 10px;
} 
.playlistRowCon:last-child {
    margin-bottom: 0;
}
.playlistHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
} 
.playlistHeaderLeftCon {
    display: flex;
    align-items: center;
    width: calc(100% - 180px);
} 
.playlistImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 5px;
} 
.playlistHeaderTextarea {
    padding: 0 10px;
    width: calc(100% - 40px);
} 
.titleP {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 2px;
} 
.playlistHeaderTextarea .titleP {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bodyP {
    font-size: 14px;
} 

.removeDuplicatesBtn {
    background-color: var(--error-text);
    padding: 10px 20px;
    font-size: 14px;
    color: #FFF;
    border-radius: 10px;
    border: none;
    transition: 0.2s;
    cursor: pointer;
}
.removeDuplicatesBtn:hover {
    background-color: var(--error-text-hover);
}

/* Duplicate Track */
.playlistBodyCon {
    margin-top: 10px;
} 
.duplicateTrackRow {
    margin-top: 5px;
    padding: 5px 0 0;
    border-top: 1px solid #CECECE;
    display: flex;
    align-items: center;
} 
.duplicateTrackRow .bodyP {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.duplicateIcon {
    background-color: var(--accent-1);
    padding: 5px;
    color: #FFF;
    font-size: 12px;
    margin-right: 5px;
    border-radius: 10px;
}
.greyedText {
    color: black;
    font-weight: bold;
}

/* Queries */
@media only screen and (max-width: 750px) {
    .playlistHeaderLeftCon {width: 100%;}
    .playlistHeader {flex-wrap: wrap;}
    .removeDuplicatesBtn {width: 100%; margin-top: 10px;}
    .playlistHeaderTextarea {padding: 0 0 0 10px;}
}
</style>