<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10" color="deep-purple darken-4" shaped dark>
            <v-card-title>
                Создайте новую запись
            </v-card-title>

             <v-text-field
                label="Заглавие"
                v-model="title"
                outlined
                rounded
            ></v-text-field>

            <v-textarea
                label="Что нового?"
                v-model="body"
                outlined
                rounded
                ></v-textarea>
           
            <v-btn @click="create" color="white" light>
                Создать
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        data : () => {
            return {
                title : '',
                body : '',
                id : -1,
            }
        },
        methods: {
            async create(){
                await this.updID()
                if(this.title.replace(/\s/g,"") != "" && this.body.replace(/\s/g,"") != ""){
                    await this.$store.dispatch('updateState', 
                    [ 'addPost', 
                        { 
                            'title'  : this.title,
                            'body'   : this.body,
                            'author' : parseInt(this.id) + 1,
                        } 
                    ])
                    this.$router.push('/')
                }
            },
            updID(){
                this.id = this.$store.getters.getCID
                console.log('new id ', this.id)
            }
        },
        mounted(){
            this.updID
        },
        watch : {
            $route(){
                this.updID
            }
        }
    }
</script>

<style>

</style>