import axios from 'axios';

const state = () => ({
    playlistTotal: 0,
    loading: false,
    playlists: []
})
  
const mutations = {
    fe_pushPlaylist(state, data) {
        state.playlists.push(data)
    },
    fe_incrementPlaylistTotal(state) {
        state.playlistTotal++
    },
    fe_removeSpecificPlaylist(state, playlistId) {
        let index = state.playlists.findIndex( x => x.playlistId === playlistId)
        state.playlists.splice(index, 1)
    },
    fe_wipeSpotifyDuplicatePlaylistData(state) {
        state.playlistTotal = 0
        state.playlists = []
        state.loading = false
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
    fe_setSpotifyPlaylists(state, data) {
        state.playlists = data
    },
    fe_toggleSpotifyLoadingController(state, bool) {
        state.loading = bool
    },
    fe_setSpotifyPlaylistsNoDuplicates(state, playlistId) {
        let playlistIndex = state.playlists.findIndex( x => x.playlistId === playlistId)
        if(playlistIndex != -1) {
            state.playlists[playlistIndex].hasDuplicates = false
            state.playlists[playlistIndex].duplicateTracks = []
        }
    }

}

const actions = {
    // Download Spotify Playlists
    fe_downloadSpotifyPlaylists({ commit, dispatch, rootState }, data) {
        commit('fe_wipeSpotifyDuplicatePlaylistData') // reset playlist data
        commit('fe_toggleSpotifyLoadingController', true)
        // Header
        let config = {
            headers: {
                Authorization: rootState.spotifyFrontend.tokenType + ' ' + rootState.spotifyFrontend.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me/playlists', config)
        .then((response) => {
            for(var i = 0; i < response.data.items.length; i++) {
                if(response.data.items[i].owner.id === rootState.spotifyFrontend.userData.id) {
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
                        refreshToken: rootState.spotifyFrontend.refreshToken
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
    fe_loadMoreSpotifyPlaylists({ commit, dispatch, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.spotifyFrontend.accessToken
            }
        }
        axios.get(data.nextUrl, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                if(response.data.items[i].owner.id === rootState.spotifyFrontend.userData.id) {
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
                        refreshToken: rootState.spotifyFrontend.refreshToken
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
    fe_checkForAccount({ dispatch, state, rootState }) {
        axios.get(process.env.API_URL + '/frontend/spotify/account/'+rootState.spotifyFrontend.userData.id)
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
    fe_saveSpotifyAccount({ dispatch, rootState }, playlists) {
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
            spotifyId: rootState.spotifyFrontend.userData.id,
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
    fe_downloadSpotifyPlaylistTracks({ commit, dispatch, state, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.spotifyFrontend.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/playlists/'+data.playlist.playlistId+'/tracks/?market='+rootState.spotifyFrontend.userData.country, config)
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
                        refreshToken: rootState.spotifyFrontend.refreshToken
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
    fe_loadMoreTracks({ commit, dispatch, state, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.spotifyFrontend.accessToken
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
                        refreshToken: rootState.spotifyFrontend.refreshToken
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
    fe_updatePlaylistsSnapshot({ rootState }, playlist) {
        axios.post(process.env.API_URL + '/frontend/spotify/update/playlist', {
            accountId: rootState.spotifyFrontend.userData.id,
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

    // Remove track from Spotify
}

export default {
    state, 
    mutations,
    actions
}