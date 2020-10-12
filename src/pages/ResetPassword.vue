<template>
    <div class="container ">
        <div class="row">
            <div class="col-12 form-container">
                <form class="col-4" @submit.prevent="resetPassword">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="User.newPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword2">Repeat Password</label>
                        <input v-model="User.repeatedNewPass" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
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
    name: "ResetPassword",
    data: () => ({
        User: {
            newPassword: '',
            repeatedNewPass: '',
        }
    }),
    computed: {
        ...mapGetters([
            'getVerificationToken',
            'getProfileData'
        ]),
    },
    methods: {
        async resetPassword() {
            this.getVerificationToken.then(async token => {
                const headers = { authorization: 'Bearer ' + token }
                await this.apiPost('/resetPassword', {
                    newPassword: this.User.newPassword,
                    repeatedNewPass: this.User.repeatedNewPass
                }, headers)
                    .then(async (data) => {
                        if(data) {
                            // this.$emit('passChanged')
                            this.$router.push('/')
                        }
                    })
                    .catch(err => {
                        if(err){
                            this.$snotify.create({
                                title: 'Update failed !',
                                body: 'Provide right type and content of the data fields.',
                                config: {
                                    position: SnotifyPosition.centerTop,
                                    type: SnotifyStyle.error,
                                }
                            })
                        }
                    })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        height: 100vh;
        .row{
            height: 100vh;
            align-items: center;
            .form-container{
                display: flex;
                justify-content: center;
                margin-bottom: 40vh;
            }
        }
    }
</style>