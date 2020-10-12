<template>
    <div>
        <avatar v-if=User.avatar username="Darth Vader"
                :src="User.avatar"
                :size="38">
        </avatar>
        <avatar v-else username="Darth Vader"
                initials="AS"
                :size="38">
        </avatar>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import {mapGetters} from "vuex";
export default {
    name: "Avatars",
    data: () => ({
        User: {
            avatar: '',
        }
    }),
    components: {
        Avatar
    },
    computed: {
        ...mapGetters([
            'getProfileData'
        ])
    },
    methods: {
        async setAvatarData() {
            await this.getProfileData.then(async data => {
                this.User = {
                    avatar: data.avatar,
                }
            })
        }
    },
    created() {
        this.setAvatarData()
    }
}
</script>

<style scoped lang="scss">

</style>