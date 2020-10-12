<template>
    <div class="container ">
        <div class="row">
            <div class="col-12 form-container">
                <form class="col-4" @submit.prevent="forgotPass">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="User.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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

export default {
    name: "ForgotPassword",
    data: () => ({
        User: {
            email: ''
        }
    }),
    methods: {
        async forgotPass() {
            await this.apiPost('forgotPassword', {
                email: this.User.email
            }).then(async data => {
                if (data) {
                    await this.$store.dispatch('verificationToken', data.token)
                    this.$snotify.create({
                        title: 'Verification!',
                        body: 'Verification Email is send !',
                        config: {
                            position: SnotifyPosition.centerTop,
                            type: SnotifyStyle.success,
                        }
                    })
                }
            }).catch(err => {
                if(err) {
                    this.$snotify.create({
                        title: 'Mail send failed !',
                        body: 'Invalid email !',
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