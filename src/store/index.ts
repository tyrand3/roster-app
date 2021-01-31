import Vuex from 'vuex'
import Vue from 'vue'
import Employee from '@/models/Employee'
import Shift from '@/models/Shift'
//load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: Array<Employee>(),
    shifts: Array<Shift>(),
    shiftsPerWeek: [],
    rosters: [
      {
        name: 'Roster A',
        id: 1,
        employees: [
          {
            id: 1,
            name: "Michael",
            position: "chef",
          },
          {
            id: 2,
            name: "Michelle",
            position: "waitress",
          },
          {
            id: 3,
            name: "Brenda",
            position: "waitress",
          },
          {
            id: 4,
            name: "Stephanie",
            position: "waitress",
          },
          {
            id: 5,
            name: "Kim",
            position: "manager",
          }
        ],
      },
      {
        id: 2,
        employees: [
          {
            id: 6,
            name: "Nicole",
            position: "chef",
          },
          {
            id: 7,
            name: "Anna",
            position: "waitress",
          },
          {
            id: 8,
            name: "Seyren",
            position: "waitress",
          },
          {
            id: 9,
            name: "Henry",
            position: "waitress",
          },
          {
            id: 10,
            name: "Steven",
            position: "manager",
          }], name: 'Roster B'
      },
      {
        id: 3,
        employees:
          [
            {
              id: 11,
              name: "Lucky",
              position: "chef",
            },
            {
              id: 12,
              name: "Mason",
              position: "waitress",
            },
            {
              id: 13,
              name: "John",
              position: "waitress",
            },
            {
              id: 14,
              name: "Hiro",
              position: "waitress",
            },
            {
              id: 15,
              name: "Oni",
              position: "waitress",
            },
            {
              id: 16,
              name: "Ega",
              position: "manager",
            }], name: 'Roster C'
      },
      { id: 4, employees: [], name: 'Roster D' }
    ]
  },

  mutations: {
    assignShiftToRoster(state, param) {
      //  const rosterIndex = state.rosters.findIndex(roster => roster.id === param.rosterId)
      const shiftPerWeekDateIndex = state.shiftsPerWeek.findIndex(shift => param.date === shift.date)
      const data = {
        startTime: param.shiftPeriod === 'first' ? '09.00' : '15.00',
        endTime: param.shiftPeriod === 'first' ? '15.00' : '21.00',
        rosterId: param.rosterId
      }
      if (param.shiftPeriod === 'first') {
        state.shiftsPerWeek[shiftPerWeekDateIndex].firstShift = { ...data }
      }
      else state.shiftsPerWeek[shiftPerWeekDateIndex].secondShift = { ...data }
    },
    resetEmployeeShiftData(state, employees: Array<Employee>) {
      state.employees = employees
    },
    addShift(state, shift) {
      const shiftsPerWeekIndex = state.shiftsPerWeek.findIndex(shiftPerWeek => {
        return shiftPerWeek.date === shift.date
      })
      if (shift.period === 'first' && (state.shiftsPerWeek[shiftsPerWeekIndex] && !state.shiftsPerWeek[shiftsPerWeekIndex].firstShift)) {
        state.shiftsPerWeek[shiftsPerWeekIndex].firstShift = {
          "startTime": "09.00",
          "endTime": "15.00",
          "rosterId": null
        }
      } else if (shift.period === 'second' && (state.shiftsPerWeek[shiftsPerWeekIndex] && !state.shiftsPerWeek[shiftsPerWeekIndex].secondShift)) {
        state.shiftsPerWeek[shiftsPerWeekIndex].secondShift = {
          "startTime": "15.00",
          "endTime": "21.00",
          "rosterId": null
        }
      }
    }
  },
  actions: {
    addShift(context, shift) {
      //  add unassigned shift
      context.commit('addShift', shift);
    },
    assignShiftToRoster(context, param) {
      //  assign shift to a roster
      context.commit('assignShiftToRoster', param);
    },
    resetEmployeeShiftData(context) {
      //  populate initial data
      context.commit('resetEmployeeShiftData', [
        {
          id: '1',
          name: "Michael",
          position: "chef",
        },
        {
          id: '2',
          name: "Michelle",
          position: "chef",
        },
        {
          id: '3',
          name: "Justin",
          position: "waitress",
        },
        {
          id: '4',
          name: "Daniel",
          position: "manager",
        },
        {
          id: '5',
          name: "Gabby",
          position: "chef",
        },
        {
          id: '6',
          name: "Hiro",
          position: "waitress",
        },
        {
          id: '7',
          name: "Ana",
          position: "waitress",
        },
        {
          id: '8',
          name: "Ega",
          position: "manager",
        },
      ]);
    },
  }
});