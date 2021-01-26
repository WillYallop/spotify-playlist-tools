<template>
    <div class="trackRow">
        <img v-if="track.images[2]" :src="track.images[2].url" class="trackImg"> 
        <img v-else :src="track.images[0].url" class="trackImg">
        <div class="trackTextarea">
            <p class="trackTitle">{{track.name}}</p>
            <div class="trackArtsitCon"><p class="trackArtistsP" :key="artist.name" v-for="artist in track.artists">{{artist.name}}<span v-if="track.artists.indexOf(artist) != track.artists.length - 1">, </span></p></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        track: Object
    }
}
</script>

<style scoped>
.trackRow {
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid var(--border);
    margin-bottom: 5px;
}
.trackRow:last-child {
    margin-bottom: 0;
}
.trackImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 5px;
    object-fit: cover;
} 
.trackTextarea {
    padding-left: 5px;
} 
.trackTitle {
    font-size: 14px;
    color: var(--title-text);
    font-weight: bold;
}
.trackArtsitCon {
    display: flex;
    flex-wrap: wrap;
}
.trackArtistsP {
    font-size: 14px;
    margin-right: 5px;
    color: var(--body-text);
    font-weight: normal;
}
</style>