
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { DeliveryType } from './types';

interface DeliveryDetailsProps {
  delivery: DeliveryType;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ delivery }) => {
  return (
    <Card className="bg-era-background/20 border-[#8B5CF6] border-2 rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-white">Delivery Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-white">
          {[
            { label: 'Parcel ID:', value: delivery.id },
            { label: 'Recipient:', value: delivery.recipient },
            { label: 'Location:', value: delivery.location },
            { label: 'Date & Time:', value: `${delivery.date}, ${delivery.time}` },
            { label: 'Status:', value: <StatusBadge status={delivery.status} /> }
          ].map(({ label, value }) => (
            <div key={label} className="grid grid-cols-2 gap-1">
              <div className="text-white/70">{label}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;
