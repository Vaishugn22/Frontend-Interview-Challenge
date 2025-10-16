export type AppointmentType = 'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  startTime: string; // e.g., "08:00"
  endTime: string;   // e.g., "18:00"
}

export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  type: AppointmentType;
}
