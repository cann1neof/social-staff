<template>
    <div v-if="posts && users">
        <v-card 
            v-for="post in posts" 
            :key="post.id" 
            width="450"
            class = "my-2 mx-auto"
            min-height="150"
            > 
            <v-card-title class="text-left">
                {{post.title}}
            </v-card-title>

            <v-card-text class="text-left">
                {{post.body}}
            </v-card-text>
             <v-card-actions>
                <v-btn
                    outlined
                    color="green"
                    @click="red(post)"
                    >
                <v-icon class="mr-2"> mdi-account-badge-horizontal </v-icon> {{ users[ parseInt(post.author) - 1 ].name }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data : () => ({
        posts : undefined,
        users : undefined,
        postsURL : 'http://188.225.47.187/api/jsonstorage/ba3c33e494c72686bff15526dee0199f',
        usersURL : 'http://188.225.47.187/api/jsonstorage/f1447a62dcaba92ed1ddd2d652b63a8a',
  }),
  methods : {
    getPosts(){
        this.axios.get(this.postsURL).then( res => {
            this.posts = res.data
        } )
    },
    getUsers(){
        this.axios.get(this.usersURL).then( res => {
            this.users = res.data
        } )
    },
    red(post){
        this.$router.push(`/profile/${post.author}`)
    }
  },
  watch : {
      $route(){
        this.getPosts()
        this.getUsers()
      }
  },
  mounted(){
    this.getPosts()
    this.getUsers()
  }
}
</script>
