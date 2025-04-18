
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { DeliveryRecord } from './types';

interface DeliveryDetailsProps {
  delivery: DeliveryRecord;
}

export const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ delivery }) => {
  return (
    <Card className="bg-green-600 border-neon-green text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-white">Delivery Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-white/50">Parcel ID:</div>
            <div className="text-white">{delivery.id}</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-white/50">Recipient:</div>
            <div>{delivery.recipient}</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-white/50">Location:</div>
            <div>{delivery.location}</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-white/50">Date & Time:</div>
            <div>{`${delivery.date}, ${delivery.time}`}</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-white/50">Status:</div>
            <div><StatusBadge status={delivery.status} /></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
