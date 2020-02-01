<template>
<v-app id="app" >
    <v-navigation-drawer
        color="deep-purple darken-4"
        dark
        expand-on-hover
        hide-overlay
        permanent
        right
        app
    >
        <v-list nav shaped dense >
            <v-list-item two-line v-if="myProfile">

                <v-list-item-avatar>
                    <img :src="myProfile.photo" alt="maaaaaan">
                </v-list-item-avatar>

                <v-list-item-content class="text-left">
                    <v-list-item-title    class="font-weight-black"> {{myProfile.login}} </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-black"> {{myProfile.name}} </v-list-item-subtitle>
                </v-list-item-content>
                <v-btn class="mx-2" fab dark color="purple darken-2" link to="/newpost/">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>    
            </v-list-item>

            <v-divider class="my-3"></v-divider>

            <v-list-item  hover link to="/">
                <v-list-item-icon> <v-icon> mdi-home-outline </v-icon> </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="text-left">
                        Главная
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item hover link :to="`/profile/${parseInt(myId) + 1}`">
                <v-list-item-icon> <v-icon> mdi-account </v-icon> </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="text-left">
                        Мой профиль
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item hover link to="/users/">
                <v-list-item-icon> <v-icon> mdi-account-plus </v-icon> </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="text-left">
                        Найти друзей
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        
        </v-list>
    </v-navigation-drawer>
    
    <v-content class="px-12 py-3">
        <v-container fluid>
            <router-view @login="UpdateUser($event)" @sendPost="sendPost($event)"  />
        </v-container>
    </v-content>

</v-app>
</template>

<script>
    export default {
        data : ()=>({
            myProfile : []
        }),
        methods : {
            UpdateUser(newId){
                this.$route.dispatch('updateState', [ 'CID', newId ] )
            }, 
            getProfile(){
                if(this.$store.getters.getCID == undefined){
                    this.$router.push('/login/')
                }
                else if(this.$store.getters.getCID == 'registering'){
                    this.$router.push('/register/')
                }
                else {
                    this.myProfile = this.$store.getters.getUsers[this.$store.getters.getCID]
                }
            },
        },
        mounted(){
            this.getProfile()
        },
        watch : {
            $route(){
                this.getProfile()
            },
            myId(){
                this.getProfile()
            }
        }
    }
</script>


<style>
</style>

