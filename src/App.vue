<template>
  <v-app>
    <v-app-bar app dark>

      <v-spacer></v-spacer>

      <v-btn icon to="home">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn v-if="!logged" icon to="login">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn v-if="logged" icon to="edit">
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>

      <v-btn v-if="logged" icon @click="handleLogout">
        <v-icon>mdi-lock</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">Keep in touch!</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="(social, index) in socials" :key="index" class="mx-4" dark icon>
            <v-btn icon :href="social.link">
              <v-icon size="24px">{{ social.icon }}</v-icon>
            </v-btn>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Guillaume Marmorat</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import socialsApi from "./api/socials.js";

export default {
  name: 'App',
  created() {
    this.fetchSocials();
  },
  data() {
    return {
      socials: []
    };
  },
  computed: {
    logged() {
      return this.$store.getters['auth/isUserLogged'];
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logoutUser');
      this.$router.push({ name: 'home' });
    },
    async fetchSocials() {
      let response = await socialsApi.fetchSocials();
      this.socials = response.data['hydra:member'];
    }
  }
};
</script>
