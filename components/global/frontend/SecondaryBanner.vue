<template>
    <div class="bannerCon">
        <div class="bannerWrap pageWrapper">

            <!-- Textarea -->
            <div class="bannerTextarea">
                <h1 class="bannerTitleP">{{title}}</h1>
                <p class="bannerBodyP">{{body}}</p>
                <!-- Spotify Not Signed In -->
                <button v-if="!spotifyFrontendData.signedIn" class="spotifySignIn" v-on:click="signInWithSpotify"><fa class="fas" :icon="['fab', 'spotify']"/>Log In With Spotify</button>
                <!-- Has Spotify Account Signed In -->
                <div v-if="spotifyFrontendData.signedIn && spotifyFrontendData.userData" class="spotifyUserPreviewCon">
                    <img :src="spotifyFrontendData.userData.images[0].url" class="spotifyUserImg">
                    <div class="spotifyUserTextarea">
                        <p class="spotifyUserP">{{spotifyFrontendData.userData.display_name}}</p>
                        <div class="spotifyAltInfoCon">
                            <p class="spotifyAltInfoP"><span class="boldify">{{spotifyFrontendData.userData.followers.total}}</span> Followers</p>
                            <p class="spotifyAltInfoP"><span class="boldify">{{spotifyFrontendData.playlistTotal}}</span> Playlists</p>
                        </div>
                    </div>

                    <div class="spotifySignOutOverlay" v-on:click="signOutOfSpotify">
                        <p class="signOutP"><fa class="fas" :icon="['fab', 'spotify']"/> Sign Out</p>
                    </div>
                </div>

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
        body: String,
        redirectRoute: String
    },
    computed: {
        spotifyFrontendData() {
            return this.$store.state.spotifyFrontend
        }
    },
    methods: {
        signInWithSpotify() {
            this.$store.commit('setFrontendSpotifyAuthRedirectUrl', this.redirectRoute)
            window.location.replace("https://accounts.spotify.com/authorize?client_id="+process.env.SPOTIFY_CLIENT_ID+"&response_type=code&redirect_uri="+process.env.SPOTIFY_FRONTEND_REDIRECT_URL+"&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&state=34fFs29kd09");
        },
        signOutOfSpotify() {
            this.$store.commit('wipeFrontendSpotifyData')
        }
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

/* Spotify User Info */
.spotifyUserPreviewCon {
    background-color: #FFF;
    border-radius: 60px 20px 20px 60px;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 340px;
}
.spotifyUserImg {
    height: 80px;
    width: 80px;
    min-width: 60px;
    border-radius: 50%;
}
.spotifyUserTextarea {
    padding: 10px;
}
.spotifyUserP {
    font-weight: bold;
    margin-bottom: 4px;
}
.spotifyAltInfoCon {
    display: flex;
}
.spotifyAltInfoP {
    color: #403F3F;
}
.spotifyAltInfoP:first-child {
    margin-right: 10px;
}


.spotifySignOutOverlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    background-color: var(--accent-2);
    transition: 0.2s;
    border-radius: 60px 20px 20px 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.spotifyUserPreviewCon:hover .spotifySignOutOverlay {
    opacity: 1;
}
.signOutP {
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
}
.signOutP .fas {
    margin-right: 5px;
    font-size: 18px;
}
/* Media Queries */
@media only screen and (max-width: 1024px) {
    .bannerImgCon {display: none;}
}
</style>