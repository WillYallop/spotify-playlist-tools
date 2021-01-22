<template>
    <div class="playlistCon">
        <div v-if="playlist" class="playlistInner">

        </div>
        <div v-else class="noPlaylistCon">
            <fa class="fas" :icon="['fab', 'spotify']"/>
            <p>Select a playlist to get a preview!</p>
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
        playlist: Object
    }
}
</script>

<style scoped>
.playlistCon {
    height: 100%;
    width: 100%;
    background-color: var(--background-3);
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
</style>