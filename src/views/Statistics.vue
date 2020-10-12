<template>
    <div class="row statistics-wrapper">
        <div class="col-6 statistics">
            <header>
                <h4>The number of snippets andper tag</h4>
            </header>
            <div class="statistics-content">
                <div class="row statistics-content-headers">
                    <h6 class="col-4">Tag Name</h6>
                    <h6 class="col-4">Number of Snipets</h6>
                    <h6 class="col-4">Number of Likes</h6>
                </div>
                <div v-for="tag in tags" :key="tag._id" class="row">
                    <div class="col-4">
                        <div>
                            {{tag._id.description}}
                        </div>
                    </div>
                    <div class="col-4">
                        <div>
                            {{tag.count}}
                        </div>
                    </div>
                    <div class="col-4">
                        <div>
                            not yet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Statistics',
       data: () => ({
        tags: {},
        isAdmin: false
    }),
    components: {
        
    },
        computed: {
        ...mapGetters([
            'getUserToken',
            'getProfileData',
            'getTags'
        ])
    },
    methods: {
        async firstLoad(){
            this.getUserToken.then(async token => {
                const headers = { authorization: 'Bearer ' + token }
                await this.apiPost('/getTagStatistics', {}, headers)
                    .then(async (data) => {
                        this.$store.dispatch('setTags', data)
                        this.getTags.then((tags) => {
                             this.tags = tags 
                        })
                })
            })
            .catch(err => {
                return err
            })
        },
    },
    mounted() {
        this.firstLoad()
    }
}
</script>

<style scoped lang="scss">
.statistics-wrapper{
    .statistics{
        height: 100vh;
        &:first-of-type{
                border-right: 2px solid #00802b;
            }
        &-content{
            padding-top: 20px;
            &-headers{
                padding-bottom: 25px;
            }
        }
        h4{
          text-align: center;
          color: #00802b; 
        }
        h6{
            text-align: center;
            text-decoration: underline;
            color: #00802b;
        }
    }
}
</style>