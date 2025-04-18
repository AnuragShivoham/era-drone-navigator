
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import DeliveryHistory from '@/components/history/DeliveryHistory';

const History = () => {
  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Delivery History</h1>
        <DeliveryHistory />
      </div>
    </NavLayout>
  );
};

export default History;
