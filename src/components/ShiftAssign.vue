<template>
  <v-dialog max-width="800" persistent v-model="dialog">
    <v-card>
      <v-card-title>{{ mode }} Shift</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" class="mt-4">
            <v-row>
              <v-col cols="12">Select Roster</v-col>
              <v-col cols="12" md="6"
                ><v-select
                  v-model="roster"
                  class="mt-0 mb-0 pb-0"
                  :items="rosters"
                  item-value="id"
                  item-text="name"
                  return-object
                ></v-select
              ></v-col>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>{{ roster.name }} Info</v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        v-for="employee in roster.employees"
                        :key="employee.id"
                        >{{ `${employee.name} - ${employee.position}` }}</v-col
                      >
                    </v-row>
                  </v-card-text></v-card
                ></v-col
              >
            </v-row>
          </v-col>

          <v-col cols="12" md="8">
            <v-row no-gutters>
              <v-col cols="12">Date</v-col>
              <v-col cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  :disabled="true"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :disabled="true"
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
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row no-gutters>
              <v-col>Shift Period</v-col>
              <v-col cols="12">
                <v-select
                  @change="onShiftPeriodChanged"
                  :disabled="true"
                  v-model="shiftPeriod"
                  :items="shiftPeriods"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row no-gutters class="text-end">
          <v-col offset="8" cols="4">
            <v-btn @click="closeWindow()" class="mr-4">Cancel</v-btn>
            <v-btn
              color="primary"
              @click="assignShift(roster, shiftPeriod, date)"
              >{{ mode }}</v-btn
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
import Vue from "vue";
import moment from "moment";
export default Vue.extend({
  props: {
    value: { required: true, type: Boolean }, //  v-model for dialog window
    shiftUpdateData: { required: false, type: Object }, //  pre fill input for updating shift
  },
  created() {
    this.dialog = this.value;
    if (this.shiftUpdateData.date && this.shiftUpdateData.shiftPeriod) {
      this.date = moment(this.shiftUpdateData.date).format("YYYY-MM-DD");
      this.shiftPeriod = this.shiftUpdateData.shiftPeriod;
    }
    if (this.shiftUpdateData.rosterId) {
      const rosterIndex = this.rosters.findIndex((roster: any) => {
        return roster.id === this.shiftUpdateData.rosterId;
      });
      this.roster = JSON.parse(JSON.stringify(this.rosters[rosterIndex]));
      this.mode = "Update";
    } else this.mode = "Assign";
  },
  computed: {
    rosters() {
      return this.$store.state.rosters;
    },
    dialog: {
      get() {
        return this.value;
      },
      set(dialog: boolean) {
        this.$emit("input", dialog);
      },
    },
  },
  methods: {
    closeWindow() {
      this.dialog = false;
    },
    assignShift(roster: any, shiftPeriod: string, date: string) {
      //  assign roster to shift
      if (!roster || !shiftPeriod || !date) {
        // simple validation to check all the input if its empty
        this.snackbar = true;
        return;
      }

      const param = {
        rosterId: roster.id,
        shiftPeriod: shiftPeriod,
        date: moment(date).format("MM/DD/YYYY"),
      };

      this.$store.dispatch("assignShiftToRoster", param).then(() => {
        this.dialog = false;
      });
    },
    onShiftPeriodChanged(shiftPeriod: string) {
      if (shiftPeriod === "first") {
        this.timeStart = "09.00";
        this.timeEnd = "15.00";
      } else {
        this.timeStart = "15.00";
        this.timeEnd = "21.00";
      }
    },
  },
  data: () => ({
    mode: "",
    timeStart: "",
    timeEnd: "",
    date: "",
    datePicker: false,
    menu: null,
    snackbar: false,
    shiftPeriods: [
      { text: "First Shift (09.00 - 15.00)", value: "first" },
      { text: "Second Shift (15.00 - 23.59)", value: "second" },
    ],
    roster: "",
    shiftPeriod: "",
  }),
});
</script>
