
import React from 'react';
import { BookingStatus } from '../types';
import { STATUS_FLOW } from '../constants';

interface StatusStepperProps {
  currentStatus: BookingStatus;
}

export const StatusStepper: React.FC<StatusStepperProps> = ({ currentStatus }) => {
  const currentIndex = STATUS_FLOW.findIndex(s => s.status === currentStatus);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          style={{ width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%` }}
        ></div>

        {STATUS_FLOW.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.status} className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
              } ${isCurrent ? 'ring-4 ring-blue-100 dark:ring-blue-900/30 scale-110' : ''}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] md:text-xs font-medium mt-2 text-center whitespace-nowrap ${
                isCompleted ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
