<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10" color="deep-purple darken-4" shaped dark>
            <v-card-title>
                Войдите в аккаунт
            </v-card-title>

            <v-text-field
                label="Введите логин"
                v-model="login"
                outlined
                rounded
            ></v-text-field>

            <v-text-field
                label="Введите пароль"
                v-model="password"
                outlined
                rounded
                type="password"
            ></v-text-field>

            <v-btn @click="authenticate" color="white" light>
                Войти
            </v-btn>

            <v-btn @click="register" color="white" class="ml-2" light>
                Регистрация
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        data : () => ({
            login : '',
            password : '',
        }),
        methods : {
            authenticate(){
                this.axios.get(this.$store.getters.userURL).then( res => {
                    this.$store.dispatch('updateState', [ 'AUsers', res.data ])
                    let found = false
                    const users = res.data
                    for(let each in users){
                        if(this.login == users[each].login && this.password == users[each].password){
                            this.$emit('login', each)
                            this.$router.push('/')
                            found = true
                            break
                        }
                    }
                    if(!found) window.alert('Неверный логин или пароль')
                } )
            },
            register(){
                this.$emit('login', 'registering')
                this.$router.push('/register')
            }
        }
    }
</script>

<style>

</style>