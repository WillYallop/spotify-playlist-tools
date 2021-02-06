const state = () => ({
    actions: false,
    monitorPlaylists: false,
    scheduleTracks: false,
    schedulePlaylists: false
})
  
const mutations = {
    setActions(state, data) {
        state.actions  = data.actions
        state.monitorPlaylists  = data.monitorPlaylists
        state.scheduleTracks  = data.scheduleTracks
        state.schedulePlaylists = data.schedulePlaylists
    }
}

const actions = {
    getActions({ commit }) {
        this.$axios.get(process.env.API_URL + '/user/actions')
        .then((response) => {
            let actionInfo = {
                actions: response.data.actions,
                monitorPlaylists: response.data.monitorPlaylists,
                scheduleTracks: response.data.scheduleTracks,
                schedulePlaylists: response.data.schedulePlaylists
            }
            commit('setActions', actionInfo)
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