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
        //http://188.225.47.187/api/jsonstorage/76ce57a84a3263d8b9a42bad496071b2
        data : () => ({
            title : '',
            body : '',
            postUrl : 'http://188.225.47.187/api/jsonstorage/ba3c33e494c72686bff15526dee0199f',
        }),
        methods: {
            create(){
                if(this.title.replace(/\s/g,"") != "" && this.body.replace(/\s/g,"") != ""){
                    this.$emit('sendPost', {'title' : this.title, 'body' : this.body})
                }
            }
        }
    }
</script>

<style>

</style>