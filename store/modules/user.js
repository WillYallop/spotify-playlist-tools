const state = () => ({
    user: false

})
  
const mutations = {
    setUserData(state, data) {
        state.user = data
    }
}

const actions = {
    getUserData({ commit }) {
        this.$axios.get(process.env.API_URL + '/user')
        .then((response) => {
            commit('setUserData', response.data.data)
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