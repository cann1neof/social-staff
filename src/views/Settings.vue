<template>
    <div v-if="prof">
        <v-row>
            <v-col cols="6">
                <v-card
                    color="#fafafa"
                    flat
                    width="900"
                    class="my-2 px-4"
                    
                    >
                    <v-row class="text-left">
                        <v-col cols="10">
                            <h1 class="green--text text--darken-2">
                                <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                                {{ prof.name }}
                            </h1>
                        </v-col>
                    </v-row>
                    <v-row class="text-left" id="info">
                        <v-col cols="2" id="avatar">
                            <v-img :src="prof.photo" style="max-width: 100%"> </v-img>
                        </v-col>
                        <v-col cols="10" class="text-left" >
                            <div class="my-3" id="web">
                                Веб-сайт: <a :href="'http://' + prof.website" target="_blank"> {{ prof.website }} </a> 
                            </div>
                            <div class="my-3" id="mail">
                                E-mail: <a :href="'mailto:' + prof.email"> {{ prof.email }} </a>
                            </div>
                            <div class="my-3" id="ct">
                                Город: {{ prof.city }}
                            </div>
                            <div class="my-3" id="work">
                                Место работы: {{ prof.company }}
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn color="red darken-4" dark @click="$emit('login', -1); $router.push('/login/')">
                    Выйти
                </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-card width="600px" class="mt-12 pa-10" color="deep-purple darken-4" shaped dark>
                        <v-card-title>
                        Настройки
                        </v-card-title>

                        <v-divider class="mx-auto mb-4"  color="white"></v-divider>

                        <v-text-field
                            label="Введите имя"
                            v-model="prof.name"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            label="Website"
                            v-model="prof.website"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>
                        
                        <v-text-field
                            label="Email"
                            v-model="prof.email"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>
                        
                        <v-text-field
                            label="Ваш город"
                            v-model="prof.city"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            label="Компания"
                            v-model="prof.company"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            label="Фото"
                            v-model="prof.photo"
                            outlined
                            rounded
                            type="text"
                        ></v-text-field>

                        <v-btn @click="confirm" color="white" light>
                            Подтвердить
                        </v-btn>

                    </v-card>
                </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data : () => ({
          prof : [],
          myId : -1,
        }),
        methods: {
            loadUser(){
                this.myId = this.$store.getters.getCID 
                this.prof = this.$store.getters.getUsers[this.myId]
            },
            confirm(){
                this.$store.dispatch('updateState', ['updateUser', this.prof])
                this.$router.push('/')
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