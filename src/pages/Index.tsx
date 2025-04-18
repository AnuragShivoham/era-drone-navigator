
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import DroneStatus from '@/components/dashboard/DroneStatus';
import QuickActions from '@/components/dashboard/QuickActions';

const Index = () => {
  // Mock data - In a real app, this would come from an API or state management
  const droneData = {
    batteryLevel: 85,
    location: 'Main Building',
    signalStrength: 93,
    deliveryProgress: 0
  };

  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DroneStatus 
            batteryLevel={droneData.batteryLevel}
            location={droneData.location}
            signalStrength={droneData.signalStrength}
            deliveryProgress={droneData.deliveryProgress}
          />
          <QuickActions />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-era-card p-6 rounded-lg border border-era-primary/20">
            <h2 className="text-xl font-bold mb-4">Welcome to ERA</h2>
            <p className="text-era-muted mb-2">The Spark of Future in drone technology, bringing autonomous deliveries to your doorstep.</p>
            <p className="text-era-muted">Our system works even in offline environments, ensuring reliable service anywhere on campus.</p>
            
            <div className="mt-4 bg-era-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Today's Weather</h3>
              <div className="flex items-center justify-between">
                <div>Clear Sky</div>
                <div className="text-era-muted">25°C</div>
                <div className="text-era-muted">Wind: 12 km/h</div>
              </div>
              <div className="mt-2 text-sm text-era-muted">Perfect conditions for drone operations</div>
            </div>
          </div>
          
          <div className="bg-era-card p-6 rounded-lg border border-era-primary/20">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-era-background">
                <div className="w-2 h-2 mt-1 rounded-full bg-green-500"></div>
                <div>
                  <div className="font-medium">Drone maintenance completed</div>
                  <div className="text-sm text-era-muted">Today, 10:30 AM</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-era-background">
                <div className="w-2 h-2 mt-1 rounded-full bg-blue-500"></div>
                <div>
                  <div className="font-medium">System updated to v2.5.1</div>
                  <div className="text-sm text-era-muted">Yesterday, 6:15 PM</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-era-background">
                <div className="w-2 h-2 mt-1 rounded-full bg-purple-500"></div>
                <div>
                  <div className="font-medium">New waypoint added: Science Block</div>
                  <div className="text-sm text-era-muted">Apr 16, 2025, 11:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLayout>
  );
};

export default Index;
