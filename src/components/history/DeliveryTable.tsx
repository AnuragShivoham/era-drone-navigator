
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { DeliveryRecord } from './types';

interface DeliveryTableProps {
  deliveries: DeliveryRecord[];
  selectedParcel: string | null;
  onSelectParcel: (id: string) => void;
}

export const DeliveryTable: React.FC<DeliveryTableProps> = ({
  deliveries,
  selectedParcel,
  onSelectParcel,
}) => {
  return (
    <div className="rounded-md border border-neon-green overflow-hidden">
      <Table>
        <TableHeader className="bg-green-600">
          <TableRow className="hover:bg-green-700">
            <TableHead className="text-white">Parcel ID</TableHead>
            <TableHead className="text-white">Date & Time</TableHead>
            <TableHead className="text-white">Location</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <TableRow
                key={delivery.id}
                className={cn(
                  "hover:bg-green-700 text-white",
                  selectedParcel === delivery.id ? "bg-green-700" : ""
                )}
              >
                <TableCell className="font-medium text-white">{delivery.id}</TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3 w-3 text-white/50" />
                    {`${delivery.date}, ${delivery.time}`}
                  </div>
                </TableCell>
                <TableCell className="text-white">{delivery.location}</TableCell>
                <TableCell><StatusBadge status={delivery.status} /></TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-green-800 text-white"
                    onClick={() => onSelectParcel(delivery.id)}
                  >
                    {selectedParcel === delivery.id ? "Hide Details" : "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-white/50">
                No deliveries found matching your search
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
