
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Search, AlertTriangle } from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-era-card border-era-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="default" 
          className="w-full bg-era-primary hover:bg-era-primary/80 flex items-center"
          onClick={() => navigate('/delivery')}
        >
          <Package className="mr-2 h-4 w-4" />
          Request Delivery
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-era-primary/50 text-era-text hover:bg-era-primary/10 flex items-center"
          onClick={() => navigate('/history')}
        >
          <Search className="mr-2 h-4 w-4" />
          Track Parcel
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full flex items-center"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency Stop
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
