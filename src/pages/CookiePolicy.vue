<template>
    <div class="container ">
        <div class="row">
            <div class="col-12 form-container">
                <div>
                    <span>COOKIES POLICY</span>
                    <span>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </div>
                <form class="col-4" @submit.prevent="cookiesIsChecked">
                    <div class="form-group">
                        <input v-model="User.cookies" type="checkbox" class="form-control" id="cookiesPolicyCheck" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <vue-snotify/>
    </div>
</template>

<script>
    import {SnotifyPosition, SnotifyStyle} from "vue-snotify";
    import {mapGetters} from "vuex";

    export default {
        name: "CookiesPolocy",
        data: () => ({
            User: {
                cookies: false
            }
        }),
        computed: {
            ...mapGetters([
                'getVerificationToken'
            ])
        },
        methods: {
            async cookiesIsChecked() {
                this.getVerificationToken.then(async token => {
                    if (this.User.cookies) {
                        const headers = { authorization: 'Bearer ' + token }
                        await this.apiPost('/cookiesConfirmation', {
                            cookies: this.User.cookies
                        }, headers).then(async data => {
                            if (data) {
                                await this.$store.dispatch('updateUser', data.user)
                                await this.$store.dispatch('updateToken', data.token)
                                await this.$router.push('/users/profile')
                            }
                        }).catch(err => {
                            if(err) {
                                this.$snotify.create({
                                    title: 'Terms And Conditions !',
                                    body: 'Verification filed !',
                                    config: {
                                        position: SnotifyPosition.centerTop,
                                        type: SnotifyStyle.error,
                                    }
                                })
                            }
                        })
                    } else {
                        this.$snotify.create({
                            title: 'Privacy Policy',
                            body: 'Please tick the checkbox to confirm with the privacy policy !',
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.error,
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>