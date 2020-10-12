<template>
    <div class="tags-container">
        <div class="tag-icon-container">
            <i class="fas fa-tags"></i>
        </div>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            @before-adding-tag="addTag"
            @before-deleting-tag="deleteTag"
            :disabled="disabled"
        />
        <vue-snotify/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueTagsInput from '@johmun/vue-tags-input';
import {SnotifyPosition, SnotifyStyle} from "vue-snotify";

export default {
    name: "Tags",
    data: () => ({
        tag: '',
        tags: []
    }),
    props: [
        'snippetId',
        'disabled'
    ],
    components: {
        VueTagsInput
    },

    computed: {
        ...mapGetters([
            'getProfileData',
            'getUserToken'
        ])
    },
    methods: {
        loadTags() {
            const id = this.snippetId
            this.getUserToken
                .then(async token => {
                    const headers = { authorization: 'Bearer ' + token }
                    await this.apiPost('/loadTags/' + id, null, headers)
                    .then(tags => {
                        tags.forEach(tag => {
                            this.tags.push(tag.description)
                        });
                     })
            }).catch(err => {
                return err
            })
        },
        addTag(e) {
            const id = this.snippetId
            this.getUserToken
                .then(async token => {
                    const headers = { authorization: 'Bearer ' + token }
                    await this.apiPost('/addTag/' + id, {
                        description: e.tag.text
                    }, headers)
                    .then(async data => {
                        this.tags.push(data.tag.description)
                        this.$snotify.create({
                            title: 'Successfully add the tag !',
                            body: 'Successfully add the tag !',
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.success,
                            }
                        })
                     })
                })
                .catch(err => {
                    this.$snotify.create({
                        title: `Cant add the tag !`,
                        body: err,
                        config: {
                            position: SnotifyPosition.centerTop,
                            type: SnotifyStyle.error,
                        }
                    })
                })
        },
        deleteTag(e) {
            const id = this.snippetId
            this.getUserToken
                .then(async token => {
                    const headers = { authorization: 'Bearer ' + token }
                    await this.apiPost('/deleteTag/' + id, {
                        description: e.tag.text
                    }, headers)
                    .then(async data => {
                        const filtered = this.tags.filter(word => word != e.tag.text)
                        this.tags = filtered
                        this.$snotify.create({
                            title: 'Successfully delete the tag !',
                            body: data.message,
                            config: {
                                position: SnotifyPosition.centerTop,
                                type: SnotifyStyle.success,
                            }
                        })
                     })
                })
                .catch(err => {
                    this.$snotify.create({
                    title: `Cant delete the tag !`,
                    body: err,
                    config: {
                        position: SnotifyPosition.centerTop,
                        type: SnotifyStyle.error,
                    }
                    })
                })
        }
    },
    mounted() {
        this.loadTags()
    }
}
</script>

<style scoped lang="scss">
.tags-container {
    .tag-icon-container{
        margin: auto 5px auto 0;
        color: #44cadb;
        .ti-input{
            border-radius: 5px;
        }
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px 15px;
    .vue-tags-input{
        max-width: 100%;
    }
}
</style>