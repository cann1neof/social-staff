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
        data : () => ({
            mainURL : 'http://188.225.47.187/api/jsonstorage/f1447a62dcaba92ed1ddd2d652b63a8a',
            postUrl : 'http://188.225.47.187/api/jsonstorage/ba3c33e494c72686bff15526dee0199f',
            myId : undefined,
            myProfile : undefined
        }),
        methods : {
            UpdateUser(newId){
                this.myId = newId
            }, 
            getProfile(){
                if(this.myId == undefined){
                    this.$router.push('/login/')
                }
                if(this.myId == 'registering'){
                    this.$router.push('/register/')
                }
                this.axios.get(this.mainURL).then( res => {
                    this.myProfile = res.data[this.myId]
                } ).catch( err => {
                    console.log('rrr', err)
                } )
            },
            async sendPost(data){
                let tmp = []
                try {
                    await this.axios.get(this.postUrl).then( res => {
                        tmp = res.data
                        tmp.push({
                            'title' : data.title,
                            'body' : data.body,
                            'author' : parseInt(this.myId) + 1
                        })
                    })
                } catch (err) {
                    console.log('error at get',err)
                }
                try {
                    await this.axios.put(this.postUrl, tmp).then( res => { 
                        console.log('some res', res)
                        this.$router.push('/') 
                    } ).catch( err => {
                        console.log('rrr', err)                        
                    } )
                } catch (err) {
                    console.log('error at post',err)
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


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

