<template>
    <div v-if="profile">
        <v-card
            color="#fafafa"
            flat
            width="900"
            class="mx-auto my-2 px-4"
            
            >
            <v-row class="text-left">
                <v-col cols="10">
                    <h1 class="green--text text--darken-2">
                        <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                        {{profile.name}}
                    </h1>
                </v-col>
            </v-row>
            <v-row class="text-left">
                <v-col cols="2">
                    <img :src="profile.photo" style="max-width: 100%">
                </v-col>
                <v-col cols="10" class="text-left">
                    <p>
                        Веб-сайт: <a :href="'http://' + profile.website" target="_blank">{{profile.website}}</a>
                    </p>
                    <p>
                        E-mail: <a :href="'mailto:' + profile.email">{{profile.email}}</a>
                    </p>
                    <p>
                        Город: {{ profile.city}}
                    </p>
                    <p>
                        Место работы: {{profile.company}}
                    </p>
                </v-col>
            </v-row>
        </v-card>
        <v-divider width="1050" class="mx-auto"></v-divider>
        <div 
            v-for="(post, index) in posts" 
            :key="index" 
            >
            <v-card 
                v-if="post != -404"
                width="900"
                class = "my-2 mx-auto"
                min-height="150"
                > 
                <v-card-title>
                    {{post.title}}
                </v-card-title>
                <v-card-text>
                    {{post.body}}
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        data : () => ({
          profile : [],
          posts: [],
        }),
        methods: {
            loadUser(){
                this.profile = this.$store.getters.getUsers[ this.$route.params.id - 1 ]
                console.log('prof : ',this.profile)
                this.posts = this.$store.getters.getPosts.map( el => el.author == this.$route.params.id ? el : -404)
                console.log('posts : ',this.posts)
                console.log('posts in store', this.$store.getters.getPosts)
            }
        },
        mounted(){
            this.loadUser()
        },
        watch: {
            $route(){
                this.loadUser()
            }
        }
    }
</script>