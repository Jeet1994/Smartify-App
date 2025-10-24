
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-lg text-gray-300">Consulting the global consciousness...</p>
      <p className="text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
