
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { DeliveryTable } from './DeliveryTable';
import { DeliveryDetails } from './DeliveryDetails';
import type { DeliveryRecord } from './types';

const DELIVERY_HISTORY: DeliveryRecord[] = [
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

  const handleParcelSelect = (id: string) => {
    setSelectedParcel(selectedParcel === id ? null : id);
  };

  return (
    <Card className="bg-green-50 border-green-200 shadow-sm transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center text-green-800">
          <Package className="mr-2 h-5 w-5 text-green-600" />
          Delivery History
        </CardTitle>
        <CardDescription className="text-green-600">
          View and track your past delivery requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          
          <DeliveryTable 
            deliveries={filteredDeliveries}
            selectedParcel={selectedParcel}
            onSelectParcel={handleParcelSelect}
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
