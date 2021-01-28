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
                                <p class="playlistDescP">{{ playlist.description | decodeHtml }}</p>
                            </div>
                            <div class="playlistStatsCon">
                                <p v-if="playlist.followers >= 0"><fa class="fas" :icon="['fa', 'users']"/>{{playlist.followers}} Followers</p>
                                <p v-else><fa class="fas" :icon="['fa', 'users']"/>followers unknown</p>
                                <p><fa class="fas" :icon="['fa', 'music']"/>{{playlist.tracks.length}} Tracks</p>
                                <p><fa class="fas" :icon="['fa', 'stopwatch']"/>{{ totalDuration | convertMs }}</p>
                            </div>
                       </div>
                   </div>

                   <!-- Tracks -->
                    <Draggable v-model="tracksArray" class="trackCon" ghost-class="ghost" :move="checkMove">
                        <div class="trackRow" :key="track.trackId + tracksArray.indexOf(track)" v-for="track in tracksArray">
                            <div class="trackRowInner" :class="{ 'unavailableTrack' : isAvailable(track.trackId) }">
                                <div class="trackCol nameCol">
                                    {{track.name}}
                                    <br>
                                    <div class="trackArtsitCon"><p class="trackArtistsP" :key="artist.name" v-for="artist in track.artists">{{artist.name}}<span v-if="track.artists.indexOf(artist) != track.artists.length - 1">, </span></p></div>
                                </div>
                                <div class="rightCol">
                                    <div class="trackCol dateCol">
                                        <p class="dateTitleP">Added</p>
                                        <p class="dateP">{{dateAdded(track.trackId)}}</p>
                                    </div>
                                    <div class="trackCol durationCol">
                                        <p>{{ track.duration | msToMinAndSec }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Draggable>

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
// Componenets
import Simplebar from 'simplebar-vue'

export default {
    data() {
        return {
            moveItem: {}
        }
    },
    components: {
        Simplebar
    },
    props: {
        playlist: Object,
        tracks: Array
    },
    computed: {
        tracksArray: {
            set(val) {
                this.moveItem.array = val
                this.$emit('update-tracks', this.moveItem)
            },
            get() {
                return this.tracks
            }
        },
        hasPlaylist() {
            for(var prop in this.playlist) {
                if(this.playlist.hasOwnProperty(prop))
                return true;
            }
            return false;
        },
        totalDuration() {
            if(this.tracks) {
                var sum = 0
                for(var i = 0; i < this.tracks.length; i++) {
                    sum = sum + this.tracks[i].duration
                }
                return sum
            }
        }

    },
    methods: {
        dateAdded(id) {
            if(this.playlist.tracks) {
                if(this.playlist.tracks.length > 0) {
                    let obj = this.playlist.tracks.find(x => x.id === id)
                    if(obj) {
                        let addedAtDate = obj.addedAt
                        const diffTime = Math.abs(new Date() - new Date(addedAtDate));
                        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 

                        if(diffDays > 10) {
                            return new Date(addedAtDate).toLocaleDateString()
                        } else {
                            return diffDays + ' days ago'
                        }
                    }
                }
            }
        },
        isAvailable(trackId) {
            var obj = this.playlist.tracks.find(x => x.id === trackId) 
            return !obj.available
        },
        checkMove(evt) {
            this.moveItem = {
                fromIndex: evt.draggedContext.index,
                toIndex: evt.draggedContext.futureIndex
            }
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
    margin-bottom: 5px;
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
.trackCon {
    width: 100%;
    padding: 0 10px 10px;
}
.trackRow {
    width: 100%;
    background: var(--background-3);
}
.unavailableTrack {
    color: #60616B;
}
.trackRow.ghost {
  opacity: 1;
  background: var(--background-3-hover);
  cursor: pointer;
}
.trackRowInner {
    width: 100%;
    border-bottom: 1px solid #131A41;
    display: flex;    
    align-items: center;
    justify-content: space-between;
    padding: 5px;
}
.trackCol {
    width: 100%;
}
.nameCol {
    font-size: 14px;
    padding-right: 10px;
    font-weight: bold;
}
.rightCol {
    display: flex;
    align-items: center;
}
.dateCol {
    min-width: 100px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.dateTitleP {
    color: #C1BFBF;
} 
.unavailableTrack .dateTitleP {
    color: #60616B;
}
.dateP {
    font-weight: bold;
}
.durationCol {
    min-width: 40px;
    font-size: 12px;
}
.trackArtsitCon {
    display: flex;
    flex-wrap: wrap;
}
.trackArtistsP {
    font-size: 14px;
    margin-right: 5px;
    color: #9C9797;
    font-weight: normal;
}
.unavailableTrack .trackArtistsP {
    color: #60616B;
}
</style>

<style>
.playlistOuterWrapper .simplebar-content {
    height: 100%;
}
.playlistOuterWrapper .simplebar-scrollbar:before {
  background: #FFF;
}

.sortable-chosen {
	opacity: 1 !important;
    
}
.sortable-ghost {
	opacity: 0 !important;
}
.sortable-fallback {
	opacity: 0 !important;
}

</style>