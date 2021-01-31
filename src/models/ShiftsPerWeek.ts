import Shift from '@/models/Shift'

export default class ShiftPerWeek {
  date: String;
  firstShift: Shift;
  secondShift: Shift;

  constructor() {
    this.date = '';
    this.firstShift = {
      rosterId: '',
      startTime: '',
      endTime: ''
    };
    this.secondShift = {
      rosterId: '',
      startTime: '',
      endTime: ''
    };
  }
}