import { Doctor, Appointment } from '@/types';

export const MOCK_DOCTORS: Doctor[] = [
  { id: 1, name: 'Dr. James Wilson', specialty: 'Dermatology', startTime: '08:00', endTime: '18:00' },
  { id: 2, name: 'Dr. Sarah Chen', specialty: 'Cardiology', startTime: '08:00', endTime: '18:00' },
  { id: 3, name: 'Dr. Mark Lee', specialty: 'Neurology', startTime: '09:00', endTime: '17:00' },
  { id: 4, name: 'Dr. Emily Davis', specialty: 'Pediatrics', startTime: '08:00', endTime: '17:00' },
  { id: 5, name: 'Dr. Michael Brown', specialty: 'Orthopedics', startTime: '08:00', endTime: '18:00' },
  { id: 6, name: 'Dr. Laura Smith', specialty: 'Endocrinology', startTime: '09:00', endTime: '17:00' },
  { id: 7, name: 'Dr. Daniel Garcia', specialty: 'Ophthalmology', startTime: '08:00', endTime: '16:00' },
  { id: 8, name: 'Dr. Jessica Martinez', specialty: 'Psychiatry', startTime: '08:00', endTime: '18:00' },
  { id: 9, name: 'Dr. Kevin Johnson', specialty: 'Gastroenterology', startTime: '08:30', endTime: '17:30' },
  { id: 10, name: 'Dr. Amanda Wilson', specialty: 'Rheumatology', startTime: '08:00', endTime: '18:00' },
  { id: 11, name: 'Dr. Brian Thomas', specialty: 'Neurology', startTime: '09:00', endTime: '17:00' },
  { id: 12, name: 'Dr. Olivia Anderson', specialty: 'Cardiology', startTime: '08:00', endTime: '18:00' },
  { id: 13, name: 'Dr. Joshua Lewis', specialty: 'Dermatology', startTime: '08:00', endTime: '17:00' },
  { id: 14, name: 'Dr. Megan Scott', specialty: 'Pediatrics', startTime: '08:00', endTime: '17:00' },
  { id: 15, name: 'Dr. Matthew Young', specialty: 'Orthopedics', startTime: '08:30', endTime: '17:30' },
  { id: 16, name: 'Dr. Sophia King', specialty: 'Endocrinology', startTime: '09:00', endTime: '17:00' },
  { id: 17, name: 'Dr. Ryan Hall', specialty: 'Ophthalmology', startTime: '08:00', endTime: '16:00' },
  { id: 18, name: 'Dr. Grace Allen', specialty: 'Psychiatry', startTime: '08:00', endTime: '18:00' },
  { id: 19, name: 'Dr. Anthony Wright', specialty: 'Gastroenterology', startTime: '08:30', endTime: '17:30' },
  { id: 20, name: 'Dr. Isabella Hill', specialty: 'Rheumatology', startTime: '08:00', endTime: '18:00' },
];

// Appointment types
const TYPES: Array<'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure'> = [
  'Checkup', 'Consultation', 'Follow-up', 'Procedure'
];

// Patients
const PATIENTS: string[] = [
  'John Doe','Jane Smith','Michael Brown','Emily Davis','David Wilson','Sarah Johnson','Chris Lee','Olivia Martinez',
  'Daniel Garcia','Sophia Anderson','Joshua Lewis','Megan Scott','Matthew Young','Laura Thomas','Ryan Hall','Grace Allen',
  'Anthony Wright','Isabella Hill','Kevin King','Amanda Hill','Ethan Clark','Hannah Adams','Jacob Baker','Madison Carter',
  'Benjamin Evans','Abigail Turner','William Collins','Charlotte Foster','Alexander Morgan','Amelia Reed'
];

// Generate 4 appointments per doctor per day until 30th October
export const MOCK_APPOINTMENTS: Appointment[] = (() => {
  const appointments: Appointment[] = [];
  let id = 1;
  const startDate = new Date('2025-10-15');

  MOCK_DOCTORS.forEach((doctor) => {
    for (let day = 0; day <= (30 - 15); day++) { // 15th to 30th
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + day);

      for (let slot = 0; slot < 4; slot++) { // 4 patients per day
        const hour = 8 + slot * 2; // Example: 8:00, 10:00, 12:00, 14:00
        const startTime = new Date(date);
        startTime.setHours(hour, 0, 0, 0);
        const type = TYPES[Math.floor(Math.random() * TYPES.length)];
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + (type === 'Consultation' ? 60 : 30));

        const patientIndex = (id - 1) % PATIENTS.length;

        appointments.push({
          id: id++,
          doctorId: doctor.id,
          patientId: patientIndex + 1,
          type,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        });
      }
    }
  });

  return appointments;
})();
