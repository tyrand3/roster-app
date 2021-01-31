import Employee from '@/models/Employee'
export default class Roster {
  id: String;
  name: String;
  employees: Array<Employee>;

  constructor() {
    this.id = ''
    this.name = ''
    this.employees = []
  }
}