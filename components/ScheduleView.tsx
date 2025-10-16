'use client';

import React, { useState } from 'react';
import { Doctor, Appointment } from '@/types';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { format } from 'date-fns';

interface Props {
  doctors: Doctor[];
  appointments: Appointment[];
  role: 'doctor' | 'frontdesk';
  userDoctorId?: number; // Only for doctor role
}

export const ScheduleView: React.FC<Props> = ({ doctors, appointments, role, userDoctorId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Determine selected doctor
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    role === 'doctor' ? userDoctorId || 0 : doctors[0]?.id || 0
  );
  const selectedDoctor = doctors.find((doc) => doc.id === selectedDoctorId);

  if (!selectedDoctor) return <div>No doctor selected</div>;

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* Doctor Selector only for front desk */}
        {role === 'frontdesk' && (
          <select
            className="border rounded px-3 py-2"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        )}

        {/* Date Picker */}
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />

        {/* View Toggle */}
        <button
          className={`px-3 py-2 rounded ${viewMode === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('day')}
        >
          Day View
        </button>
        <button
          className={`px-3 py-2 rounded ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('week')}
        >
          Week View
        </button>
      </div>

      {/* Calendar */}
      <div>
        {viewMode === 'day' ? (
          <DayView
            appointments={appointments.filter((apt) => apt.doctorId === selectedDoctor.id)}
            selectedDate={selectedDate}
            doctor={selectedDoctor}
          />
        ) : (
          <WeekView
            appointments={appointments.filter((apt) => apt.doctorId === selectedDoctor.id)}
            selectedDate={selectedDate}
            doctor={selectedDoctor}
          />
        )}
      </div>
    </div>
  );
};
