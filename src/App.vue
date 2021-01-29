<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Roster app</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Shifts />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Shifts from "@/pages/Shifts.vue";

export default Vue.extend({
  name: "App",

  components: {
    Shifts,
  },

  data: () => ({
    //
  }),
});
</script>
