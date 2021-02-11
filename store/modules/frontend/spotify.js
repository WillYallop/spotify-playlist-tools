import axios from 'axios';
import qs from 'qs';

const state = () => ({
    signedIn: false,
    code: false,
    state: false,
    tokenType: false,
    accessToken: false,
    refreshToken: false,
    redirectUrl: false,
    userData: false
})
  
const mutations = {
    fe_setSpotifyCallbackData(state, data) {
        state.state = data.state
        state.code = data.code
    },
    fe_setSpotifyTokens(state, data) {
        state.tokenType = data.tokenType
        state.accessToken = data.accessToken
        state.refreshToken = data.refreshToken
        state.signedIn = data.signedIn
    },
    fe_setNewSpotifyAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
    fe_setSpotifyAccountData(state, data) {
        state.userData = data.accountData
    },
    fe_wipeSpotifyData(state) {
        state.signedIn = false
        state.code = false
        state.state = false
        state.tokenType = false
        state.accessToken = false
        state.refreshToken = false
        state.userData = false
        state.redirectUrl = false
    },
    fe_setSpotifyAuthRedirectUrl(state, data) {
        state.redirectUrl = data
    }
}

const actions = {
    fe_getNewSpotifyTokens({ commit, dispatch, state }, data) {
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
                commit('fe_setSpotifyTokens', { 
                    signedIn: true,
                    tokenType: results.data.token_type,
                    accessToken: results.data.access_token,
                    refreshToken: results.data.refresh_token
                })
                dispatch('fe_getSpotifyUserData')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },
    fe_getSpotifyUserData({ commit, dispatch, state }, data) {
        // Header
        let config = {
            headers: {
                Authorization: state.tokenType + ' ' + state.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me', config)
        .then((results) => {
            commit('fe_setSpotifyAccountData', {
                accountData: results.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // Refresh account tokens
    fe_refreshSpotifyTokens({ commit }, data) {
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
                commit('fe_setNewSpotifyAccessToken', response.data.access_token)
                resolve(response)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            }) 
        })
    },

    // Remove tracks from playlist
    fe_removeTracksFromSpotifyPlaylist({ state, dispatch }, data) {
        return new Promise((resolve, reject) => {

            function chunkArray(chunkSize, inputArray) {
                // Spotify can only add 100 songs to a track at a time
                var perChunk = chunkSize;
                var chunkedArray = [];
    
                // Chunk tracks array into multiples of 100
                let result = inputArray.reduce((resultArray, item, index) => { 
                    const chunkIndex = Math.floor(index/perChunk)
                    if(!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }
                    resultArray[chunkIndex].push(item)
                    return resultArray
                }, []);
                chunkedArray = result
                return chunkedArray
            };
            let chunkedArray = chunkArray(99, data.tracks)

            let counter = 0;

            for(var i = 0; i < chunkedArray.length; i++) {
                counter++
                // format array into array of objects
                var tracksArray = chunkedArray[i]
                const trackUrlObjectsArray = []
                // Format track values for URL
                for(var k = 0; k < tracksArray.length; k++) {
                    var trackObj = {
                        uri: 'spotify:track:' + tracksArray[k].trackId,
                        positions: [tracksArray[k].pos - 1]
                    }
                    trackUrlObjectsArray.push(trackObj)
                }
                // Delete playlist tracks
                axios({
                    method: 'delete' ,
                    url: 'https://api.spotify.com/v1/playlists/'+data.playlistId+'/tracks',
                    data: {
                        tracks: trackUrlObjectsArray
                    },
                    headers: {
                        Authorization: 'Bearer ' + state.accessToken,
                        'Content-Type': 'application/json'
                    }
                })
                .then((result) => {
                    if(counter === chunkedArray.length) {
                        resolve(result.data.snapshot_id)
                    }
                })
                .catch((err) => {
                    if(err.response.data.error.message === 'The access token expired') {
                        // If token fails retry
                        if(data.refresh) {
                            dispatch('fe_refreshSpotifyTokens', {
                                refreshToken: state.refreshToken
                            })
                            .then((response) => {
                                dispatch('fe_removeTracksFromSpotifyPlaylist', {
                                    playlistId: data.playlistId,
                                    tracks: data.tracks,
                                    refresh: false
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        }
                    }
                })
            }
        })
    },
}

export default {
    state, 
    mutations,
    actions
}