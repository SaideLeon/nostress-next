// src/pages/recursos.tsx
import React from 'react';
import PriceCalculator from '@/components/PriceCalculator';

const RecursosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 text-white overflow-hidden">
      <PriceCalculator />
    </div>
  );
};

export default RecursosPage;