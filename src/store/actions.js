export default {
     async updateUser({ commit }, payload) {
        commit('updateUser', payload)
    },
    async updateToken({ commit }, payload) {
        commit('updateToken', payload)
    },
    async verificationToken({ commit }, payload) {
        commit('verificationToken', payload)
    },
    async logOutUser({ commit }, payload) {
        commit('logOutUser', payload)
    },
    async updateAvatar({ commit }, payload) {
        commit('updateAvatar', payload)
    },
    async setSnippets({commit}, payload) {
        commit('setAllSnippets', payload)
    },
    async setOwnSnippets({commit}, payload) {
        commit('setOwnSnippets', payload)
    },
    async setTags({commit}, payload) {
        commit('setAllTags', payload)
    }
}