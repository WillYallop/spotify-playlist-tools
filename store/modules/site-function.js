const state = () => ({
    navStatus: false,
    frontendNavStatus: false

})
  
const mutations = {
    toggleNav(state) {
        state.navStatus = !state.navStatus;
    },
    toggleFrontendNav(state) {
        state.frontendNavStatus = !state.frontendNavStatus;
    }

}

export default {
    state, 
    mutations
}