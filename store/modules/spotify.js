import axios from 'axios';
import qs from 'qs';

const state = () => ({
    code: false,
    state: false
})
  
const mutations = {
    setSpotifyCallbackData(state, data) {
        state.state = data.state
        state.code = data.code
    },
    wipeCallbackData(state) {
        state.state = false
        state.code = false
    }
}

const actions = {
    getNewSpotifyTokens({ commit, dispatch, state }) {
        // Header
        let config = {
            headers: {
                Authorization: 'Basic ' + process.env.SPOTIFY_CLIENT_AUTH,
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        }
        axios.post('https://accounts.spotify.com/api/token', qs.stringify({
            grant_type: 'authorization_code',
            code: state.code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URL
        }), config)
        .then((results) => {
            if(results.status === 200) {
                dispatch('getNewSpotifyUserData', { 
                    tokenType: results.data.token_type,
                    accessToken: results.data.access_token,
                    refreshToken: results.data.refresh_token
                })
            }
        })
        .catch((err) => {
            console.log(err)
            commit('logOut')
        })
    },
    getNewSpotifyUserData({ commit, dispatch }, data) {
        // Header
        let config = {
            headers: {
                Authorization: data.tokenType + ' ' + data.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me', config)
        .then((results) => {
            const userResults = results;
            axios.get('https://api.spotify.com/v1/me/playlists', config)
            .then((response) => {
                let obj = {
                    playlistTotal: response.data.total,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    accountData: userResults.data,
                    accountType: 'spotify'
                }
                dispatch('saveNewAccount', obj)
                commit('wipeCallbackData')
                this.$router.push('/settings')
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },

    // Refresh account tokens
    refreshTokens({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            let tokenHeader = {
                headers: {
                    Authorization: 'Basic '+ process.env.SPOTIFY_CLIENT_AUTH, 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
            // body
            var requestBody = {
                grant_type: 'refresh_token',
                refresh_token: data.refreshToken
            }
            axios.post('https://accounts.spotify.com/api/token', qs.stringify(requestBody), tokenHeader)
            .then((response) => {
                commit('setNewAccessToken', {
                    accessToken: response.data.access_token,
                    accountId: data.accountId
                })
                dispatch('updateAccountDb', {
                    accessToken: response.data.access_token,
                    accountId: data.accountId,
                    accountType: 'spotify'
                })
                .then((response2) => {
                    resolve(response)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                }) 
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            }) 
        })
    }

}

export default {
    state, 
    mutations,
    actions
}