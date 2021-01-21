const state = () => ({
    navStatus: false,
    frontendNavStatus: false,
    message: false
})
  
const mutations = {
    toggleNav(state) {
        state.navStatus = !state.navStatus;
    },
    toggleFrontendNav(state) {
        state.frontendNavStatus = !state.frontendNavStatus;
    },
    // For message 
    clearMessage(state) {
        state.message = false
    },
    setMessage(state, data) {
        state.message = data
    }

}

export default {
    state, 
    mutations
}