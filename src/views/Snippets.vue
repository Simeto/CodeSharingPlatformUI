<template>
    <div class="row snippet-wrapper">
       <div class="snippet-container col-12"  v-for="snippet in snippets" :key="snippet._id">
           <tags
                :snippetId="snippet._id"
                :disabled="!snippet.isOwner"
           />
            <editor 
                @deleted-snippet="loadSnippets()" 
                @edit-snippet="loadSnippets()" 
                @like-snippet="loadSnippets()"
                :code="snippet.description" 
                :edit="snippet.isOwner"
                :isOwner="snippet.isOwner"
                :isEditor="false"
                :isAdmin="isAdmin"
                :snippetId="snippet._id"
                :likes="snippet.likes"
            />
            <div class="likes-container">
                <div class="likes">
                    <i class="fas fa-sort-numeric-up-alt"></i>
                    <span>
                        {{snippet.likes || 0}}
                    </span>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
import { EventBus } from '../main'
import { mapGetters, mapActions } from 'vuex'
import 'prismjs/themes/prism.css'
import "prismjs/plugins/line-numbers/prism-line-numbers.min"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import Editor from '@/parts/SnippetEditor'
import Tags from '@/parts/Tags'
export default {
    name: 'Snippets',
    data: () => ({
        snippets: {}
    }),
    components: {
        Editor,
        Tags
    },
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
    methods: {
        ...mapActions([
            'setOwnSnippets',
            'setSnippets'
        ]),
        async firstLoad(){
            this.getSnippets
            .then(async (s) => {
                if((s.length <= 0) || (s.length === undefined)) {
                    this.getUserToken.then(async token => {
                        const headers = { authorization: 'Bearer ' + token }
                        await this.apiPost('/getAllSnippets', {}, headers)
                            .then(async (data) => {
                                this.$store.dispatch('setSnippets', data)
                                this.getSnippets.then((snippets) => {
                                this.snippets = snippets 
                            })
                            }).catch(err => {
                                return err
                            })
                    })
                }
            })
        },
        async loadSnippets(){
            //ToDo cattch own all. Naw when delete/update/like displays all , must display which is own or all
            this.getSnippets
            .then((snippets) => {
                this.snippets = snippets 
            })
        },
        async setSnippets(){
            EventBus.$on('visibility-changed', async (path) => {
                this.getUserToken.then(async token => {
                    const headers = { authorization: 'Bearer ' + token }
                        await this.apiPost(path, {}, headers)
                            .then(async (data) => {
                                    this.$store.dispatch('setSnippets', data)
                                    this.getSnippets.then((snippets) => {
                                    this.snippets = snippets 
                                })
                            }).catch(err => {
                                return err
                            })
                })
            })
        }
    },
    mounted() {
        this.firstLoad()
        this.loadSnippets()
        this.setSnippets()    
    }
}
</script>

<style scoped lang="scss">
.snippet-wrapper{
    padding: 0 15px;
    .snippet-container {
        margin-top: 2vh;
        border: 3px solid gray;
        border-radius: 5px;
         background: #fcfcf5;
        .likes-container{
            display: flex;
            padding: 10px;
            .likes{
                background: #ccffcc;
                color: #009900;
                padding: 0 5px;
                border-radius: 5px;
                margin-right: 5px;
                span{
                    padding-left: 10px;
                }
            }
        }
    }
    .my-editor{
        border: 1px solid gray !important;
        border-radius: 5px !important;
    } 
}
</style>