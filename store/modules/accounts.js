import axios from 'axios';

const state = () => ({
    accounts: []
})
  
const mutations = {
    setAccountsData(state, data) {
        state.accounts = data
    },
    addNewAccount(state, data) {
        state.accounts.push(data)
    }

}

const actions = {
    saveNewAccount({ commit }, data) {
        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.post(process.env.API_URL + '/accounts', {
            accountId: data.accountData.id,
            accountType: data.accountType,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            displayName: data.accountData.display_name,
            email: data.accountData.email,
            followers: data.accountData.followers.total,
            accountURL: data.accountData.external_urls.spotify,
            image: data.accountData.images[0].url
        }, config)
        .then((response) => {
            commit('addNewAccount', response.data)
            commit('setMessage', 'New Spotify account successfully added!')
        })
        .catch((err) => {
            if(err.response.status === 409) {
                commit('setMessage', 'Account already added! Clear your cache to add a new account!')
            } else {
                commit('setMessage', 'There was an error adding your account!')
            }
        })
    },
    getAccounts({ commit }) {
        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.get(process.env.API_URL + '/accounts', config)
        .then((response) => {
            commit('setAccountsData', response.data)
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