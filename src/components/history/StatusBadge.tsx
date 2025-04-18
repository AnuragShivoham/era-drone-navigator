
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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
