import axios from 'axios'

const state = () => ({
    selectedPlaylist: {},
    playlists: [],
    updatedPlaylists: [],
    playlistSelectLock: false,
    playlist: {}
})
  
const mutations = {
    setPlaylists(state, data) {
        state.playlists = data
    },
    pushToPlaylists(state, data) {
        state.playlists.push(data)
    },
    pushToUpdatedPlaylists(state, data) {
        state.updatedPlaylists.push(data)
    },
    resetUpdatedPlaylists(state) {
        state.updatedPlaylists = []
    },
    resetPlaylists(state) {
        state.playlists = []
    },
    resetSelectedPlaylist(state) {
        state.selectedPlaylist = {}
    },
    // Set playlist tracks
    setSelectedPlaylistTracks(state, data) {
        state.selectedPlaylist.tracks = data
    },
    // Toggle playlist select lock
    togglePlaylistSelectLock(state, data) {
        state.playlistSelectLock = data
    },
    // Set and update selectPlaylist data
    selectPlaylist(state, data) {
        state.selectedPlaylist = data
    },
    // Wipe track data from playlist
    wipePlaylistTrackData(state, playlistId) {
        state.selectedPlaylist.tracks = []
    },
    pushToPlaylistTrackData(state, data) {
        state.selectedPlaylist.tracks.push(data.track)
        state.playlist.tracks.push(data.track)
    },

    // For /manager/:playlistId
    setSinglePlaylist(state, data) {
        state.playlist = data
    },
    resetSinglePlaylist(state) {
        this.state.playlist = {}
    },
    setSinglePlaylistTracks(state, data) {
        state.playlist.tracks = data
    },
    updateSinglePlaylistTrack(state, data) {
        let fromIndex = data.fromIndex
        let toIndex = data.toIndex

        if(fromIndex < toIndex) {
            state.playlist.tracks.splice(toIndex+1, 0, state.playlist.tracks[fromIndex]);
            state.playlist.tracks.splice(fromIndex, 1);
        } else {
            state.playlist.tracks.splice(toIndex, 0, state.playlist.tracks[fromIndex]);
            state.playlist.tracks.splice(fromIndex+1, 1);
        }
    },
    spliceSingplePlaylistTrack(state, index) {
        state.playlist.tracks.splice(index, 1);
    },
    wipeSinglePlaylistTrackData(state) {
        state.playlist.tracks = []
    }
}

