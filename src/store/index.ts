import Vuex from 'vuex'
import Vue from 'vue'
import Employee from '@/models/Employee'
import Shift from '@/models/Shift'
//load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: Array<Employee>()
  },

  mutations: {
    addEmployeeShift(state, param) {
      const employeeIndex = state.employees.findIndex(employee => employee.id === param.employeeId)
      state.employees[employeeIndex].shiftsThisWeek.push({ workHour: param.time, date: param.date })
    },
    resetEmployeeShiftData(state, employees: Array<Employee>) {
      state.employees = employees
    },
    updateEmployeeShift(state, employeeShift) {
      //  add methods here to update employee shift
    }
  },
  actions: {
    updateEmployeeShift(context, employeeShift) {
      //  add methods here to update employee shift
      context.commit('updateEmployeeShift', employeeShift);
    },
    addEmployeeShift(context, param) {
      context.commit('addEmployeeShift', param);
    },
    resetEmployeeShiftData(context) {
      //  populate initial data
      context.commit('resetEmployeeShiftData', [
        {
          id: '1',
          name: "Michael",
          position: "chef",
          shiftsThisWeek: [
          ],
        },
        {
          id: '2',
          name: "Michelle",
          position: "chef",
          shiftsThisWeek: [
          ],
        },
        {
          id: '3',
          name: "Justin",
          position: "waiter",
          shiftsThisWeek: [
          ],
        },
        {
          id: '4',
          name: "Daniel",
          position: "manager",
          shiftsThisWeek: [
          ],
        },
        {
          id: '5',
          name: "Gabby",
          position: "chef",
          shiftsThisWeek: [
          ],
        },
        {
          id: '6',
          name: "Hiro",
          position: "waiter",
          shiftsThisWeek: [
          ],
        },
        {
          id: '7',
          name: "Ana",
          position: "waiter",
          shiftsThisWeek: [
          ],
        },
        {
          id: '8',
          name: "Ega",
          position: "manager",
          shiftsThisWeek: [
          ],
        },
      ]);
    },
  }
});