<template>
    <div>
      <form 
        @submit.prevent="chooseFormAction" 
        :data-id="snippetId"
      >
          <prism-editor :readonly=!edit class="my-editor height-200" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
          <div class="actions-container">
            <button v-if="isEditor" name="submit" type="submit" class="btn btn-primary">Submit</button>
            <button v-if="isOwner" name="edit" type="submit" class="btn btn-primary">Edit</button>
            <button v-if="isAdmin" name="delete" type="submit" class="btn btn-primary">Delete</button>
            <button v-if="!isOwner && !isEditor && !isAdmin" name="like" type="submit" class="btn btn-primary">
              <i class="fas fa-thumbs-up"></i>
            </button>
          </div>
      </form>
      <vue-snotify/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { PrismEditor } from 'vue-prism-editor';
import {SnotifyPosition, SnotifyStyle} from "vue-snotify";
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


export default {
  name: 'SnippetEditor',
  data: () => ({
      rating: 0
  }),
  props: [
    'code', 
    'edit', 
    'isAdmin', 
    'isOwner', 
    'isEditor',
    'snippetId'
  ],
  components: {
      PrismEditor
  },
   computed: {
        ...mapGetters([
            'getUserToken',
            'getProfileData',
            'getSnippets'
        ]),
        ...mapActions([

        ])
    },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
   async chooseFormAction(e){
     switch(e.submitter.name) {
        case 'submit':
            this.createSnippet()
            break;
        case 'edit':
            this.editSnippet(e)
            break;
        case 'delete':
            this.deleteSnippet(e)
            break;
        case 'like':
            this.likeUnlikeSnippet(e)
            break;
      }
    },
    async likeUnlikeSnippet(e) {
      const id = e.target.dataset.id
      this.getUserToken
        .then(async token => {
            const headers = { authorization: 'Bearer ' + token }
            await this.apiPost('/likeUnlikeSnippet/' + id, null, headers)
                    .then(async () => {
                        this.$snotify.create({
                          title: 'The snippet was liked/unliked !',
                          body: 'Successfully like/unlike the snippet !',
                          config: {
                            position: SnotifyPosition.centerTop,
                            type: SnotifyStyle.success,
                          }
                        })
                        await this.apiPost('/getAllSnippets', {}, headers)
                        .then((data) => {
                          this.$store.dispatch('setSnippets', data)
                          this.$emit('like-snippet')
                        })
                    })
        })
        .catch(err => {
          this.$snotify.create({
                title: `Cant like the snippet !`,
                body: err,
                config: {
                  position: SnotifyPosition.centerTop,
                  type: SnotifyStyle.error,
                }
          })
        })
    },
    async deleteSnippet(e) {
      const id = e.target.dataset.id
      this.getUserToken
      .then(async token => {
        const headers = { authorization: 'Bearer ' + token }
        await this.apiPost('/deleteSnippet/' + id, null, headers)
          .then(async () => {
            this.$snotify.create({
              title: 'The snippet was deleted !',
              body: 'The snippet was deleted !',
              config: {
                position: SnotifyPosition.centerTop,
                type: SnotifyStyle.success,
              }
            })
            await this.apiPost('/getAllSnippets', {}, headers)
            .then((data) => {
               this.$store.dispatch('setSnippets', data)
               this.$emit('deleted-snippet')
            })
          })
      })     
      .catch(err => {
        this.$snotify.create({
              title: `Cant delete the snippet !`,
              body: err,
              config: {
                position: SnotifyPosition.centerTop,
                type: SnotifyStyle.error,
              }
            })
        })
    },
    async editSnippet(e) {
      const id = e.target.dataset.id
      this.getUserToken
        .then(async token => {
          const headers = { authorization: 'Bearer ' + token }
          await this.apiPost('/updateSnippet/' + id, {
             description: this.code
        }, headers)
          .then(async () => {
            this.$snotify.create({
              title: 'The snippet was updated !',
              body: 'The snippet was updated !',
              config: {
                position: SnotifyPosition.centerTop,
                type: SnotifyStyle.success,
              }
            })
            await this.apiPost('/getAllSnippets', {}, headers)
            .then((data) => {
               this.$store.dispatch('setSnippets', data)
               this.$emit('edit-snipet')
            })
          })
      })
      .catch(err => {
        this.$snotify.create({
          title: 'Cant edit the snippet !',
          body: err,
          config: {
            position: SnotifyPosition.centerTop,
            type: SnotifyStyle.error,
          }
        })
      })
    },
    async createSnippet() {
      this.getUserToken.then(async token => {
        const headers = { authorization: 'Bearer ' + token }
        await this.apiPost('/createSnippet', {
          description: this.code,
          rating: this.rating,
          likes: 0,
        }, headers)
        .then(() => {
          this.getUserToken.then(async token => {
            const headers = { authorization: 'Bearer ' + token }
            await this.apiPost('/getAllSnippets', {}, headers)
                .then(async (data) => {
                    this.$store.dispatch('setSnippets', data)
                      .then(() => {
                        this.$snotify.create({
                          title: 'The snippet is created !',
                          body: 'Go to snippets section to review and edit it !',
                          config: {
                            position: SnotifyPosition.centerTop,
                            type: SnotifyStyle.success,
                          }
                        })
                      })
                })
            })
          }).catch(err => {
              this.$snotify.create({
                title: 'Cant create the snippet !',
                body: err,
                config: {
                  position: SnotifyPosition.centerTop,
                  type: SnotifyStyle.error,
                }
              })
          })
      })
    }
  }
};
</script>

<style scoped lang="scss">
  .my-editor {
    background: #edf1f1;
    color: #138d8d;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
  .prism-editor__textarea:focus {
    outline: none;
  }
  .actions-container{
    padding: 5px 5px;
    button{
      margin-right: 10px;
      &:last-of-type{
        margin-right: 0;
      }
    }
  }
</style>