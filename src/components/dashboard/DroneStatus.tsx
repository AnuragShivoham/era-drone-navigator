
import React from 'react';
import { Battery, MapPin, Radio } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DroneStatusProps {
  batteryLevel: number;
  location: string;
  signalStrength: number;
  deliveryProgress: number;
}

const DroneStatus: React.FC<DroneStatusProps> = ({
  batteryLevel,
  location,
  signalStrength,
  deliveryProgress
}) => {
  // Determine battery color based on level
  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-500';
    if (batteryLevel > 20) return 'text-amber-500';
    return 'text-red-500';
  };

  // Determine signal strength icon
  const getSignalIcon = () => {
    return (
      <div className="flex items-center">
        <Radio className={cn(
          "mr-2",
          signalStrength > 70 ? "text-green-500" : 
          signalStrength > 30 ? "text-amber-500" : 
          "text-red-500"
        )} />
        <span>{signalStrength}%</span>
      </div>
    );
  };

  return (
    <Card className="bg-era-card border-era-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <svg 
            className="w-5 h-5 mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              className="drone-propeller animate-rotate-drone" 
              d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" 
              fill="currentColor"
            />
            <path 
              className="drone-propeller animate-rotate-drone" 
              d="M17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12Z" 
              fill="currentColor"
            />
            <path 
              className="drone-propeller animate-rotate-drone" 
              d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" 
              fill="currentColor"
            />
            <path 
              className="drone-propeller animate-rotate-drone" 
              d="M9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12Z" 
              fill="currentColor"
            />
          </svg>
          Drone Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-era-muted">
              <Battery className={cn("mr-2 h-4 w-4", getBatteryColor())} />
              <span>Battery</span>
            </div>
            <div className={cn("font-semibold", getBatteryColor())}>
              {batteryLevel}%
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-era-muted">
              <MapPin className="mr-2 h-4 w-4 text-era-accent" />
              <span>Location</span>
            </div>
            <div className="font-semibold">{location}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-era-muted">
              <span>Signal</span>
            </div>
            <div className="font-semibold">
              {getSignalIcon()}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-era-muted">Delivery Progress</span>
              <span className="font-semibold">{deliveryProgress}%</span>
            </div>
            <Progress value={deliveryProgress} className="h-2 bg-era-muted/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneStatus;
