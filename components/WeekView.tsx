'use client';
import React from 'react';
import { Appointment, Doctor } from '@/types';
import {
  parseISO,
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  isSameDay,
} from 'date-fns';

interface Props {
  appointments: Appointment[];
  selectedDate: Date;
  doctor: Doctor;
}

// 30-min slots from 8:00 to 18:00
const TIME_SLOTS = Array.from({ length: 20 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

// Appointment type colors
const TYPE_COLORS: Record<string, string> = {
  Checkup: '#3b82f6',
  Consultation: '#10b981',
  'Follow-up': '#f59e0b',
  Procedure: '#8b5cf6',
};

export const WeekView: React.FC<Props> = ({ appointments, selectedDate, doctor }) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

  const weekAppointments = appointments.filter((apt) => {
    const start = parseISO(apt.startTime);
    return isWithinInterval(start, { start: weekStart, end: weekEnd }) && apt.doctorId === doctor.id;
  });

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentsForSlotAndDay = (slot: string, date: Date) => {
    const [hour, minute] = slot.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hour, minute, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);

    return weekAppointments.filter((apt) => {
      const start = parseISO(apt.startTime);
      const end = parseISO(apt.endTime);
      return (
        isSameDay(start, date) &&
        ((start >= slotStart && start < slotEnd) || (start <= slotStart && end > slotStart))
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
        <div className="text-gray-500 font-medium">
          {format(weekStart, 'PP')} – {format(weekEnd, 'PP')}
        </div>
      </div>

      {/* Weekly grid */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] border-collapse w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b text-sm">
              <th className="w-24 border-r px-3 py-2 font-medium">Time</th>
              {weekDates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="px-3 py-2 border-r text-center font-medium text-gray-700"
                >
                  {format(date, 'EEE dd/MM')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TIME_SLOTS.map((slot, slotIndex) => (
              <tr key={slot} className="border-b hover:bg-gray-50 transition">
                <td className="border-r px-3 py-2 font-mono text-gray-700 text-sm">{slot}</td>

                {weekDates.map((date) => {
                  const slotAppointments = getAppointmentsForSlotAndDay(slot, date);

                  return (
                    <td
                      key={date.toISOString()}
                      className="px-3 py-2 relative min-w-[120px] h-14"
                    >
                      {slotAppointments.length > 0 ? (
                        slotAppointments.map((apt, index) => (
                          <div
                            key={apt.id}
                            className="absolute px-2 py-1 rounded text-white text-xs font-medium shadow-sm"
                            style={{
                              backgroundColor: TYPE_COLORS[apt.type] || '#6b7280',
                              width: `${90 / slotAppointments.length}%`,
                              left: `${(index * 100) / slotAppointments.length}%`,
                              textAlign: 'center',
                            }}
                          >
                            {apt.type}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 italic text-xs">
                          {slotIndex % 2 === 0 ? '—' : 'Available'}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
