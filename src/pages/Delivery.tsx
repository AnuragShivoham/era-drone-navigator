
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import DeliveryForm from '@/components/delivery/DeliveryForm';

const Delivery = () => {
  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Request Delivery</h1>
        <DeliveryForm />
      </div>
    </NavLayout>
  );
};

export default Delivery;
