import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for delivery history
const DELIVERY_HISTORY = [
  {
    id: 'DEL-001',
    date: '2025-04-18',
    time: '09:30 AM',
    location: 'Hostel B Block',
    status: 'delivered',
    recipient: 'John Doe'
  },
  {
    id: 'DEL-002',
    date: '2025-04-17',
    time: '02:15 PM',
    location: 'Library',
    status: 'failed',
    recipient: 'Jane Smith'
  },
  {
    id: 'DEL-003',
    date: '2025-04-17',
    time: '11:45 AM',
    location: 'Faculty Quarters',
    status: 'delivered',
    recipient: 'Robert Johnson'
  },
  {
    id: 'DEL-004',
    date: '2025-04-16',
    time: '03:20 PM',
    location: 'Canteen',
    status: 'pending',
    recipient: 'Emily Davis'
  },
  {
    id: 'DEL-005',
    date: '2025-04-15',
    time: '10:00 AM',
    location: 'Main Building',
    status: 'delivered',
    recipient: 'Michael Wilson'
  }
];

const DeliveryHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParcel, setSelectedParcel] = useState<string | null>(null);

  const filteredDeliveries = DELIVERY_HISTORY.filter(delivery => {
    const query = searchQuery.toLowerCase();
    return (
      delivery.id.toLowerCase().includes(query) ||
      delivery.location.toLowerCase().includes(query) ||
      delivery.recipient.toLowerCase().includes(query) ||
      delivery.status.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card 
      className="bg-era-background border-[#8B5CF6] border-2 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Package className="mr-2 h-5 w-5 text-[#8B5CF6]" />
          Delivery History
        </CardTitle>
        <CardDescription className="text-white/70">View and track your past delivery requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-era-background/10 border-[#8B5CF6] text-white placeholder-white/50 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
              />
            </div>
          </div>
          
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
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
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
                      <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-[#8B5CF6]/10 text-white"
                          onClick={() => setSelectedParcel(
                            selectedParcel === delivery.id ? null : delivery.id
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
          
          {selectedParcel && (
            <Card className="bg-era-background/20 border-[#8B5CF6] border-2 rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const delivery = DELIVERY_HISTORY.find(d => d.id === selectedParcel);
                  if (!delivery) return null;
                  
                  return (
                    <div className="space-y-3 text-sm text-white">
                      {[
                        { label: 'Parcel ID:', value: delivery.id },
                        { label: 'Recipient:', value: delivery.recipient },
                        { label: 'Location:', value: delivery.location },
                        { label: 'Date & Time:', value: `${delivery.date}, ${delivery.time}` },
                        { label: 'Status:', value: getStatusBadge(delivery.status) }
                      ].map(({ label, value }) => (
                        <div key={label} className="grid grid-cols-2 gap-1">
                          <div className="text-white/70">{label}</div>
                          <div>{value}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryHistory;
