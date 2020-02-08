<template>
    <div v-if= "$store.getters.getPosts && $store.getters.getUsers" >
        <v-card 
            v-for="(post, index) in $store.getters.getPosts.reverse()" 
            :key="index" 
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
                    @click="$router.push(`/profile/${post.author}`)"
                    v-if="$store.getters.getUsers[post.author - 1]"
                    >
                <v-icon class="mr-2"> mdi-account-badge-horizontal </v-icon> 
                {{ $store.getters.getUsers[post.author - 1].name }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'home',
  methods : {

  }
}
</script>
