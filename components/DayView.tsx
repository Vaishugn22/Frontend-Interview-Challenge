'use client';
import React from 'react';
import { Appointment, Doctor } from '@/types';
import { parseISO, format, differenceInMinutes } from 'date-fns';

interface Props {
  appointments: Appointment[];
  selectedDate: Date;
  doctor: Doctor;
}

// Generate 30-minute time slots from 8:00 to 18:00
const TIME_SLOTS = Array.from({ length: 20 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

// Define colors for appointment types
const TYPE_COLORS: Record<string, string> = {
  Checkup: '#3b82f6',       // Blue
  Consultation: '#10b981',  // Green
  'Follow-up': '#f59e0b',   // Amber
  Procedure: '#8b5cf6',     // Purple
};

export const DayView: React.FC<Props> = ({ appointments, selectedDate, doctor }) => {
  // Get appointments that fall into a given time slot
  const getAppointmentsForSlot = (slot: string) => {
    const [hour, minute] = slot.split(':').map(Number);
    const slotStart = new Date(selectedDate);
    slotStart.setHours(hour, minute, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);

    return appointments.filter((apt) => {
      const start = parseISO(apt.startTime);
      const end = parseISO(apt.endTime);
      return (start >= slotStart && start < slotEnd) || (start <= slotStart && end > slotStart);
    });
  };

  // Render multiple appointments in the same slot side by side
  const renderAppointments = (slotAppointments: Appointment[]) => {
    return slotAppointments.map((apt, index) => {
      const duration = differenceInMinutes(parseISO(apt.endTime), parseISO(apt.startTime));
      return (
        <div
          key={apt.id}
          className="absolute top-1 left-0 px-2 py-1 rounded text-white text-xs font-medium whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: TYPE_COLORS[apt.type] || '#6b7280',
            width: `${90 / slotAppointments.length}%`,
            left: `${(index * 100) / slotAppointments.length}%`,
          }}
        >
          {`${apt.type} (${duration} min)`}
        </div>
      );
    });
  };

  return (
    <div className="overflow-auto border rounded-md bg-white shadow-sm">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
        </div>
        <div className="text-gray-500 font-medium">{format(selectedDate, 'PPPP')}</div>
      </div>

      {/* Time slots table */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] border-collapse w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b text-sm">
              <th className="w-24 border-r px-3 py-2 font-medium">Time</th>
              <th className="px-3 py-2 font-medium">Appointments</th>
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot, index) => {
              const slotAppointments = getAppointmentsForSlot(slot);
              return (
                <tr key={slot} className="border-b hover:bg-gray-50 transition">
                  <td className="border-r px-3 py-2 font-mono text-gray-700 text-sm">{slot}</td>
                  <td className="px-3 py-3 relative h-12">
                    {slotAppointments.length > 0 ? (
                      renderAppointments(slotAppointments)
                    ) : (
                      <span className="text-gray-400 italic text-sm">
                        {index % 2 === 0 ? '—' : 'Available'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