const actions = {
    // For /manager
    loadPlaylists({ dispatch, commit, rootState }, data) {
        // Reset
        commit('resetPlaylists')

        // lock acount swap
        commit('toggleAccountLock', true)
        commit('togglePlaylistSelectLock', false)

        this.$axios.get(process.env.API_URL + '/playlists/multiple/'+rootState.accounts.selectedAccount.accountType+'/'+rootState.accounts.selectedAccount.accountId+'/0/15')
        .then((response) => {
            // Download new playlist data from Spotify API
            // Else - set saved data
            if(response.data.updatePlaylist) {
                dispatch('updatePlaylists', { user: data.user, refresh: true })
            } else {
                commit('setPlaylists', response.data.playlists)
                // unlock acount swap
                commit('toggleAccountLock', false)
            }
        })
        .catch((err) => {
            if(err.response.status != 401) {
                dispatch('updatePlaylists', { user: data.user, refresh: true })
            }
        })
    },
    // Update playlist via spotify api
    updatePlaylists({ dispatch, commit, rootState }, data) {

        commit('resetUpdatedPlaylists')

        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.accounts.selectedAccount.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/me/playlists', config)
        .then((response) => {
            
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var playlistObject = {
                    userId: data.user._id,
                    accountId: rootState.accounts.selectedAccount.accountId,
                    playlistId: response.data.items[i].id, 
                    accountType: 'spotify',
                    tracks: [],
                    name: response.data.items[i].name,
                    image: response.data.items[i].images[0].url,
                    description: response.data.items[i].description
                }
                commit('pushToUpdatedPlaylists', playlistObject)
            }

            if(response.data.next) {
                // Load more
                dispatch('loadMorePlaylists', { refresh: true, user: data.user, nextUrl: response.data.next })
            } else {
                // Done loading more
                // Save playlists to db
                dispatch('savePlaylistsToDb')
            }
        })
        .catch((err) => {
            if(err.response.data.error.message === 'The access token expired') {
                // If token fails retry
                if(data.refresh) {
                    dispatch('refreshTokens', {
                        refreshToken: rootState.accounts.selectedAccount.refreshToken,
                        accountId: rootState.accounts.selectedAccount.accountId
                    })
                    .then((response) => {
                        dispatch('updatePlaylists', { refresh: false, user: data.user })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // It has been attempted twice and still failed
                    // Show error message
                    commit('setMessage', 'There was an issue getting playlist data.')
                    // unlock acount swap
                    commit('toggleAccountLock', false)
                }
            } else {
                // unlock acount swap
                commit('toggleAccountLock', false)
            }
        })
    },
    loadMorePlaylists({ dispatch, commit, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.accounts.selectedAccount.accessToken
            }
        }
        axios.get(nextUrl, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var playlistObject = {
                    userId: data.user._id,
                    accountId: rootState.accounts.selectedAccount.accountId,
                    playlistId: response.data.items[i].id, 
                    accountType: 'spotify',
                    tracks: [],
                    name: response.data.items[i].name,
                    image: response.data.items[i].images[0].url,
                    description: response.data.items[i].description
                }
                commit('pushToUpdatedPlaylists', playlistObject)
            }

            if(response.data.next) {
                // Load more
                dispatch('loadMorePlaylists', { refresh: true, user: data.user, nextUrl: response.data.next })
            } else {
                // Done loading more
                // Save playlists to db
                dispatch('savePlaylistsToDb')
            }

        })
        .catch((err) => {
            if(err.response.data.error.message === 'The access token expired') {
                // If token fails retry
                if(data.refresh) {
                    dispatch('refreshTokens', {
                        refreshToken: rootState.accounts.selectedAccount.refreshToken,
                        accountId: rootState.accounts.selectedAccount.accountId
                    })
                    .then((response) => {
                        this.loadMorePlaylists(nextUrl)
                        dispatch('loadMorePlaylists', { refresh: false, user: data.user, nextUrl: data.nextUrl })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // It has been attempted twice and still failed
                    // Show error message
                    commit('setMessage', 'There was an issue getting playlist data.')
                    // unlock acount swap
                    commit('toggleAccountLock', false)
                }
            } else {
                // unlock acount swap
                commit('toggleAccountLock', false)
            }
        })
    },
    savePlaylistsToDb({ commit, dispatch, rootState, state }) {

        function chunkArray(data) {
            var perChunk = data.chunkSize;
            var chunkedArray = [];
            // Chunk tracks array into multiples of 100
            let result = data.inputArray.reduce((resultArray, item, index) => { 
                const chunkIndex = Math.floor(index/perChunk)
                if(!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [] // start a new chunk
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, []);
            chunkedArray = result
            return chunkedArray
        }

        // Save playlists
        let playlistChunkArray = chunkArray({chunkSize: 20, inputArray: state.updatedPlaylists})
        var chunkArrayLength = playlistChunkArray.length;
        for(var i = 0; i < chunkArrayLength; i++) {
            this.$axios.post(process.env.API_URL + '/playlists', {
                playlists: playlistChunkArray[i],
                accountId: rootState.accounts.selectedAccount.accountId,
                accountType: 'spotify'
            })
            .then((response) => {
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
                commit('setMessage', 'Updated playlists!')
            })
            .catch((err) => {
                console.log(err)
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
            })
        }

        this.$axios.post(process.env.API_URL + '/accounts/updated', {
            accountId: rootState.accounts.selectedAccount.accountId
        })
        .then((response) => {
            dispatch('loadPlaylists', { user: rootState.user.user })
        })
        .catch((err) => {
            console.log(err)
        })

    },
    // For /manage/:playlistId
    loadSinglePlaylist({ dispatch, commit, rootState }, data) {
        // lock acount swap
        commit('toggleAccountLock', true)

        this.$axios.get(process.env.API_URL + '/playlists/single/'+rootState.accounts.selectedAccount.accountType+'/'+rootState.accounts.selectedAccount.accountId+'/'+data.playlistId)
        .then((response) => {
            // Download new playlist data from Spotify API
            // Else - set saved data
            if(response.data.updatePlaylist) {
                dispatch('updateSinglePlaylist', { user: data.user, playlistId: data.playlistId, refresh: true })
            } else {
                commit('setSinglePlaylist', response.data.playlist)
                commit('toggleAccountLock', false)
                dispatch('downloadTracks', {
                    playlist: {
                        playlistId: data.playlistId,
                        accountType: 'spotify'
                    }
                })
            }
        })
        .catch((err) => {
            if(err.response.status != 401) {
                dispatch('updateSinglePlaylist', { user: data.user, playlistId: data.playlistId, refresh: true })
            }
        })  
    },
    updateSinglePlaylist({ dispatch, commit, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.accounts.selectedAccount.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/playlists/'+data.playlistId+'/?fields=id,name,images,followers,description', config)
        .then((response) => {
            
            var playlistObject = {
                userId: data.user._id,
                accountId: rootState.accounts.selectedAccount.accountId,
                playlistId: response.data.id, 
                accountType: 'spotify',
                tracks: [],
                name: response.data.name,
                image: response.data.images[0].url,
                followers: response.data.followers.total,
                description: response.data.description
            }
            commit('setSinglePlaylist', playlistObject)
            // Save playlists to db
            dispatch('saveSinglePlaylistToDb')
        })
        .catch((err) => {
            if(err.response.data.error.message === 'The access token expired') {
                // If token fails retry
                if(data.refresh) {
                    dispatch('refreshTokens', {
                        refreshToken: rootState.accounts.selectedAccount.refreshToken,
                        accountId: rootState.accounts.selectedAccount.accountId
                    })
                    .then((response) => { 
                        dispatch('updateSinglePlaylist', { refresh: false, user: data.user, playlistId: data.playlistId })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // It has been attempted twice and still failed
                    // Show error message
                    commit('setMessage', 'There was an issue getting playlist data.')
                    // unlock acount swap
                    commit('toggleAccountLock', false)
                }
            } else {
                // unlock acount swap
                commit('toggleAccountLock', false)
            }
        })
    },
    saveSinglePlaylistToDb({ commit, dispatch, rootState, state }) {
        this.$axios.post(process.env.API_URL + '/playlists/single', {
            playlist: state.playlist,
            accountId: rootState.accounts.selectedAccount.accountId,
            accountType: 'spotify'
        })
        .then((response) => {
            // unlock acount swap
            dispatch('downloadTracks', {
                playlist: {
                    playlistId: state.playlist.playlistId,
                    accountType: 'spotify'
                }
            })
            commit('toggleAccountLock', false)
            commit('setMessage', 'Updated playlist!')
        })
        .catch((err) => {
            console.log(err)
            // unlock acount swap
            commit('toggleAccountLock', false)
        })

    }
}

export default {
    state, 
    mutations,
    actions
}