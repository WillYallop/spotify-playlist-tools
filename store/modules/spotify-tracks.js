import axios from 'axios'

const state = () => ({
    tracks: []
})
  
const mutations = {
    // Tracks
    setTracks(state, data) {
        state.tracks = data
    },
    pushToTracks(state, data) {
        state.tracks.push(data)
    },
    resetTracks(state) {
        state.tracks = []
    }
}

const actions = {
    downloadTracks({ dispatch, commit }, data) {
        // Reset tracks
        commit('resetTracks')

        // lock acount swap
        commit('toggleAccountLock', true)
        commit('togglePlaylistSelectLock', true)

        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.get(process.env.API_URL + '/tracks/'+data.playlist.accountType+'/'+data.playlist.playlistId, config)
        .then((response) => {
            // Download new playlist tracks from Spotify API
            // Else - set saved data
            if(response.data.update) {
                commit('wipePlaylistTrackData', data.playlist.playlistId)
                dispatch('updateTracks', { playlist: data.playlist, refresh: true })
            } else {
                commit('setTracks', response.data.tracks)
                commit('setSelectedPlaylistTracks', response.data.playlistTracks)
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
            }
        })
        .catch((err) => {
            if(err.response.status != 401) {
                dispatch('updateTracks', { playlist: data.playlist, refresh: true })
            }
        })
    },
    updateTracks({ commit, dispatch, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.accounts.selectedAccount.accessToken
            }
        }
        axios.get('https://api.spotify.com/v1/playlists/'+data.playlist.playlistId+'/tracks/?market='+rootState.accounts.selectedAccount.country, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var track = {
                    trackId: response.data.items[i].track.id,
                    name: response.data.items[i].track.name,
                    popularity: response.data.items[i].track.popularity,
                    artists: response.data.items[i].track.artists,
                    duration: response.data.items[i].track.duration_ms,
                    explicit: response.data.items[i].track.explicit,
                    images: response.data.items[i].track.album.images,
                    trackPlatform: 'spotify'
                }
                commit('pushToTracks', track)
                commit('pushToPlaylistTrackData', { 
                    track: {
                        id: response.data.items[i].track.id,
                        addedAt: response.data.items[i].added_at,
                        pos: i + 1, 
                        available: response.data.items[i].track.is_playable
                    },
                    playlistId: data.playlist.playlistId
                })
            }

            if(response.data.next) {
                // Load more
                dispatch('loadMoreTracks', { playlist: data.playlist, refresh: true, nextUrl: response.data.next })
            } else {
                // Done loading more
                // Save playlists to db
                dispatch('saveTracksToDb', data.playlist)
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
                        dispatch('updateTracks', { playlist: data.playlist, refresh: false })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // It has been attempted twice and still failed
                    // Show error message
                    commit('setMessage', 'There was an issue getting tracks data.')
                    // unlock acount swap
                    commit('toggleAccountLock', false)
                    commit('togglePlaylistSelectLock', false)
                }
            } else {
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
            }
        })
    },
    loadMoreTracks({ commit, dispatch, state, rootState }, data) {
        // Header
        let config = {
            headers: {
                Authorization: 'Bearer ' + rootState.accounts.selectedAccount.accessToken
            }
        }
        axios.get(data.nextUrl, config)
        .then((response) => {
            // Loop over response playlists 
            for(var i = 0; i < response.data.items.length; i++) {
                var track = {
                    trackId: response.data.items[i].track.id,
                    name: response.data.items[i].track.name,
                    popularity: response.data.items[i].track.popularity,
                    artists: response.data.items[i].track.artists,
                    duration: response.data.items[i].track.duration_ms,
                    explicit: response.data.items[i].track.explicit,
                    images: response.data.items[i].track.album.images,
                    trackPlatform: 'spotify'
                }
                commit('pushToTracks', track)
                commit('pushToPlaylistTrackData', { 
                    track: {
                        id: response.data.items[i].track.id,
                        addedAt: response.data.items[i].added_at,
                        pos: state.tracks.length,
                        available: response.data.items[i].track.is_playable
                    },
                    playlistId: data.playlist.playlistId
                })
            }

            if(response.data.next) {
                dispatch('loadMoreTracks', { playlist: data.playlist, refresh: true, nextUrl: response.data.next })
            } else {
                // Done loading more
                // Save playlists to db
                dispatch('saveTracksToDb', data.playlist)
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
                        dispatch('loadMoreTracks', { playlist: data.playlist, refresh: false, nextUrl: data.nextUrl })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // It has been attempted twice and still failed
                    // Show error message
                    commit('setMessage', 'There was an issue getting tracks data.')
                    // unlock acount swap
                    commit('toggleAccountLock', false)
                    commit('togglePlaylistSelectLock', false)
                }
            } else {
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
            }
        })
    },
    saveTracksToDb({ commit, state, rootState }, playlist) {

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

        // Save track data
        let trackChunkArray = chunkArray({chunkSize: 100, inputArray: state.tracks})
        var chunkArrayLength = trackChunkArray.length;
        for(var i = 0; i < chunkArrayLength; i++) {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.post(process.env.API_URL + '/tracks/multiple', {
                tracks: trackChunkArray[i],
                accountId: rootState.accounts.selectedAccount.accountId
            }, config)
            .then((response) => {
                // unlock acount swap
            })
            .catch((err) => {
                console.log(err)
            })
        }

        // Save playlist track data
        let playlistTrackChunkArray = chunkArray({chunkSize: 100, inputArray: rootState.spotifyPlaylists.selectedPlaylist.tracks})
        var playlistChunkArrayLength = playlistTrackChunkArray.length;
        for(var i = 0; i < playlistChunkArrayLength; i++) {
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.post(process.env.API_URL + '/playlists/tracks', {
                chunk: i + 1,
                playlistId: playlist.playlistId,
                accountId: rootState.accounts.selectedAccount.accountId,
                accountType: 'spotify',
                playlistTrackData: playlistTrackChunkArray[i]
            }, config)
            .then((response) => {
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
                commit('setMessage', 'Updated playlist tracks!')
            })
            .catch((err) => {
                console.log(err)
                // unlock acount swap
                commit('toggleAccountLock', false)
                commit('togglePlaylistSelectLock', false)
            })
        }

    }

}

export default {
    state, 
    mutations,
    actions
}