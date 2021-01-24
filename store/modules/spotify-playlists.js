import axios from 'axios'

const state = () => ({
    selectedPlaylist: {},
    playlists: [],

    playlistSelectLock: false
})
  
const mutations = {
    setPlaylists(state, data) {
        state.playlists = data
    },
    pushToPlaylists(state, data) {
        state.playlists.push(data)
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
    }
}

const actions = {
    loadPlaylists({ dispatch, commit, rootState }, data) {
        // Reset
        commit('resetPlaylists')

        // lock acount swap
        commit('toggleAccountLock', true)
        commit('togglePlaylistSelectLock', false)

        this.$axios.get(process.env.API_URL + '/playlists/'+rootState.accounts.selectedAccount.accountType+'/'+rootState.accounts.selectedAccount.accountId)
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
    updatePlaylists({ dispatch, commit, rootState }, data) {
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
                    followers: 0,
                    description: response.data.items[i].description
                }
                commit('pushToPlaylists', playlistObject)
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
                    followers: 0,
                    description: response.data.items[i].description
                }
                commit('pushToPlaylists', playlistObject)
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
    savePlaylistsToDb({ dispatch, commit, rootState, state }) {

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
        let playlistChunkArray = chunkArray({chunkSize: 20, inputArray: state.playlists})
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
                commit('setMessage', 'Updated playlists!')
            })
            .catch((err) => {
                console.log(err)
                // unlock acount swap
                commit('toggleAccountLock', false)
            })
        }

        this.$axios.post(process.env.API_URL + '/accounts/updated', {
            accountId: rootState.accounts.selectedAccount.accountId
        })
        .then((response) => {

        })
        .catch((err) => {
            console.log(err)
        })

    }

}

export default {
    state, 
    mutations,
    actions
}