<template>
    <div>
        <SecondaryBanner
        :title="'Remove Duplicate Playlist Tracks'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim.'"
        :redirectRoute="'/spotify/remove-duplicates'"/>
        <InfoRow/>

        <div class="pageWrapper">
            
            <!-- No Spotify Account -->
            <div v-if="!spotifyFrontendData.signedIn" class="signIntoSpotifyCon" v-on:click="signInWithSpotify">
                <fa class="fas" :icon="['fab', 'spotify']"/>
                <p class="addAccount">Log In With Spotify</p>
            </div>

            <!-- Spotify Account Linked -->
            <div v-else>
                <!-- Data Loading -->
                <div v-if="spotifyDuplicatesData.loading" class="playlistDataLoadingCon">
                   <img class="playlistsLoadingImg" src="../../../assets/images/frontend/loadingIllustration.svg" alt="Playlists Loading">
                   <p class="playlistLoadingTitleP">Checking Playlist {{totalPlaylistsLoaded + 1}}/{{spotifyDuplicatesData.playlists.length}} <img src="../../../assets/images/loadingIndicator.gif" class="loadingIndicatorImg"></p>
                </div>
                <!-- Loaded Data -->
                <div v-else>
                    <!-- No Duplicates -->
                    <div v-if="playlistsWithDuplicates.length === 0" class="pageContentCon">
                        <div class="noDuplicatesCon">
                            <img src="../../../assets/images/frontend/frontendSuccessImg.svg" alt="No duplicate trakcs in your playlists" class="noDuplicatesImg">
                            <p class="noDuplicatesTitleP">Well Done Melody Melon!</p>
                            <p class="noDuplicatesBodyP">None of your <span class="boldify">{{spotifyDuplicatesData.playlistTotal}}</span> playlists contain duplicate tracks! You're a playlist master!</p>
                            <button class="reCheckDuplicatesBtn">Re-Check Playlists</button>
                        </div>
                    </div>
                    <!-- Duplicates -->
                    <div v-else class="pageContentCon">
                        <RemoveDuplicates
                        :playlists="playlistsWithDuplicates"/>
                    </div>
                </div>
            </div>

        </div>
        <FrontendFooter/>
    </div>
</template>

<script>
import SecondaryBanner from '@/components/global/frontend/SecondaryBanner'
import InfoRow from '@/components/frontend/removeDuplicates/InfoRow'
import FrontendFooter from '@/components/global/frontend/FrontendFooter'
import RemoveDuplicates from '@/components/frontend/removeDuplicates/RemoveDuplicates'

export default {
    colorMode: 'light',
    middleware: 'guest-only',
    data() {
        return {

        }
    },
    components: {
        SecondaryBanner,
        InfoRow,
        FrontendFooter,
        RemoveDuplicates

    },
    computed: {
        spotifyFrontendData() {
            return this.$store.state.spotifyFrontend
        },
        spotifyDuplicatesData() {
            return this.$store.state.fe_spotifyDuplicates
        },
        playlistsWithDuplicates() {
            if(this.spotifyFrontendData.signedIn) {
                let array = []
                for(var i = 0; i < this.spotifyDuplicatesData.playlists.length; i++) {
                    if(this.spotifyDuplicatesData.playlists[i].hasDuplicates) {
                        array.push(this.spotifyDuplicatesData.playlists[i])
                    }
                }
                return array
            }
        },
        totalPlaylistsLoaded() {
            if(this.spotifyFrontendData.signedIn) {
                let count = 0;
                for(var i = 0; i < this.spotifyDuplicatesData.playlists.length; i++) {
                    if(this.spotifyDuplicatesData.playlists[i].finishedLoading) {
                        count++
                    }
                }
                return count
            }
        }
    },
    mounted() {
        if(this.spotifyFrontendData.signedIn) {
            this.$store.dispatch('fe_downloadSpotifyPlaylists', {
                refresh: true
            })
        }
    },
    methods: {
        signInWithSpotify() {
            this.$store.commit('fe_setSpotifyAuthRedirectUrl', '/spotify/remove-duplicates')
            window.location.replace("https://accounts.spotify.com/authorize?client_id="+process.env.SPOTIFY_CLIENT_ID+"&response_type=code&redirect_uri="+process.env.SPOTIFY_FRONTEND_REDIRECT_URL+"&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative&state=34fFs29kd09")
        }
    }
}
</script>

<style scoped>
.pageWrapper {
    padding-top: 0;
    padding-bottom: 0;
}

/* No Account */
.signIntoSpotifyCon {
    width: 100%;
    height: 400px;
    background-color: var(--accent-2);
    margin-top: -20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
    box-shadow: 0px 11px 29px rgba(0, 0, 0, 0.03);
}
.signIntoSpotifyCon:hover {
    background-color: var(--accent-2-hover);
}
.signIntoSpotifyCon .fas {
    color: #FFF;
    font-size: 30px;
}
.addAccount {
    color: #FFF;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}

/* Page Content */
.pageContentCon {
    margin-top: -20px;
    width: 100%;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 11px 29px rgba(0, 0, 0, 0.03);
}
/* No Duplicates */
.noDuplicatesCon {
    width: 100%;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
} 
.noDuplicatesImg {
    width: 80%;
    max-width: 250px;
} 
.noDuplicatesTitleP {
    font-weight: bold;
    margin: 20px 0 5px;
} 
.noDuplicatesBodyP {
    max-width: 350px;
}
.reCheckDuplicatesBtn {
    background-color: var(--accent-2);
    padding: 10px 40px;
    border-radius: 10px;
    border: none;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
    cursor: pointer;
    transition: 0.2s;
}
.reCheckDuplicatesBtn:hover {
    background-color: var(--accent-2-hover);
}

/* Loading */
.playlistDataLoadingCon {
    margin-top: -20px;
    width: 100%;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 11px 29px rgba(0, 0, 0, 0.03);
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
} 
.playlistsLoadingImg {
    width: 80%;
    max-width: 250px;
} 
.playlistLoadingTitleP {
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    display: flex;
    align-items: center;
} 
.loadingIndicatorImg {
    height: 16px;
    margin-left: 10px;
}
</style>
