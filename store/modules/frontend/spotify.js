import axios from 'axios';
import qs from 'qs';

const state = () => ({
    signedIn: false,
    code: false,
    state: false,
    tokenType: false,
    accessToken: false,
    refreshToken: false,

    playlistTotal: 0,
    userData: false,

    playlists: []
})
  
const mutations = {
    setFrontendSpotifyCallbackData(state, data) {
        state.state = data.state
        state.code = data.code
    },
    setFrontendSpotifyTokens(state, data) {
        state.tokenType = data.tokenType
        state.accessToken = data.accessToken
        state.refreshToken = data.refreshToken
        state.signedIn = data.signedIn
    },
    setFrontendSpotifyAccountData(state, data) {
        state.playlistTotal = data.playlistTotal
        state.userData = data.accountData
    },
    pushPlaylistToFrontendSpotify(state, data) {
        state.playlists.push(data)
    },
    wipeFrontendSpotifyData(state) {
        state.signedIn = false
        state.code = false
        state.state = false
        state.tokenType = false
        state.accessToken = false
        state.refreshToken = false
        state.playlistTotal = 0
        state.userData = false
        state.playlists = []
    }

}

const actions = {
    getFrontendNewSpotifyTokens({ commit, dispatch, state }, data) {
        // set redirect uri
        if(data === 'remove-duplicates') {
            var redirectUri = process.env.SPOTIFY_REMOVE_DUPLICATES_REDIRECT_URL
        }
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
            redirect_uri: redirectUri
        }), config)
        .then((results) => {
            if(results.status === 200) {
                commit('setFrontendSpotifyTokens', { 
                    signedIn: true,
                    tokenType: results.data.token_type,
                    accessToken: results.data.access_token,
                    refreshToken: results.data.refresh_token
                })
                dispatch('getFrontendSpotifyUserData')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getFrontendSpotifyUserData({ commit, dispatch, state }, data) {
        // Header
        let config = {
            headers: {
                Authorization: state.tokenType + ' ' + state.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me', config)
        .then((results) => {
            const userResults = results;
            axios.get('https://api.spotify.com/v1/me/playlists', config)
            .then((response) => {
                commit('setFrontendSpotifyAccountData', {
                    playlistTotal: response.data.total,
                    accountData: userResults.data,
                })
                for(var i = 0; i < response.data.items.length; i++) {
                    let playlistObj = {
                        playlistId: response.data.items[i].id,
                        name: response.data.items[i].name,
                        description: response.data.items[i].description,
                        image: response.data.items[i].images[0].url,
                        tracks: [],
                        hasDuplicates: false,
                        duplicateTracks: []
                    }
                    commit('pushPlaylistToFrontendSpotify', playlistObj)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },

}

export default {
    state, 
    mutations,
    actions
}