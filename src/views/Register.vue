<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10" color="deep-purple darken-4" shaped dark>
            <v-card-title>
               Регистрация
            </v-card-title>

            <v-divider class="mx-auto my-2"  color="green darken-4"></v-divider>

            <v-text-field
                label="Введите логин"
                v-model="login"
                outlined
                rounded
            ></v-text-field>

            <v-text-field
                label="Введите пароль"
                v-model="password1"
                outlined
                rounded
                type="password"
            ></v-text-field>

            <v-text-field
                label="Подтвердите пароль"
                v-model="password2"
                outlined
                rounded
                type="password"
            ></v-text-field>

            <v-text-field
                label="Введите имя"
                v-model="name"
                outlined
                rounded
                type="text"
            ></v-text-field>

             <v-text-field
                label="Website"
                v-model="website"
                outlined
                rounded
                type="text"
            ></v-text-field>
            
             <v-text-field
                label="Email"
                v-model="email"
                outlined
                rounded
                type="text"
            ></v-text-field>
             
             <v-text-field
                label="Ваш город"
                v-model="city"
                outlined
                rounded
                type="text"
            ></v-text-field>

            <v-text-field
                label="Компания"
                v-model="comp"
                outlined
                rounded
                type="text"
            ></v-text-field>

            <v-text-field
                label="Фото"
                v-model="photo"
                outlined
                rounded
                type="text"
            ></v-text-field>

            <v-btn @click="register" color="white" light>
                Подтвердить
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        data : () => ({
            usersURL : 'http://188.225.47.187/api/jsonstorage/f1447a62dcaba92ed1ddd2d652b63a8a',
            login : '',
            password1 : '',
            password2 : '',
            name : '',
            website : '',
            email : '',
            city : '',
            comp : '',
            photo : '',
        }),
        methods : {
            register(){
                if (!this.login)    this.alert('Введите логин')
                if (!this.name)     this.alert('Введите Имя')
                if (!this.password1)this.alert('Введите пароль')

                if (this.password1 === this.password2 && this.login && this.name){
                    const newid = this.newid()
                    const tmp = {
                        'id' : newid,
                        'login' : this.login,
                        'password' : this.password1,
                        'name' : this.name,
                        'website' : this.website,
                        'email' : this.email,
                        'city' : this.city,
                        'comp' : this.comp,
                        'photo' : this.photo,
                    }
                    this.$emit('login', newid - 1)
                    this.$store.dispatch('updateState', [ 'addUser', tmp ])
                    this.$router.push('/')
                }
            },
            newid(){
                const users = this.$store.getters.getUsers
                const lastUser = users[users.length - 1].id + 1
                return lastUser
            }
        }
    }
</script>
