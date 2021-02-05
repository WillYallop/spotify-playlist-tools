import axios from 'axios';
import qs from 'qs';

const state = () => ({
    code: false,
    state: false,
    tokenType: false,
    accessToken: false,
    refreshToken: false,
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
    }
}

const actions = {
    getFrontendNewSpotifyTokens({ commit, state }) {
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
            redirect_uri: process.env.SPOTIFY_FRONTEND_REDIRECT_URL
        }), config)
        .then((results) => {
            if(results.status === 200) {
                commit('setFrontendSpotifyTokens', { 
                    tokenType: results.data.token_type,
                    accessToken: results.data.access_token,
                    refreshToken: results.data.refresh_token
                })
            }
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