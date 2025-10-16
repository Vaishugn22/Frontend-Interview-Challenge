import { useState, useEffect } from 'react';
import { Appointment } from '@/types';
import { AppointmentService } from '@/services/appointmentService';

export const useAppointments = (doctorId: number, date: Date) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = AppointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
    setAppointments(data);
    setLoading(false);
  }, [doctorId, date]);

  return { appointments, loading };
};
