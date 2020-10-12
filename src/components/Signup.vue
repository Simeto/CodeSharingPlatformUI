<template>
    <div class="shape3">
        <form @submit.prevent="registerUser">
            <div class="form-group">
                <label for="firstNameForm">First Name</label>
                <input v-model="User.firstName" type="text" class="form-control" id="firstNameForm" aria-describedby="emailHelp" placeholder="First Name" content="Minimum two letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small class="form-text text-muted">We'll never share your Name with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="lastNameForm">Last Name</label>
                <input v-model="User.lastName" type="text" class="form-control" id="lastNameForm" aria-describedby="emailHelp" placeholder="Last Name" content="Minimum two letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small  class="form-text text-muted">We'll never share your Name with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="nickNameForm">Nick Name</label>
                <input v-model="User.nickName" type="text" class="form-control" id="nickNameForm" aria-describedby="emailHelp" placeholder="Nick Name" content="Minimum three letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small  class="form-text text-muted">We'll never share your Name with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="User.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" content="A valid email address" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small id="emailHelp"  class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputPasswordForm">Password</label>
                <input v-model="User.password" type="password" class="form-control" id="inputPasswordForm" placeholder="Password" content="Your password" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small id="passwordHelp"  class="form-text text-muted">We'll never share your password with anyone else.</small>

            </div>
            <div class="form-group">
                <label for="inputRepeatPasswordForm">Repeat Password</label>
                <input v-model="User.repeatedPass" type="password" class="form-control" id="inputRepeatPasswordForm"  placeholder="Repeat Password" content="Repeat your password" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small id="repeatedPasswordHelp"  class="form-text text-muted">We'll never share your password with anyone else.</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <vue-snotify/>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import {SnotifyPosition, SnotifyStyle} from 'vue-snotify';

export default {
    name: "Signup",
    data: () => ({
        User: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            password: '',
            repeatedPass: ''
        }
    }),
    computed: {
        ...mapActions([
            'verificationToken',
        ])
    },
    methods: {
        async registerUser() {
            await this.apiPost('/register', {
                email: this.User.email,
                password: this.User.password,
                firstName: this.User.firstName,
                lastName: this.User.lastName,
                nickName: this.User.nickName,
                repeatedPass: this.User.repeatedPass
            }).then(async data => {
                if(data) {
                    await this.$store.dispatch('verificationToken', data.token)
                    this.$snotify.create({
                        title: 'Registration Email is send !',
                        body: 'Email to verify your email !',
                        config: {
                            position: SnotifyPosition.centerTop,
                            type: SnotifyStyle.success,
                        }
                    })
                }
            }).catch(err => {
                if(err){
                    this.$snotify.create({
                        title: 'Registration failed !',
                        body: 'Provide right type and content of the data fields.',
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
    .shape3 {
        -webkit-transform: rotate(15deg);
        -moz-transform: rotate(15deg);
        bottom: -10vh;
        height: 200vh;
        position: absolute;
        right: 90vh;
        width: 100vh;
        overflow: hidden;
        z-index: 0;
        form{
            -webkit-transform: rotate(-15deg);
            -moz-transform: rotate(-15deg);
            position: relative;
            width: 50vh;
            top: 48%;
            left: 28%;
        }
    }
</style>