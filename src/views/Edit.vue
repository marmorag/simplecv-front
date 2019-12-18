<template>
  <v-container>
    <v-layout row wrap>
      <v-tabs class="elevation-2" dark>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-skills">
          Skills
        </v-tab>
        <v-tab href="#tab-socials">
          Socials
        </v-tab>
        <v-tab href="#tab-content">
          Content
        </v-tab>

        <v-tab-item value="tab-socials">
          <v-card flat tile>
            <EditSocials />
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-skills">
          <v-card flat tile>
            <EditSkills />
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-content">
          <v-card flat tile>
            <EditContent />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-layout>
  </v-container>
</template>

<script>

  import EditSocials from '../components/EditSocials';
  import EditSkills from '../components/EditSkills';
  import EditContent from '../components/EditContent';

export default {
  name: 'Edit',
  components: {
    EditSocials,
    EditSkills,
    EditContent,
  }
}
</script>
