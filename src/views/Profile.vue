<template>
    <div class="container">
        <div class="row border-bottom">
            <form @submit.prevent="updateProfile"  class="col-7">
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.firstName" type="text" class="form-control" placeholder="First Name" content="Minimum two letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="First Name" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.lastName" type="text" class="form-control" placeholder="Last Name" content="Minimum two letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="last Name" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.nickName" type="text" class="form-control" placeholder="Nick Name" content="Minimum three letters" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="Nick Name" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.email" type="text" class="form-control" placeholder="Email" content="A valid email address" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="Email" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.newPassword" type="password" class="form-control" placeholder="New Password" content="Your new password" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="New Password" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-10">
                    <div class="input-group m-5">
                        <input v-model="User.repeatedNewPass" type="password" class="form-control" placeholder="Repeat The New Password" content="Repeat your new password" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}" aria-label="Repeat The New Password" aria-describedby="basic-addon1">
                    </div>
                </div>
                <button type="submit" class="btn btn-info mr-3">Update</button>
            </form>
            <div class="col-3 mt-5">
                <div class="img mb-4">
                    <avatar/>
                </div>
                <div class="input-group">
                    <form @submit.prevent="updateAvatar">
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Example file input</label>
                            <input @change="onFileSelected" ref="file" type="file" class="form-control-file" id="exampleFormControlFile1" content="JPG, JPEG, and GIF formats only" v-tippy="{ theme:'light', arrow : true,  animation : 'perspective'}">
                            <button class="btn btn-primary mr-3" type="submit">
                                Upload Avatar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10">
                <div class="input-group m-5 justify-content-end">
                    <button v-on:click="clearFieldsData" type="button" class="btn btn-primary mr-3">Clear</button>
                    <button v-on:click="deleteProfile" type="button" class="btn btn-danger">
                        <router-link to="/">
                            Delete
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
        <vue-snotify/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import avatar from'@/parts/Avatars'
import {SnotifyPosition, SnotifyStyle} from 'vue-snotify';

export default {
    name: "User",
    data: () => ({
        User: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            repeatedNewPass: '',
            avatar: null
        }
    }),
    computed: {
        ...mapGetters([
            'getUserToken',
            'getProfileData'
        ]),
    },
    components: {
        avatar
    },
    methods: {
        ...mapActions([
            'updateUser',
            'updateAvatar'
        ]),
        async clearFieldsData () {
            this.User = {}
        },
        async onFileSelected () {
            this.User.avatar = this.$refs.file.files[0]
        },
        async updateAvatar() {
            const fd = new FormData()
            fd.append('image', this.User.avatar, this.User.avatar.name)
            this.getUserToken.then(async token => {
                const headers = {'Content-Type': 'multipart/form-data', authorization: 'Bearer ' + token }
                await this.apiPost('/updateUserAvatar', fd, headers)
                    .then(async (data) => {
                        await this.updateAvatar(data)
                            .then(() => {
                                this.$snotify.create({
                                    title: `Avatar updated successfully !`,
                                    body: 'err',
                                    config: {
                                        position: SnotifyPosition.centerTop,
                                        type: SnotifyStyle.access,
                                    }
                                })
                            })
                    })
                    .catch(err => {
                        this.$snotify.create({
                            title: `Can't update the avatar !`,
                            body: err,
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.error,
                            }
                        })
                    })
            })
        },
        async updateProfile() {
            this.getUserToken.then(async token => {
                const headers = { authorization: 'Bearer ' + token }
                await this.apiPut('/updateUserProfile', {
                    email: this.User.email,
                    firstName: this.User.firstName,
                    lastName: this.User.lastName,
                    nickName: this.User.nickName,
                    newPassword: this.User.newPassword,
                    repeatedNewPass: this.User.repeatedNewPass
                }, headers)
                .then(async (data) =>  await this.updateUser(data.user))
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
        },
        async deleteProfile() {
            this.getUserToken.then(async token => {
                const headers = { authorization: 'Bearer ' + token }
                await this.apiDelete('/delete', null, headers)
                    .then(async () => {
                        this.$snotify.create({
                            title: 'User deleted successfully !',
                            body: 'User deleted successfully !',
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.success,
                            }
                        })
                    })
                    .catch(err => {
                        this.$snotify.create({
                            title: 'Cant delete the user !',
                            body: err,
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.error,
                            }
                        })
                    })
            })
        },
        async setUserAvatar() {
            this.getProfileData.then(async data => {
                this.User = {
                    avatar: data
                }
            })
        },
        async setUserData() {
            this.getProfileData.then(async data => {
                this.User = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    nickName: data.nickName,
                    email: data.email
                }
            })
        }
    },
    created() {
        this.setUserData()
    }
}
</script>

<style lang="scss" scoped>
    img{
        height: 20vh;
    }

</style>