<template>
    <div class="spotPlaylistRow"  v-on:click="$router.push('/dashboard/spotify/manager/'+playlist.playlistId); wipeClearSelectedPlaylist">
        <div class="leftSideCon">
            <img class="playlistImg" :src="playlist.image" :alt="playlist.name">
            <div class="playlistTexarea">
                <div class="playlistNameP">{{playlist.name}}</div>
                <p class="playlistSubP" v-if="playlist.followers >= 0">{{playlist.followers}} Followers</p>
                <p class="playlistSubP" v-else>Followers unknown</p>
            </div>
        </div>

        <button class="managePlaylistBtn" @click.stop="$emit('preview-playlist', playlist)"><fa class="fas" :icon="['fa', 'music']"/></button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        playlist: Object
    },
    methods: {
        wipeClearSelectedPlaylist() {
            this.$store.commit('resetSelectedPlaylist')
            this.$store.commit('resetTracks')
        }
    }
}
</script>

<style scoped>
.spotPlaylistRow {
    background-color: var(--background-2);
    border: 1px solid var(--border);
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.2s;
}
.spotPlaylistRow:hover {
    background-color: var(--background-2-hover);
}
.spotPlaylistRow:last-child  {
    margin-bottom: 0;
}
.leftSideCon {
    display: flex;
    align-items: center;
    width: calc(100% - 40px);
}
.playlistImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 5px;
} 
.playlistTexarea {
    padding-left: 5px;
    width: calc(100% - 40px);
} 
.playlistNameP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
} 
.playlistSubP {
    font-size: 14px;
    color: var(--body-text);
}

.managePlaylistBtn {
    height: 35px;
    width: 35px;
    min-width: 30px;
    border-radius: 50%;
    background-color: var(--accent-2);
    border: none;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.managePlaylistBtn .fas {
    color: #FFF;
    font-size: 14px;
    margin-left: -4px;
}
.managePlaylistBtn:hover {
    background-color: var(--accent-2-hover);
}
</style>