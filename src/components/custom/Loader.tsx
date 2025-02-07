import React from 'react';
import { Landmark } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        {/* Background Circle */}
        <div className="absolute w-20 h-20 bg-blue-100 rounded-full animate-ping"></div>
        {/* Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-white border-4 border-blue-500 rounded-full shadow-lg">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-blue-500 animate-spin-slow"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85L21 17V7c0-1.054-.816-1.918-1.85-1.995L19 5H5c-1.054 0-1.918.816-1.995 1.85L3 7v10c0 1.054.816 1.918 1.85 1.995L5 19z"
            />
          </svg> */}
          <span className="flex justify-center items-center text-center text-3xl font-extrabold text-blue-500 animate-spin-slow">
            ₦
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
