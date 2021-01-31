<template>
  <v-container>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <h2>This Week Employee's Shift</h2>
      </v-col>
      <v-col cols="2">
        <v-btn
          block
          append-icon="add"
          color="primary"
          @click="openShiftAddDialog"
          >add Shift</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="font-weight-bold">
      <v-col cols="1">
        <v-row>
          <v-col cols="12"> </v-col>
          <v-col cols="12"> </v-col>
          <v-col cols="12"
            ><v-card class="elevation-0" height="125">
              09.00-15.00</v-card
            ></v-col
          >
          <v-col cols="12"
            ><v-card class="elevation-0" height="125">
              15.00-21.00</v-card
            ></v-col
          >
        </v-row>
      </v-col>
      <v-col cols="1" v-for="shift in shiftsPerWeek" :key="shift.date">
        <v-row>
          <v-col cols="12" class="text-center">{{ shift.date }}</v-col>
          <v-col cols="12" style="height: 150px">
            <v-card
              v-if="shift.firstShift && shift.firstShift.rosterId"
              height="125"
              @click="
                openShiftDialogWithDateRoster(
                  shift.firstShift.rosterId,
                  shift.date,
                  'first'
                )
              "
            >
              <v-card-text class="clickable">
                <v-row no-gutters>
                  <v-col cols="12">
                    {{ getRoster(shift.firstShift.rosterId).name }}</v-col
                  >
                  <v-col cols="12">{{
                    `${
                      getRoster(shift.firstShift.rosterId).employees.length
                    } employees`
                  }}</v-col>
                  <v-col cols="12">{{
                    `${shift.firstShift.startTime} - ${shift.firstShift.endTime}`
                  }}</v-col>
                </v-row></v-card-text
              ></v-card
            >
            <v-card
              height="125"
              color="rgb(0, 0, 0, 0.1)"
              v-else-if="shift.firstShift && !shift.firstShift.rosterId"
              @click="openShiftDialogWithDate(shift.date, 'first')"
              ><v-card-text class="white--text title text-center"
                >+</v-card-text
              ></v-card
            ></v-col
          >
          <v-col cols="12" style="height: 150px">
            <v-card
              v-if="shift.secondShift && shift.secondShift.rosterId"
              height="125"
              @click="
                openShiftDialogWithDateRoster(
                  shift.secondShift.rosterId,
                  shift.date,
                  'second'
                )
              "
            >
              <v-card-text class="clickable">
                <v-row no-gutters>
                  <v-col cols="12">
                    {{ getRoster(shift.secondShift.rosterId).name }}</v-col
                  >
                  <v-col cols="12">{{
                    `${
                      getRoster(shift.secondShift.rosterId).employees.length
                    } employees`
                  }}</v-col>
                  <v-col cols="12">{{
                    `${shift.secondShift.startTime} - ${shift.secondShift.endTime}`
                  }}</v-col>
                </v-row></v-card-text
              ></v-card
            >
            <v-card
              v-else-if="shift.secondShift && !shift.secondShift.rosterId"
              height="125"
              color="rgb(0, 0, 0, 0.1)"
              @click="openShiftDialogWithDate(shift.date, 'second')"
              ><v-card-text class="white--text title text-center"
                >+</v-card-text
              ></v-card
            ></v-col
          >
        </v-row>
      </v-col>
    </v-row>
    <shift-assign
      v-if="shiftDialog"
      v-model="shiftDialog"
      :shiftUpdateData="shiftUpdateData"
    />
    <shift-add v-if="shiftAddDialog" v-model="shiftAddDialog" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import ShiftAssign from "@/components/ShiftAssign.vue";
import ShiftAdd from "@/components/ShiftAdd.vue";
import Shift from "@/models/Shift.vue";
export default Vue.extend({
  components: {
    ShiftAssign,
    ShiftAdd,
  },
  name: "Shifts",
  computed: {
    shiftsPerWeek() {
      return this.$store.state.shiftsPerWeek;
    },
    rosters() {
      return this.$store.state.rosters;
    },
  },
  created() {
    this.setShiftThisWeek();
  },
  methods: {
    setShiftThisWeek() {
      this.$store.state.shiftsPerWeek = [];
      for (let i = 1; i < 8; i++) {
        this.$store.state.shiftsPerWeek.push({
          date: moment().startOf("week").add(i, "days").format("MM/DD/YYYY"),
        });
      }
    },
    getRoster(rosterId: string) {
      const rosterIndex = this.rosters.findIndex((roster: any) => {
        return roster.id === rosterId;
      });
      return this.rosters[rosterIndex];
    },
    openShiftAddDialog() {
      this.shiftAddDialog = true;
    },
    openShiftDialogWithDate(date: string, period: string) {
      this.shiftDialog = true;
      this.shiftUpdateData = { date: date, shiftPeriod: period };
    },
    openShiftDialogWithDateRoster(
      rosterId: string,
      date: string,
      period: string
    ) {
      this.shiftDialog = true;
      this.shiftUpdateData = {
        rosterId: rosterId,
        date: date,
        shiftPeriod: period,
      };
    },
  },
  data: () => ({
    shiftPerDay: 2,
    shiftDialog: false,
    shiftAddDialog: false,
    shiftUpdateData: {},
    positions: [
      { text: "Chef", value: "chef", color: "yellow" },
      { text: "Waitress", value: "waitress", color: "blue" },
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