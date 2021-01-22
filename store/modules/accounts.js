import axios from 'axios';

const state = () => ({
    selectedAccount: false,
    accounts: []
})
  
const mutations = {
    // selected account
    selectAccount(state, data) {
        state.selectedAccount = data
    },
    // accounts 
    setAccountsData(state, data) {
        state.accounts = data
    },
    addNewAccount(state, data) {
        state.accounts.push(data)
    }

}

const actions = {
    saveNewAccount({ commit, state }, data) {
        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.post(process.env.API_URL + '/accounts', {
            playlists: data.playlistTotal,
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
            // If this is the first load, set the selected account
            if(state.accounts.length === 0) {
                commit('addNewAccount', response.data)
                commit('selectAccount', state.accounts[0])
            } else {
                commit('addNewAccount', response.data)
            }
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
    getAccounts({ commit, state }) {
        let config = {
            headers: {
                'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                'Authorization': this.$auth.strategy.token.get()
            }
        }
        axios.get(process.env.API_URL + '/accounts', config)
        .then((response) => {
            // If this is the first load, set the selected account
            if(state.accounts.length === 0) {
                commit('setAccountsData', response.data)
                commit('selectAccount', state.accounts[0])
            } else {
                commit('setAccountsData', response.data)
            }
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