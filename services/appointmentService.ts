import { Appointment } from '@/types';
import { MOCK_APPOINTMENTS } from '@/data/mockData';

export class AppointmentService {
  static getAppointmentsByDoctorAndDate(doctorId: number, date: Date): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return (
        apt.doctorId === doctorId &&
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  }
}
