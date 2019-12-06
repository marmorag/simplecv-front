<template>
    <v-layout row wrap>
        <v-flex md6 offset-md3>
            <v-content>
                <v-alert v-model="error" type="error" dismissible>
                    Failed to log you in : {{ errorMessage }}
                </v-alert>
                <v-card flat>
                    <v-card-title>
                        <v-layout row wrap>
                            <v-flex md2>
                                <span class="headline">Log in</span>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <LoginForm v-model="auth_user" @login="handleLogin()"></LoginForm>
                    </v-card-text>
                </v-card>
            </v-content>
        </v-flex>
    </v-layout>
</template>

<script>
    import LoginForm from '../components/LoginForm.vue';

    export default {
        components: {
            LoginForm,
        },
        data() {
            return {
                // Error display
                error: false,
                errorMessage: '',
                // Login form handling
                auth_user: {
                    login: '',
                    password: '',
                },
            }
        },
        methods: {
            handleLogin() {
                this.$store.dispatch('auth/authUser', {username: this.auth_user.login, password: this.auth_user.password})
                    .then(() => {
                        this.$router.push({name: 'home'})
                    })
                    .catch(response => {
                        this.errorMessage = response.detail;
                        this.error = true;
                    });
            },
        },
    };
</script>
