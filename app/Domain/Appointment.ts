import { TimeSlot } from './TimeSlot';
import { Appointment as AppointmentType } from '@/types';

export class Appointment {
  constructor(public data: AppointmentType) {}

  getTimeSlot(): TimeSlot {
    return new TimeSlot(new Date(this.data.startTime), new Date(this.data.endTime));
  }

  overlapsWith(other: Appointment): boolean {
    return this.getTimeSlot().overlaps(other.getTimeSlot());
  }
}
