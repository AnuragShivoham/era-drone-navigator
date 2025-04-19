import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SearchBar from './SearchBar';
import DeliveryTable from './DeliveryTable';
import DeliveryDetails from './DeliveryDetails';
import { DeliveryType } from './types';

// Mock data
const DELIVERY_HISTORY: DeliveryType[] = [
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

  return (
    <Card 
      className="bg-era-background border-[#8B5CF6] border-2 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Package className="mr-2 h-5 w-5 text-[#8B5CF6]" />
          Delivery History
        </CardTitle>
        <CardDescription className="text-white/70">
          View and track your past delivery requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          
          <DeliveryTable 
            deliveries={filteredDeliveries}
            selectedParcel={selectedParcel}
            onSelectParcel={setSelectedParcel}
          />
          
          {selectedParcel && (
            <DeliveryDetails 
              delivery={DELIVERY_HISTORY.find(d => d.id === selectedParcel)!}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryHistory;
