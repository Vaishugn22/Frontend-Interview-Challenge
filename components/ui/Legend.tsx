'use client';
import React from 'react';

export const TYPE_COLORS: Record<string, string> = {
  Checkup: '#3b82f6',
  Consultation: '#10b981',
  'Follow-up': '#f59e0b',
  Procedure: '#8b5cf6',
};

export const Legend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {Object.entries(TYPE_COLORS).map(([type, color]) => (
        <div key={type} className="flex items-center gap-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
          <span className="text-sm">{type}</span>
        </div>
      ))}
    </div>
  );
};
