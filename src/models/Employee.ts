import Shift from "./Shift";

export default class Employee {
  id: String;
  name: String;
  position: String;
  shiftsThisWeek: Array<Shift>;


  constructor() {
    this.id = ''
    this.name = '';
    this.position = '';
    this.shiftsThisWeek = []
  }
}