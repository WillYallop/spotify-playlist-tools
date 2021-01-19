const state = () => ({
    navStatus: false

})
  
const mutations = {
    toggleNav(state) {
        state.navStatus = !state.navStatus;
    }

}

export default {
    state, 
    mutations
}