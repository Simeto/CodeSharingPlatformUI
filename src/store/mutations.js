
export default {
    async updateUser(state, payload) {
        return state.User = payload
    },
    async verificationToken(state, payload) {
        return state.verificationtoken = payload
    },
    async updateToken(state, payload) {
        return state.token = payload
    },
    async logOutUser(state) {
        state.User = null
        state.token =null
        return state
    },
    async updateAvatar(state, payload) {
        return state.User.avatar = payload
    },
    async setAllSnippets(state, payload) {
        return state.Snippets = payload
    },
    async setOwnSnippets(state, payload) {
        return state.Snippets = payload
    },
    async setAllTags(state, payload) {
        return state.Tags = payload
    }
}