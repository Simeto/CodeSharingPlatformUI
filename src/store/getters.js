export default {
    async getUserToken(state) {
        return state.token
    },
    async getVerificationToken(state) {
        return state.verificationtoken
    },
    async getProfileData(state) {
        return state.User
    },
    async getAvatarData(state) {
        return state.User.avatar
    },
    async getSnippets(state) {
        return state.Snippets
    },
    async getTags(state) {
        return state.Tags
    }
}