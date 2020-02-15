<template>
    <div v-if="users" fluid class="d-flex flex-wrap justify-center">
        <v-card 
            v-for="(user, index) in users" 
            :key="index"
            min-width="600"
            class="mb-4 ml-4 px-3 pb-3" 
            hover
            >
           <v-row class="text-left">
                <v-col cols="10">
                    <h1 class="green--text text--darken-2">
                        <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                        {{ user.name }}
                    </h1>
                </v-col>
            </v-row>
            <v-row class="text-left">
                <v-col cols="2">
                    <v-img v-if="user" :src="user.photo" max-width="100"> </v-img>
                </v-col>
                
                <v-divider vertical></v-divider>
                
                <v-col cols="9" class="text-left">
                    <p>
                        Город: {{ user.city }}
                    </p>
                    <p>
                        Место работы: {{ user.company }}
                    </p>
                </v-col>
            </v-row>

            <v-card-actions>
                <v-btn
                    outlined
                    color="green"
                    @click="$router.push(`/profile/${ user.id }`)"
                    >
                <v-icon class="mr-2"> mdi-account-badge-horizontal </v-icon> Перейти в профиль
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
import {mapState} from 'vuex'

export default {
    data : () =>({
        users :[],
    }),
    methods : {
        loadUsers(){
            this.users = this.$store.getters.getUsers
            console.log(this.users)
        }
    },
    mounted(){
        this.loadUsers()
    },
    watch : {
        $route(){
            this.loadUsers()
        }
    },
    computed: mapState({

    }),
}
</script>