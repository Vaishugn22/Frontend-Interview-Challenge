'use client';
import React from 'react';
import { MOCK_DOCTORS } from '@/data/mockData';

interface DoctorSelectorProps {
  selectedDoctorId: number | null;
  onSelectDoctor: (id: number | null) => void;
  role: 'frontdesk' | 'doctor';
  onRoleChange: (role: 'frontdesk' | 'doctor') => void;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  selectedDoctorId,
  onSelectDoctor,
  role,
  onRoleChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 p-4 bg-white shadow rounded-2xl">
      {/* Role Switch */}
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Role:</label>
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value as 'frontdesk' | 'doctor')}
          className="border rounded-md p-2"
        >
          <option value="frontdesk">Front Desk</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>

      {/* Doctor Dropdown */}
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Doctor:</label>
        <select
          value={selectedDoctorId ?? ''}
          onChange={(e) => onSelectDoctor(Number(e.target.value))}
          className="border rounded-md p-2"
          disabled={role === 'doctor'}
        >
          <option value="">All Doctors</option>
          {MOCK_DOCTORS.map((doc) => (
            <option key={doc.id} value={doc.id}>
              Dr. {doc.name} – {doc.specialty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DoctorSelector;
