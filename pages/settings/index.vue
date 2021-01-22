<template>
    <div class="appPageCon">
        <!-- Usage Breakdown -->
        <UsageBreakdown/>
        <!-- Settings Container -->
        <div class="settingsCon appPageWrapper">

            <!-- Connected Accounts -->
            <div class="settingsSectCon">
                <InfoSection/> 
            </div>

            <!-- Connect New Account -->
            <div class="settingsSectCon">
                <div class="settingsSectHeader">
                    <p class="sectTitleP">Connected New Account</p>
                    <p class="sectSubTitleP"><span class="boldify">IMPORTANT:</span> When adding a new account if you are already logged into Spotify or Apple Music on your browser it will automatically link the account. If this is not the account you want to add you must clear your browsers cache or complete this task in an incognito window.</p>
                </div>
                <div class="accountBtnCon">
                    <button class="addAccountBtn spotifyBtn" v-on:click="addSpotifyAccount"><fa class="fas" :icon="['fab', 'spotify']"/>Spotify</button>
                </div>
            </div>
            
            <!-- Connected Accounts -->
            <div v-if="accounts.length > 0" class="settingsSectCon">
                <div class="settingsSectHeader">
                    <p class="sectTitleP">Your Accounts</p>
                    <p class="sectSubTitleP">Manage your music platform accounts.</p>
                </div>
                <ConnectedAccontsList/>
            </div>
            
        </div>
    </div>
</template>

<script>
// Components
import UsageBreakdown from '@/components/global/app/UsageBreakdown'
import InfoSection from '@/components/app/settings/InfoSection'
import ConnectedAccontsList from '@/components/app/settings/ConnectedAccontsList'

export default {
    layout: 'app',
    data() {
        return {

        }
    },
    components: {
        UsageBreakdown,
        InfoSection,
        ConnectedAccontsList
    },
    computed: {
        accounts() {
            return this.$store.state.accounts.accounts
        }
    },
    methods: {
        addSpotifyAccount() {
            window.location.replace("https://accounts.spotify.com/authorize?client_id="+process.env.SPOTIFY_CLIENT_ID+"&response_type=code&redirect_uri="+process.env.SPOTIFY_REDIRECT_URL+"&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&state=34fFs29kd09");
        },
    }
}
</script>

<style scoped>
.settingsCon {
    margin-top: -40px;
    width: 100%;
    z-index: 10;
    position: relative;
} 
.settingsSectCon {
    background-color: var(--background-2);
    border: 1px solid var(--border);
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}
.settingsSectCon:last-child {
    margin-bottom: 0;
}
.settingsSectHeader {
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--border);
}
.sectTitleP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
    margin-bottom: 2px;
}
.sectSubTitleP {
    font-size: 14px;
    color: var(--body-text);
    max-width: 1000px;
}

/* Add account */
.accountBtnCon {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.addAccountBtn {
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 10px 40px;
    background-color: var(--background-1);
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    color: var(--title-text);
}
.addAccountBtn .fas {
    margin-right: 5px;
}
.spotifyBtn:hover {
    background-color: #1ED760;
    color: #FFF;
}
.spotifyBtn:hover .fas {
    color: #FFF;
}
.spotifyBtn .fas {
    color: #1ED760;
    transition: 0.2s;
}
.appleBtn:hover {
    background-color: #FF4444;
    color: #FFF;
}
.appleBtn:hover .fas {
    color: #FFF;
}
.appleBtn .fas {
    color: #FF4444;
    transition: 0.2s;
}
</style>
