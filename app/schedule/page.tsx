'use client';

import React, { useState } from 'react';
import { ScheduleView } from '@/components/ScheduleView';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS } from '@/data/mockData';

export default function SchedulePage() {
  const [role, setRole] = useState<'frontdesk' | 'doctor'>('frontdesk');
  const userDoctorId = 2; // Example: If logged-in user is doctor with ID 2

  return (
    <div className="p-6">
      {/* Role Selector (for testing only, normally handled via auth) */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'frontdesk' | 'doctor')}
          className="border px-3 py-2 rounded"
        >
          <option value="frontdesk">Front Desk Staff</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>

      {/* Schedule View */}
      <ScheduleView
        doctors={MOCK_DOCTORS}
        appointments={MOCK_APPOINTMENTS}
        role={role}
        userDoctorId={role === 'doctor' ? userDoctorId : undefined}
      />
    </div>
  );
}
