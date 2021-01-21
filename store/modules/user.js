import axios from 'axios'

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
        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.get(process.env.API_URL + '/user', config)
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