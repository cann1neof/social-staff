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
            <v-list-item two-line v-if="$store.getters.getCID != -1">

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

            <v-list-item hover link :to="`/profile/${myProfile.id}`" v-if="myProfile.id">
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
            myProfile : { id : 0 }
        }),
        methods : {
            UpdateUser(newId){
                this.$store.dispatch('updateState', [ 'CID', newId ] )
                if(newId == 'registering'){
                    this.$router.push('/register/')
                }
            }, 
            getProfile(){        
                 if(this.$store.getters.getCID == -1){
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
            console.log('1234')
             if(this.$store.getters.getCID == -1){
                this.$router.push('/login/')
            }
            else if(this.$store.getters.getCID == 'registering'){
                this.$router.push('/register/')
            }

            this.axios.get(this.$store.getters.userURL
            ).then(res => {
                this.$store.dispatch('updateState', ['AUsers', res.data])
            } ) 
            this.axios.get(this.$store.getters.postURL
            ).then(res => {
                this.$store.dispatch('updateState', ['APosts', res.data])
                console.log('res posts', res.data)
            } )   

            this.getProfile()

        },
        watch : {
            $route(){
                this.getProfile()
            },
        }
    }
</script>


<style>
</style>

