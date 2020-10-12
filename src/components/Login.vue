<template>
    <div class="shape4" >
        <form @submit.prevent="loginUser">
            <div class="form-group">
                <label for="loginInputEmail1">Email address</label>
                <input v-model="User.email" type="email" class="form-control" id="loginInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" content="A valid email address" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="loginInputPassword1">Password</label>
                <input v-model="User.password" type="password" class="form-control" id="loginInputPassword1" placeholder="Password" content="Your password" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="loginCheck1">
                <label class="form-check-label" for="loginCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">
                Login
            </button>
            <vue-snotify/>
        </form>
        <router-link class="btn btn-warning ml-4 forgotten-password" tag="button" :to="'/forgotpassword'">
            Forgot your password
        </router-link>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {SnotifyPosition, SnotifyStyle} from "vue-snotify";

export default {
    name: "Login",
    data: () => ({
        User: {
            email: '',
            password: ''
        }
    }),
    computed: {
        ...mapGetters([
            'getProfileData'
        ]),
        ...mapActions([
            'updateUser'
        ])
    },
    methods: {
       async loginUser() {
         if (this.User.password.length > 0) {
             await this.apiPost('/login', {
                 email: this.User.email,
                 password: this.User.password
             })
             .then(async (data) => {
                 if(data){
                     await this.$store.dispatch('updateUser', data.user)
                     await this.$store.dispatch('updateToken', data.token)
                     await this.$router.push('/users/profile')
                 }
             })
             .catch(err => {
                 if(err){
                     this.$snotify.create({
                         title: 'Login failed !',
                         body: 'Wrong email or password.',
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
}
</script>

<style lang="scss" scoped>
    .shape4 {
        -webkit-transform: rotate(15deg);
        -moz-transform: rotate(15deg);
        height: 155vh;
        left: 100vh;
        position: absolute;
        top: -25%;
        width: 57%;
        overflow: hidden;
        z-index: 0;
       form{
           -webkit-transform: rotate(-15deg);
           -moz-transform: rotate(-15deg);
           position: relative;
           width: 50vh;
           top: 30%;
           left: 15%;
       }
        .forgotten-password{
            -webkit-transform: rotate(-15deg);
            -moz-transform: rotate(-15deg);
            position: relative;
            width: 30vh;
            top: 40.5vh;
            left: 30vh;
        }
    }
</style>