<template>
    <v-form ref="loginForm" lazy-validation class="mx-3">
        <v-text-field @keypress.enter="login()" v-model="$attrs.value.login" append-icon="mdi-account" :rules="rules.globals" placeholder="Email"></v-text-field>
        <v-text-field @keypress.enter="login()" v-model="$attrs.value.password" append-icon="mdi-lock-question" :rules="rules.globals" placeholder="Password" type="password"></v-text-field>
        <v-btn @click="login()">Login</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                rules: {
                    globals: [
                        v => !!v || 'Field is required',
                    ],
                },
            }
        },
        methods: {
            login() {
                if (this.$refs.loginForm.validate()) {
                    this.$emit('login');
                }
            }
        }
    };
</script>
