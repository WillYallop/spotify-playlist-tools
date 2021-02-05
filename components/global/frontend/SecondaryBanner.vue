<template>
    <div class="bannerCon">
        <div class="bannerWrap pageWrapper">

            <!-- Textarea -->
            <div class="bannerTextarea">
                <h1 class="bannerTitleP">{{title}}</h1>
                <p class="bannerBodyP">{{body}}</p>
                <button class="spotifySignIn"><fa class="fas" :icon="['fab', 'spotify']"/>Log In With Spotify</button>
            </div>
            <!-- Image -->
            <div class="bannerImgCon">
                <img src="../../../assets/images/frontend/feature2.png" alt="Delete Duplicate Playlist Tracks" class="bannerImg">
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        body: String
    }
}
</script>

<style scoped>
.bannerCon {
    background-color: var(--background-4);
    padding-top: 80px;
    width: 100%;
}
.bannerWrap {
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Textarea */
.bannerTextarea {
    max-width: 600px;
    padding-top: 50px;
    padding-bottom: 50px;
} 
.bannerTitleP {
    font-size: clamp(30px, 7vw, 45px);
    margin-bottom: 10px;
} 
.bannerBodyP {
    max-width: 550px;
    margin-bottom: 40px;
} 
.spotifySignIn {
    padding: 10px 40px;
    border-radius: 10px;
    background-color: var(--accent-2);
    border: none;
    color: #FFF;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}
.spotifySignIn:hover {
    background-color: var(--accent-2-hover);
}
.spotifySignIn .fas {
    margin-right: 5px;
    font-size: 16px;
}

/* Banner Img */
.bannerImgCon {
    width: 40%;
}
.bannerImg {
    width: 100%;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .bannerImgCon {display: none;}
}
</style>