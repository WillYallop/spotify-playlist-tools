const state = () => ({
    selectedAccount: false,
    accounts: [],
    locked: false
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
    },
    // Lock acount
    toggleAccountLock(state, data) {
        state.locked = data
    },
    // Set new account token
    setNewAccessToken(state, data) {
        // Update access token in account array
        let accountIndex = state.accounts.findIndex( x => x.accountId === data.accountId)
        state.accounts[accountIndex].accessToken = data.accessToken
        // Update access token in selected account
        if(state.selectedAccount.accountId === data.accountId) {
            state.selectedAccount.accessToken = data.accessToken
        }
    }

}

const actions = {
    saveNewAccount({ commit, state }, data) {
        this.$axios.post(process.env.API_URL + '/accounts', {
            playlists: data.playlistTotal,
            accountId: data.accountData.id,
            accountType: data.accountType,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            displayName: data.accountData.display_name,
            email: data.accountData.email,
            followers: data.accountData.followers.total,
            accountURL: data.accountData.external_urls.spotify,
            image: data.accountData.images[0].url,
            country: data.accountData.country
        })
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
        this.$axios.get(process.env.API_URL + '/accounts')
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
    },
    updateAccountDb({  }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(process.env.API_URL + '/accounts/update/tokens', {
                accessToken: data.accessToken,
                accountId: data.accountId,
                accountType: data.accountType
            },)
            .then((response) => {
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