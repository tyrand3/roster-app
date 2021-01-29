<template>
  <v-dialog max-width="800" persistent v-model="dialog">
    <v-card>
      <v-card-title>{{ mode }} Shift</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" class="pb-0 mb-0 mt-4">
            <span>Select Employee</span>
          </v-col>
          <v-col cols="8"
            ><v-select
              v-model="employeeId"
              class="mt-0 pb-0"
              :items="employees"
              item-value="id"
              item-text="name"
            ></v-select
          ></v-col>
          <v-col cols="8">
            <span>Select Day</span>
          </v-col>
          <v-col cols="8">
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
            </v-menu>
          </v-col>
          <v-col cols="5">
            <span>Select Start Time</span>
          </v-col>
          <v-col cols="5">
            <span>Select End Time</span>
          </v-col>
          <v-col cols="5">
            <v-menu
              ref="timeStartMenuPicker"
              v-model="timeStartPicker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeStart"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeStart"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeStartPicker"
                v-model="timeStart"
                format="ampm"
                full-width
                @click:minute="$refs.timeStartMenuPicker.save(timeStart)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="5">
            <v-menu
              ref="timeEndMenuPicker"
              v-model="timeEndPicker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeEnd"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeEnd"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeEndPicker"
                v-model="timeEnd"
                full-width
                @click:minute="$refs.timeEndMenuPicker.save(timeEnd)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row no-gutters class="text-end">
          <v-col offset="8" cols="4">
            <v-btn @click="closeWindow()" class="mr-4">Cancel</v-btn>
            <v-btn
              v-if="mode === 'Add'"
              color="primary"
              @click="submitShift(employeeId, timeStart, timeEnd, date)"
              >Add</v-btn
            >
            <v-btn
              v-else-if="mode === 'Update'"
              color="secondary"
              :disabled="true"
              @click="updateShift(employeeId, timeStart, timeEnd, date)"
            >
              Update
            </v-btn>
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
import Shift from "@/models/Shift.vue";
import moment from "moment";
export default Vue.extend({
  props: {
    value: { required: true, type: Boolean }, //  v-model for dialog window
    employees: { required: true, type: Array }, //  populating the employees select
    shiftUpdateData: { required: false, type: Object }, //  pre fill input for updating shift
  },
  created() {
    this.dialog = this.value;
    if (this.shiftUpdateData.employeeId) {
      this.date = moment(this.shiftUpdateData.date).format("YYYY-MM-DD");
      this.employeeId = this.shiftUpdateData.employeeId;
      this.timeStart = this.shiftUpdateData.workHour.split("-")[0];
      this.timeStart = this.timeStart.trim();
      this.timeEnd = this.shiftUpdateData.workHour.split("-")[1];
      this.timeEnd = this.timeEnd.trim();
      this.mode = "Update";
    } else this.mode = "Add";
    //  this.$refs.menu.save(this.date);
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog) {
        this.$emit("input", dialog);
        console.log(dialog);
      },
    },
  },
  methods: {
    closeWindow() {
      this.dialog = false;
    },
    updateShift(
      employeeId: string,
      timeStart: string,
      timeEnd: string,
      date: string
    ) {
      console.log(timeStart, timeEnd, date, employeeId);
      //  methods for updating individual shift
    },
    submitShift(
      employeeId: string,
      timeStart: string,
      timeEnd: string,
      date: string
    ) {
      if (!employeeId || !timeStart || !timeEnd || !date) {
        // simple validation to check all the input if its empty
        this.snackbar = true;
        return;
      }

      const param = {
        employeeId: employeeId,
        date: moment(date).format("MM/DD/YYYY"),
        time: timeStart + " - " + timeEnd,
      };
      this.$store.dispatch("addEmployeeShift", param).then(() => {
        this.dialog = false;
      });
    },
  },
  data: () => ({
    mode: "",
    employeeId: "",
    timeStart: "",
    timeStartPicker: false,
    timeEnd: "",
    timeEndPicker: false,
    date: "",
    datePicker: false,
    menu: null,
    snackbar: false,
  }),
});
</script>