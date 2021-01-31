<template>
  <v-dialog max-width="800" persistent v-model="dialog">
    <v-card>
      <v-card-title>Add New Shift</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="mt-2">
          <v-col cols="6">
            <v-row no-gutters>
              <v-col cols="12">Select Date</v-col>
              <v-col cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row no-gutters>
              <v-col cols="12">Select Period</v-col>
              <v-col cols="12"
                ><v-select
                  v-model="shiftPeriod"
                  :items="shiftPeriods"
                ></v-select
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row no-gutters class="text-end">
          <v-col offset="8" cols="4">
            <v-btn @click="dialog = false" class="mr-4">Cancel</v-btn>
            <v-btn @click="addShift(date, shiftPeriod)" color="primary"
              >add</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" color="red" top
      >All input must be filled</v-snackbar
    >
  </v-dialog>
</template>

<script lang="ts">
import moment from "moment";
export default {
  props: {
    value: { required: true, type: Boolean },
  },
  data: () => ({
    menu: false,
    date: "",
    shiftPeriods: [
      { text: "First Shift (09.00 - 15.00)", value: "first" },
      { text: "Second Shift (15.00 - 23.59)", value: "second" },
    ],
    shiftPeriod: "",
    snackbar: false,
  }),
  methods: {
    //  adding new unassigned shift
    addShift(date: string, shiftPeriod: string) {
      if (!date || !shiftPeriod) {
        this.snackbar = true;
        return;
      }
      const param = {
        date: moment(date).format("MM/DD/YYYY"),
        period: shiftPeriod,
      };
      this.$store.dispatch("addShift", param).then(() => {
        this.dialog = false;
      });
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog: boolean) {
        this.$emit("input", dialog);
      },
    },
  },
};
</script>

<style>
</style>