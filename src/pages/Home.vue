<template>
    <div class="container-fluid main-wrapper">
        <div class="row main-header">
            <div class="col-12">
                <MainHeader :isAdmin="isAdmin"/>
            </div>
        </div>
       <div class="row main-view">
            <div class="col-2 main-nav">
                <MainNav :isAdmin="isAdmin"/>
            </div>
           <div class="col-10 main-content">
               <router-view :isAdmin="isAdmin"/>
           </div>
       </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainHeader from '@/components/MainHeader'
import MainNav from '@/components/SideBar'

export default {
    name: "home",
    components: {
        MainHeader,
        MainNav
    },
    data: () => ({
        isAdmin: false
    }),
    computed: {
        ...mapGetters([
            'getProfileData'   
        ]),
    },
    methods: {
        async checkIsAdmin(){
            this.getProfileData
                .then((profile) => {
                    profile.role.some((arrVal) => { 
                        return 'admin' === arrVal ? this.isAdmin = true : this.isAdmin = false
                })
            })
        },
    },
    mounted() {
        this.checkIsAdmin()
    }
}
</script>

<style lang="scss" scoped>
.main-wrapper{
    height: 100vh;
        .main-header{
        padding: 10px 0;
        background: rgb(255,204,255);
        background: -moz-linear-gradient(270deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
        background: -webkit-linear-gradient(270deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
        background: linear-gradient(270deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffccff",endColorstr="#fffc00",GradientType=1);
    }
    .main-view{
        height: 100vh;
        .main-nav{
            background: rgb(255,204,255);
            background: -moz-linear-gradient(0deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
            background: -webkit-linear-gradient(0deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
            background: linear-gradient(0deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 67%, rgba(255,252,0,0.5441526952577906) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffccff",endColorstr="#fffc00",GradientType=1);
        }
        .main-content{
            padding-top: 10px;
            background: rgb(255,204,255);
            background: -moz-linear-gradient(180deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 69%, rgba(255,252,0,0) 100%);
            background: -webkit-linear-gradient(180deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 69%, rgba(255,252,0,0) 100%);
            background: linear-gradient(180deg, rgba(255,204,255,0.7206232834930848) 0%, rgba(230,255,245,1) 69%, rgba(255,252,0,0) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffccff",endColorstr="#fffc00",GradientType=1);
        }
    }
}

</style>