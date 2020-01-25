<template>
    <div v-if="users" fluid class="d-flex flex-wrap justify-center">
        <v-card 
            v-for="user in users" 
            :key="user.id"
            min-width="600"
            class="mb-4 ml-4 px-3 pb-3" 
            hover
            >
           <v-row class="text-left">
                <v-col cols="10">
                    <h1 class="green--text text--darken-2">
                        <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                        {{user.name}}
                    </h1>
                </v-col>
            </v-row>
            <v-row class="text-left">
                <v-col cols="2">
                    <v-img v-if="user" :src="`https://randomuser.me/api/portraits/men/${user.id }.jpg`"> </v-img>
                </v-col>
                
                <v-divider vertical></v-divider>
                
                <v-col cols="9" class="text-left">
                    <p>
                        Город: {{ user.address.city}}, {{ user.address.street}}
                    </p>
                    <p>
                        Место работы: {{user.company.name}}
                    </p>
                </v-col>
            </v-row>

            <v-card-actions>
                <v-btn
                    outlined
                    color="green"
                    :href="`/profile/${user.id}`"
                    >
                <v-icon class="mr-2"> mdi-account-badge-horizontal</v-icon> Перейти в профиль
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        data : () => ({
          users : [],
        }),
        methods:{
            loadListUsers(){
                this.axios.get('http://jsonplaceholder.typicode.com/users').then( res => {
                    this.users = res.data
                } ).catch( err => {
                    console.log('rrr', err)
                } )
            }
        },
        mounted(){
            this.loadListUsers()
        },
        watch: {
            $route(){
                this.loadListUsers()
            }
        }
    }
</script>

<style scoped>

</style>