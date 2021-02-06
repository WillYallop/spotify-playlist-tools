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
    },

}

const actions = {
    chunkArrayFunction({ dispatch }, data) {
        console.log('hello')
        return new Promise((resolve) => {
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
            resolve(chunkedArray)
        })
    },
}

export default {
    state, 
    mutations,
    actions
}