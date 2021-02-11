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

    playlistTotal: 0,
    userData: false,

    loading: false,

    playlists: []
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
    fe_pushPlaylist(state, data) {
        state.playlists.push(data)
    },
    fe_incrementPlaylistTotal(state) {
        state.playlistTotal++
    },
    fe_removeSpecificPlaylist(state, playlistId) {
        let index = state.playlists.findIndex( x => x.playlistId === playlistId)
        state.playlists.splice(1, index)
    },
    fe_wipeSpotifyData(state) {
        state.signedIn = false
        state.code = false
        state.state = false
        state.tokenType = false
        state.accessToken = false
        state.refreshToken = false
        state.playlistTotal = 0
        state.userData = false
        state.playlists = []
        state.redirectUrl = false
        state.loading = false
    },
    fe_setSpotifyAuthRedirectUrl(state, data) {
        state.redirectUrl = data
    },
    fe_pushToPlaylistTracks(state, data) {
        var pI = state.playlists.findIndex( x => x.playlistId === data.playlistId)  
        var trackExists = state.playlists[pI].tracks.find( x => x.trackId === data.trackData.trackId)
        if(trackExists) {
            state.playlists[pI].duplicateTracks.push(data.trackData) // Push track data to duplicates array
            state.playlists[pI].hasDuplicates = true //  Set playlist has duplicates to true
            state.playlists[pI].tracks.push(data.trackData) // push to tracks array still
            // When the last track is added, set playlist to loading true
            if(state.playlists[pI].tracks.length === state.playlists[pI].totalTracks) {
                state.playlists[pI].finishedLoading = true
                state.playlists[pI].tracks = []
            }
        } else {
            state.playlists[pI].tracks.push(data.trackData) // push to tracks array
            // When the last track is added, set playlist to loading true
            if(state.playlists[pI].tracks.length === state.playlists[pI].totalTracks) {
                state.playlists[pI].finishedLoading = true
                state.playlists[pI].tracks = []
            }
        }

        // If all playlists have loaded data, overide set the loaded value
        var allLoaded = true
        for(var i = 0; i < state.playlists.length; i++) {
            if(!state.playlists[i].finishedLoading) {
                allLoaded = false
                break
            }
        }
        state.loading = !allLoaded
    },
    fe_resetSpotifyPlaylistTracks(state, index) {
        state.playlists[index].tracks = []
    },
    fe_resetSpotifyPlaylists(state) {
        state.playlists = []
    },
    fe_setSpotifyPlaylists(state, data) {
        state.playlists = data
    },
    fe_toggleSpotifyLoadingController(state, bool) {
        state.loading = bool
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
            dispatch('fe_downloadSpotifyPlaylists', { refresh: true })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // Download Spotify Playlists
    fe_downloadSpotifyPlaylists({ commit, dispatch, state }, data) {
        commit('fe_resetSpotifyPlaylists') // reset playlist data
        commit('fe_toggleSpotifyLoadingController', true)
        // Header
        let config = {
            headers: {
                Authorization: state.tokenType + ' ' + state.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me/playlists', config)
        .then((response) => {
            for(var i = 0; i < response.data.items.length; i++) {
                if(response.data.items[i].owner.id === state.userData.id) {
                    let playlistObj = {
                        playlistId: response.data.items[i].id,
                        name: response.data.items[i].name,
                        description: response.data.items[i].description,
                        image: response.data.items[i].images[0].url,
                        tracks: [],
                        hasDuplicates: false,
                        duplicateTracks: [],
                        totalTracks: response.data.items[i].tracks.total,
                        finishedLoading: false,
                        snapshot: response.data.items[i].snapshot_id
                    }
                    commit('fe_pushPlaylist', playlistObj)
                    commit('fe_incrementPlaylistTotal')
                }
            }
            
            if(response.data.next) {
                // Load more
                dispatch('fe_loadMoreSpotifyPlaylists', { refresh: true, nextUrl: response.data.next })
            } else {
                // Done loading more
                dispatch('fe_checkForAccount')
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
                        dispatch('fe_downloadSpotifyPlaylists', { refresh: false })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            } else {
                console.log(err)
                commit('fe_toggleSpotifyLoadingController', false)
            }
        })
    },
    fe_loadMoreSpotifyPlaylists({ commit, dispatch, state }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + state.accessToken
            }
        }
        axios.get(data.nextUrl, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                if(response.data.items[i].owner.id === state.userData.id) {
                    let playlistObj = {
                        playlistId: response.data.items[i].id,
                        name: response.data.items[i].name,
                        description: response.data.items[i].description,
                        image: response.data.items[i].images[0].url,
                        tracks: [],
                        hasDuplicates: false,
                        duplicateTracks: [],
                        totalTracks: response.data.items[i].tracks.total,
                        finishedLoading: false,
                        snapshot: response.data.items[i].snapshot_id
                    }
                    commit('fe_pushPlaylist', playlistObj)
                    commit('fe_incrementPlaylistTotal')
                }
            }

            if(response.data.next) {
                // Load more
                dispatch('fe_loadMoreSpotifyPlaylists', { refresh: true, nextUrl: response.data.next })
            } else {
                // Done loading more
                dispatch('fe_checkForAccount')
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
                        dispatch('fe_loadMoreSpotifyPlaylists', { refresh: false, nextUrl: data.nextUrl })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            } else {
                console.log(err)
                commit('fe_toggleSpotifyLoadingController', false)
            }
        })
    },
    // Check account to see if spotify playlists have been changed
    fe_checkForAccount({ dispatch, state }) {
        axios.get(process.env.API_URL + '/frontend/spotify/account/'+state.userData.id)
        .then((response) => {
            if(response.data.account) {
                dispatch('fe_checkForEditedPlaylists', response.data.playlists)
            } else {
                dispatch('fe_saveSpotifyAccount', state.playlists)
            }   
        })
        .catch((err) => {
            console.log(err)
        }) 
    },
    // Create user a new spotify account doc in db
    fe_saveSpotifyAccount({ state, dispatch }, playlists) {
        let playlistArray = []
        for(var i = 0; i < playlists.length; i++) {
            var obj = {
                id: playlists[i].playlistId,
                snapshot: playlists[i].snapshot,
                hasDuplicates: playlists[i].hasDuplicates,
                duplicateTracks: playlists[i].duplicateTracks,
                beenChecked: false
            }
            playlistArray.push(obj)
        }
        // create doc
        axios.post(process.env.API_URL + '/frontend/spotify', {
            spotifyId: state.userData.id,
            playlists: playlistArray
        })
        .then((response) => {
            dispatch('fe_spotifyPlaylistTrackDownloadHandler')
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // Remove unedited playlists from array
    fe_checkForEditedPlaylists({ dispatch, state, commit }, playlistsData) {
        let newPlaylistArray = []

        for(var i = 0; i < playlistsData.length; i++) {
            let findPlaylist = state.playlists.find( x => x.playlistId === playlistsData[i].id)
            if(findPlaylist) {
                if(findPlaylist.snapshot != playlistsData[i].snapshot || playlistsData[i].hasDuplicates) {
                   newPlaylistArray.push(findPlaylist)
                }
            }
            if(i + 1 === playlistsData.length) {
                commit('fe_setSpotifyPlaylists', newPlaylistArray)
                dispatch('fe_spotifyPlaylistTrackDownloadHandler')
            }
        }
    },
    // Download Tracks
    fe_spotifyPlaylistTrackDownloadHandler({ commit, dispatch, state }) {
        // For each playlist
        for(var i = 0; i < state.playlists.length; i++) {
            // Reset playlist tracks data
            commit('fe_resetSpotifyPlaylistTracks', i)
            commit('fe_toggleSpotifyLoadingController', true)
            // Send download requests
            dispatch('fe_downloadSpotifyPlaylistTracks', {
                playlist: state.playlists[i],
                refresh: true
            })
        }
    },
    fe_downloadSpotifyPlaylistTracks({ commit, dispatch, state }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + state.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/playlists/'+data.playlist.playlistId+'/tracks/?market='+state.userData.country, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var track = {
                    trackId: response.data.items[i].track.linked_from ? response.data.items[i].track.linked_from.id : response.data.items[i].track.id,
                    name: response.data.items[i].track.name,
                    artists: response.data.items[i].track.artists,
                    available: response.data.items[i].track.is_playable,
                    addedAt: response.data.items[i].added_at,
                    pos: i + 1
                }
                commit('fe_pushToPlaylistTracks', {
                    trackData: track,
                    playlistId: data.playlist.playlistId
                })

                if(!response.data.next && i + 1 === response.data.items.length) {
                    var pI = state.playlists.findIndex( x => x.playlistId === data.playlist.playlistId)  
                    if(state.playlists[pI].tracks.length === state.playlists[pI].totalTracks) {
                        dispatch('fe_updatePlaylistsSnapshot', state.playlists[pI])
                    }
                }
            }

            if(response.data.next) {
                // Load more
                dispatch('fe_loadMoreTracks', { playlist: data.playlist, refresh: true, nextUrl: response.data.next })
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
                        dispatch('fe_downloadSpotifyPlaylistTracks', { playlist: data.playlist, refresh: false })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            } else {
                console.log(err)
                commit('fe_toggleSpotifyLoadingController', false)
            }
        })
    },
    fe_loadMoreTracks({ commit, dispatch, state }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + state.accessToken
            }
        }
        axios.get(data.nextUrl, config)
        .then((response) => {
            let playlistIndex = state.playlists.findIndex( x => x.playlistId === data.playlist.playlistId)
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var track = {
                    trackId: response.data.items[i].track.linked_from ? response.data.items[i].track.linked_from.id : response.data.items[i].track.id,
                    name: response.data.items[i].track.name,
                    artists: response.data.items[i].track.artists,
                    available: response.data.items[i].track.is_playable,
                    addedAt: response.data.items[i].added_at,
                    pos: state.playlists[playlistIndex].tracks.length
                }
                commit('fe_pushToPlaylistTracks', {
                    trackData: track,
                    playlistId: data.playlist.playlistId
                })


                if(!response.data.next && i + 1 === response.data.items.length) {
                    var pI = state.playlists.findIndex( x => x.playlistId === data.playlist.playlistId)  
                    if(state.playlists[pI].tracks.length === state.playlists[pI].totalTracks) {
                        dispatch('fe_updatePlaylistsSnapshot', state.playlists[pI])
                    }
                }
            }

            if(response.data.next) {
                dispatch('fe_loadMoreTracks', { playlist: data.playlist, refresh: true, nextUrl: response.data.next })
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
                        dispatch('fe_loadMoreTracks', { playlist: data.playlist, refresh: false, nextUrl: data.nextUrl })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            } else {
                console.log(err)
                commit('fe_toggleSpotifyLoadingController', false)
            }
        })
    },

    // Update db spotify accounts playlists that have no duplicates but different snapshot id
    fe_updatePlaylistsSnapshot({ commit, dispatch, state }, playlist) {
        axios.post(process.env.API_URL + '/frontend/spotify/update/playlist', {
            accountId: state.userData.id,
            playlistId: playlist.playlistId,
            snapshot: playlist.snapshot,
            hasDuplicates: playlist.hasDuplicates,
            duplicateTracks: playlist.duplicateTracks,
            beenChecked: true
        })
        .then((response) => {

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
    }
}

export default {
    state, 
    mutations,
    actions
}