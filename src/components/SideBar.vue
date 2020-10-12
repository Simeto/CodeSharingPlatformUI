<template>
    <div class="">
        <nav class="">
            <div v-for="value in users_links" :key="value.title" class="row m-0 p-3">
                <router-link :to="value.url">
                    {{value.title}}
                </router-link>
            </div>
            <div v-if="isAdmin" >
                <div v-for="value in admins_links" :key="value.title" class="row m-0 p-3">
                <router-link :to="value.url">
                    {{value.title}}
                </router-link>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "sideBar",
    data: () => ({
        users_links: {
            home: {
                title: 'home',
                url: '/users/home'
            },
            snippets: {
                title: 'snippets',
                url: '/users/snippets'
            },
            profile: {
                title: 'Profile',
                url: '/users/profile'
            }
        },
        admins_links: {
            statistics: {
                title: 'Statistics',
                url: '/admin/statistics'
            }
        }
    }),
    props: [
        'isAdmin'
    ],
}
</script>

<style lang="scss" scoped>
.router-link-active{
    color: #004d1a;
    font-weight: bolder;
}
a{
    color: #009933;
    text-transform: capitalize;
    &:hover {
        text-decoration: none;
    }
}
</style>