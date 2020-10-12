<template>
    <div class="row h-100">
        <div class="col-2 h-100">
            LOGO
        </div>
        <div class="header-content col-10">
            <div class="row h-100">
                <div class="col-6" />
                <div class="col-6">
                    <div class="row">
                        <div class="col-6" />
                        <div class="col-6">
                            <div class="row flex-row-reverse header-buttons">
                                <div>
                                    <avatar/>
                                </div>
                                <div class="dropdown">
                                    <button v-if="!isAdmin" class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-bars"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div 
                                        v-for="value in links" 
                                        :key="value.title" 
                                        @click="changeSnippetsVisibility"  
                                        class="dropdown-item">
                                            <router-link :to="value.url" :data-appearance="value.appearance" >
                                                {{value.title}}
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!isAdmin">
                                    <router-link :to="add.url">
                                        <button class="btn btn-primary">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                {{add.title}}
                                        </button>
                                     </router-link>
                                </div>
                                <div>
                                    <button class="btn btn-danger" v-on:click="logOutUser">
                                        <i class="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EventBus } from '../main'
import avatar from'@/parts/Avatars'
export default {
    name: "MainHeader",
    data: () => ({
        componentKey: 0,
        User: {
            email: '',
            password: ''
        },
        add: {
            url: 'addSnippet',
            title: 'Add A Snippet'
        },
        links: {
            all: {
                title: 'All snippets',
                appearance: 'all',
                url: '/users/snippets'
            },
            own: {
                title: 'Own snippets',
                appearance: 'own',
                url: '/users/snippets'
            },
            others: {
                title: 'Other snippets',
                appearance: 'others',
                url: '/users/snippets'
            }
        }
    }),
    props: [
        'isAdmin'
    ],
    computed: {
        ...mapGetters([
            'getUserToken',
            'getProfileData',
            'getSnippets'
        ])
    },
    components: {
        avatar
    },
    methods: {
        ...mapActions([
            'setOwnSnippets',
            'setSnippets'
        ]),
        async changeSnippetsVisibility(e) {
            const appearance = e.target.dataset.appearance
            let url = ''
            switch(appearance) {
                case 'own':
                    url = '/getOwnSnippets'
                    break;
                case 'all':
                    url = '/getAllSnippets'
                    break;
                case 'others':
                    url = '/getOtherSnippets'
                    break;
                default: 
                    url = '/getAllSnippets'
            }
            EventBus.$emit('visibility-changed', url)
        },
        async forceRerender() {
            this.componentKey += 1;
        },
        async logOutUser() {
            this.getUserToken.then(async token => {
                const headers = { authorization: 'Bearer ' + token }
                await this.apiPost('/logout',null, headers)
                .then(async () => {
                    await this.$store.dispatch('logOutUser', null).then(() => {
                        this.$router.push('/')
                    })
                })
                .catch(err => {
                    return err
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
.header-content{
    .header-buttons{
        padding: 0 15px;
        justify-content: space-between;
        .dropdown-menu{
            left: -57px !important;
        }
    }
}
</style>