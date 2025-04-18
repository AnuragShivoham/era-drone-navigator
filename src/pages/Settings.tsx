
import React from 'react';
import NavLayout from '@/components/layout/NavLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Fingerprint, 
  MapPin, 
  Radio, 
  Laptop, 
  Moon, 
  Languages, 
  RefreshCcw,
  Save
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated."
    });
  };
  
  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="bg-era-card border-era-primary/20">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">App Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-era-muted">Enable dark mode for the application</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Offline Mode</Label>
                      <p className="text-sm text-era-muted">Always use offline mode when available</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Voice Commands</Label>
                      <p className="text-sm text-era-muted">Enable voice commands for hands-free operation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Location</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultLocation">Default Location</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-era-muted" />
                      <Input
                        id="defaultLocation"
                        placeholder="Enter your default location"
                        className="bg-era-background border-era-primary/20"
                        defaultValue="Main Building"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">GPS Tracking</Label>
                      <p className="text-sm text-era-muted">Allow the app to track your location</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language & Region</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <div className="flex items-center space-x-2">
                      <Languages className="h-4 w-4 text-era-muted" />
                      <select 
                        id="language" 
                        className="flex h-10 w-full rounded-md border border-era-primary/20 bg-era-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="hi">Hindi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-era-primary hover:bg-era-primary/80 mr-2"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" className="border-era-primary/20">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="bg-era-card border-era-primary/20">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Biometric Authentication</Label>
                      <p className="text-sm text-era-muted">Use fingerprint or face recognition</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pin">Secure PIN</Label>
                    <div className="flex items-center space-x-2">
                      <Fingerprint className="h-4 w-4 text-era-muted" />
                      <Input
                        id="pin"
                        type="password"
                        placeholder="Enter your PIN"
                        className="bg-era-background border-era-primary/20"
                      />
                    </div>
                    <p className="text-xs text-era-muted">Used as a fallback when biometric authentication is unavailable</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Admin Access</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable Admin Features</Label>
                      <p className="text-sm text-era-muted">Allow access to advanced drone controls</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Admin Password</Label>
                    <div className="flex items-center space-x-2">
                      <Laptop className="h-4 w-4 text-era-muted" />
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder="Enter admin password"
                        className="bg-era-background border-era-primary/20"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Privacy</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Local Storage Only</Label>
                      <p className="text-sm text-era-muted">Store all data locally without cloud sync</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-500/10 w-full"
                  >
                    Clear All Local Data
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-era-primary hover:bg-era-primary/80"
                  onClick={handleSave}
                >
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="bg-era-card border-era-primary/20">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-era-muted">Receive app notifications for delivery updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Alerts</Label>
                      <p className="text-sm text-era-muted">Receive SMS when drone arrives</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Missed Calls</Label>
                      <p className="text-sm text-era-muted">Receive a missed call notification from drone</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-era-muted">Notifications about app updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Battery Alerts</Label>
                      <p className="text-sm text-era-muted">Low battery warnings for drone operations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Schedule</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Do Not Disturb</Label>
                      <p className="text-sm text-era-muted">Silence notifications during certain hours</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dndStart">Start Time</Label>
                      <Input
                        id="dndStart"
                        type="time"
                        className="bg-era-background border-era-primary/20"
                        defaultValue="22:00"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dndEnd">End Time</Label>
                      <Input
                        id="dndEnd"
                        type="time"
                        className="bg-era-background border-era-primary/20"
                        defaultValue="07:00"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-era-primary hover:bg-era-primary/80 mr-2"
                  onClick={handleSave}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="border-era-primary/20"
                >
                  Test Notification
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NavLayout>
  );
};

export default Settings;
