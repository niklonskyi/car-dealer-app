'use client';

const SuspenseFallback: React.FC = () => {
  return (
    <div className="p-8 text-center text-lg font-semibold text-gray-500">
      <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
      <p>Loading...</p>
    </div>
  );
};

export default SuspenseFallback;
