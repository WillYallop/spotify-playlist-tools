<template>
    <div class="userInfoCon"> 
        <div v-if="selectedAccount">
            <div class="userInfoHeader">
                <img :src="selectedAccount.image" class="currentAccountPP">
                <div class="switchAccountController">

                    <div v-if="accounts.length > 1" class="altAccountsCon">
                        <button v-on:click="$store.commit('selectAccount', accountSwitchIndicator)" class="altAccountImg"><img :src="accountSwitchIndicator.image"></button>
                    </div>

                    <button class="switchAccountBtn" ref="switchAccountBtn" v-on:click="showAltAccounts = !showAltAccounts"><fa class="fas" :icon="['fa', 'ellipsis-h']"/></button>
                </div>

                <!-- Alt accounts dropdown -->
                <div v-if="showAltAccounts" class="altAccDropdownCon" v-closable="{exclude: ['switchAccountBtn'], handler: 'closeAltAccountDropdown'}">
                    <Simplebar class="altAccInner">
                        <!-- Selected account -->
                        <div class="altAccRow">
                            <div class="altAccRowInner">
                                <div class="leftCol">
                                    <img :src="selectedAccount.image" class="altAccImg">
                                    <div class="altAccTextarea">
                                        <p class="altAccNameP">{{selectedAccount.displayName}}</p>
                                        <p class="altAccFollowersP">{{selectedAccount.followers}} followers</p>
                                    </div>
                                </div>
                                <fa class="fas" :icon="['fa', 'check']"/>
                            </div>
                        </div>
                        <!-- All accounts minus selected -->
                        <div class="altAccRow" :key="account._id" v-for="account in accounts">
                            <div v-if="account._id != selectedAccount._id" class="altAccRowInner" v-on:click="$store.commit('selectAccount', account)">
                                <div class="leftCol">
                                    <img :src="account.image" class="altAccImg">
                                    <div class="altAccTextarea">
                                        <p class="altAccNameP">{{account.displayName}}</p>
                                        <p class="altAccFollowersP">{{account.followers}} followers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Simplebar>
                    <button class="addAccountBtn" v-on:click="addSpotifyAccount"><fa class="fas" :icon="['fab', 'spotify']"/>Add New Spotify</button>
                </div>

            </div>
            <div class="userInfoTextarea">
                <p class="spotifyUsername">{{selectedAccount.displayName}}</p>
                <p class="spotifyInfoP" v-if="actions"><span style="font-weight:bold;">{{actions}}</span> Actions Remaining</p>
                <div class="spotifyInfoPCon">
                    <p class="spotifyInfoP"><span style="font-weight:bold;">{{selectedAccount.followers}}</span> Followers</p>
                    <p class="spotifyInfoP"><span style="font-weight:bold;">{{selectedAccount.playlists}}</span> Playlists</p>
                </div>
            </div>
        </div>
        <div v-else class="noAccounts" v-on:click="addSpotifyAccount">
            <fa class="fas" :icon="['fab', 'spotify']"/>
            <p class="addAccount">Link a Spotify Account!</p>
        </div>
    </div>
</template>

<script>
// Componenets
import Simplebar from 'simplebar-vue'

export default {
    data() {
        return {
            showAltAccounts: false
        }
    },
    mounted() {
        this.$store.dispatch('getAccounts')
    },
    components: {
        Simplebar
    },
    computed: {
        actions() {
            return this.$store.state.actionHandler.actions
        },
        accounts() {
            return this.$store.state.accounts.accounts
        },
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
        accountSwitchIndicator() {
            let obj = this.accounts.find(o => o._id != this.selectedAccount._id);
            return obj
        }
    },
    methods: {
        addSpotifyAccount() {
            window.location.replace("https://accounts.spotify.com/authorize?client_id="+process.env.SPOTIFY_CLIENT_ID+"&response_type=code&redirect_uri="+process.env.SPOTIFY_REDIRECT_URL+"&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&state=34fFs29kd09");
        },
        closeAltAccountDropdown() {
            this.showAltAccounts = false
        }
    }
}
</script>

<style scoped>
.userInfoCon {
    width: 100%;
    padding: 20px;
}
/* Header */
.userInfoHeader {
    width: 100%;
    position: relative;
} 
.currentAccountPP {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    min-width: 50px;
}
/* Swap Account */
.switchAccountController {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
}
.altAccountsCon {
    display: flex;
}
.altAccountImg {
    height: 30px;
    width: 30px;
    padding: 0;
    border-radius: 50%;
    border: none;
    margin-right: 5px;
    cursor: pointer;
    overflow: hidden;
} 
.altAccountImg img {
    height: 30px;
    width: 30px;
    object-fit: cover;
}
.switchAccountBtn {
    height: 30px;
    width: 30px;
    border: 1px solid var(--accent-1);
    background-color: var(--background-2);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switchAccountBtn .fas {
    color: var(--accent-1);
    transition: 0.2s;
}
.switchAccountBtn:hover {
    background-color: var(--accent-1);
}
.switchAccountBtn:hover .fas {
    color: #FFF;
}

/* Info Area */
.userInfoTextarea {
    width: 100%;
    margin-top: 5px;
} 
.spotifyUsername {
    font-size: 14px;
    font-weight: bold;
}
.spotifyInfoPCon {
    display: flex;
} 
.spotifyInfoP {
    font-size: 14px;
    margin-right: 10px;
    margin-top: 2px;
}

/* No Accounts */
.noAccounts {
    padding: 20px;
    height: 120px;
    background-color: var(--accent-2);
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.noAccounts:hover {
    background-color: var(--accent-2-hover);
}
.noAccounts .fas {
    color: #FFF;
    font-size: 30px;
}
.addAccount {
    color: #FFF;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}

/* Alt account dropdown */
.altAccDropdownCon {
    background-color: #2E3135;
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
} 
.altAccInner {

    max-height: 100px;
} 
.altAccRow {
    width: 100%;
} 

.altAccRowInner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
} 
.altAccRowInner:hover {
    background-color: #222427;
}
.altAccRowInner .fas {
    color: var(--accent-2);
    font-size: 14px;
}
.leftCol {
    display: flex;
    align-items: center;
}
.altAccImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 50%;
} 
.altAccTextarea {
    padding-left: 5px;
} 
.altAccNameP {
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
} 
.altAccFollowersP {
    font-size: 14px;
    color: #DFE0E1;
}
.addAccountBtn {
    padding: 10px 40px;
    width: 100%;
    background-color: var(--accent-2);
    transition: 0.2s;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
}
.addAccountBtn:hover {
    background-color: var(--accent-2-hover);
}
.addAccountBtn .fas {
    margin-right: 5px;
}
</style>

<style>
.altAccInner .simplebar-scrollbar:before {
  background: #FFF;
}
</style>