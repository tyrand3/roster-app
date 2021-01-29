<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="2">
        <v-btn block append-icon="add" color="primary" @click="openShiftDialog"
          >add Shift</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="font-weight-bold">
      <v-col cols="1" />
      <v-col cols="1" v-for="day in getCurrentWeekDays" :key="day">{{
        day
      }}</v-col>
    </v-row>
    <v-row v-for="position in positions" :key="position.value">
      <v-col cols="12">
        <h3 :class="`${position.color}--text`">{{ position.text }}</h3>
      </v-col>
      <template v-for="employee in employees">
        <v-col
          v-if="employee.position === position.value"
          :key="employee.name"
          cols="12"
        >
          <v-row>
            <v-col cols="1">{{ employee.name }}</v-col>
            <v-col
              cols="1"
              v-for="(day, dayIndex) in getCurrentWeekDays"
              :key="dayIndex"
            >
              <template v-for="(shift, shiftIndex) in employee.shiftsThisWeek">
                <v-card
                  :key="shiftIndex"
                  @click="updateEmployeeShiftDialog(employee.id, shift)"
                  v-if="shift.date === day"
                  :class="`${position.color} mb-1 pa-1 clickable`"
                >
                  <v-card-text v-if="shift.date === day">
                    {{ shift.workHour }}
                  </v-card-text>
                </v-card>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
    <shift-add
      v-if="shiftDialog"
      v-model="shiftDialog"
      :shiftUpdateData="shiftUpdateData"
      :employees="employees"
      :weekdays="getCurrentWeekDays"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import shiftAdd from "@/components/ShiftAdd.vue";
import Shift from "@/models/Shift.vue";
export default Vue.extend({
  components: {
    shiftAdd,
  },
  name: "Shifts",
  created() {
    this.resetEmployeeShiftData();
  },
  computed: {
    getCurrentWeekDays() {
      const days = [];
      for (let i = 0; i < 8; i++) {
        days.push(moment().startOf("week").add(i, "days").format("MM/DD/YYYY"));
      }
      return days;
    },
    employees() {
      return this.$store.state.employees;
    },
  },
  methods: {
    openShiftDialog() {
      this.shiftDialog = true;
      this.shiftUpdateData = {};
    },
    updateEmployeeShiftDialog(employeeId: string, shift: Shift) {
      this.shiftDialog = true;
      this.shiftUpdateData = { ...shift, employeeId: employeeId };
    },
    resetEmployeeShiftData() {
      this.$store.dispatch("resetEmployeeShiftData");
    },
  },
  data: () => ({
    shiftDialog: false,
    shiftUpdateData: {},
    message: "",
    positions: [
      { text: "Chef", value: "chef", color: "yellow" },
      { text: "Waiter", value: "waiter", color: "blue" },
      { text: "Manager", value: "manager", color: "orange" },
    ],
  }),
});
</script>

<style scoped>
.hide {
  display: none;
}
.clickable {
  cursor: pointer;
}
</style>