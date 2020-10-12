<template>
    <div class="container ">
        <div class="row">
            <div class="col-12 form-container">
                <div>
                    <span>TERMS AND CONDITIONS</span>
                    <span>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </div>
                <form class="col-4" @submit.prevent="termsIsChecked">
                    <div class="form-group">
                        <input v-model="User.terms" type="checkbox" class="form-control" id="termsAndConditionsCheck" placeholder="Password">
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
    name: "TermsAndConditions",
    data: () => ({
        User: {
            terms: false
        }
    }),
    computed: {
        ...mapGetters([
            'getVerificationToken'
        ])
    },
    methods: {
        async termsIsChecked() {
            this.getVerificationToken.then(async token => {
                if (this.User.terms) {
                    const headers = { authorization: 'Bearer ' + token }
                    await this.apiPost('/termsConfirmation', {
                        terms: this.User.terms
                    }, headers).then(async data => {
                        if (data.token) {
                            const token = data.token
                            this.$router.push('/cookiepolicy?rt=' + token)
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