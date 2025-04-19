
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { DeliveryType } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DeliveryTableProps {
  deliveries: DeliveryType[];
  selectedParcel: string | null;
  onSelectParcel: (id: string) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({
  deliveries,
  selectedParcel,
  onSelectParcel,
}) => {
  return (
    <div className="rounded-md border-2 border-[#8B5CF6] overflow-hidden">
      <Table>
        <TableHeader className="bg-era-background/20">
          <TableRow>
            {['Parcel ID', 'Date & Time', 'Location', 'Status', 'Actions'].map((header) => (
              <TableHead key={header} className="text-white">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <TableRow 
                key={delivery.id}
                className={cn(
                  "hover:bg-[#8B5CF6]/10 text-white",
                  selectedParcel === delivery.id ? "bg-[#8B5CF6]/5" : ""
                )}
              >
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3 w-3 text-white/50" />
                    {`${delivery.date}, ${delivery.time}`}
                  </div>
                </TableCell>
                <TableCell>{delivery.location}</TableCell>
                <TableCell><StatusBadge status={delivery.status} /></TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-[#8B5CF6]/10 text-white"
                    onClick={() => onSelectParcel(
                      selectedParcel === delivery.id ? '' : delivery.id
                    )}
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

export default DeliveryTable;
