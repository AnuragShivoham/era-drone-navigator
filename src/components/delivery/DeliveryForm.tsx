
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for drop zones
const DROP_ZONES = [
  { id: '1', name: 'Main Building' },
  { id: '2', name: 'Hostel A Block' },
  { id: '3', name: 'Hostel B Block' },
  { id: '4', name: 'Hostel C Block' },
  { id: '5', name: 'Faculty Quarters' },
  { id: '6', name: 'Sports Complex' },
  { id: '7', name: 'Library' },
  { id: '8', name: 'Canteen' },
];

const DeliveryForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    deliveryCode: '',
    dropZone: '',
    message: ''
  });
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{sender: 'user' | 'bot', message: string}>>([
    { sender: 'bot', message: 'Hello! I can help you with your delivery request. You can type instructions like "Deliver to Hostel C Block" or ask "What is the drone status?"' }
  ]);
  const [isRecording, setIsRecording] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, dropZone: value }));
  };

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { sender: 'user', message: chatMessage }]);
    
    // Simulate AI response based on user input
    setTimeout(() => {
      let botResponse = '';
      
      if (chatMessage.toLowerCase().includes('deliver to hostel c')) {
        botResponse = "I'll set up a delivery to Hostel C Block. Please complete the delivery form with your details.";
        setFormData(prev => ({ ...prev, dropZone: '4' }));
      } else if (chatMessage.toLowerCase().includes('check status')) {
        botResponse = 'The drone is currently inactive and ready for your delivery request.';
      } else if (chatMessage.toLowerCase().includes('help')) {
        botResponse = 'I can assist with: setting delivery locations, checking drone status, or guiding you through the delivery process. What would you like to do?';
      } else {
        botResponse = "I understand you want to: \"" + chatMessage + "\". Is there anything specific about your delivery request you'd like me to help with?";
      }
      
      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);
    
    setChatMessage('');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording simulation
      toast({
        title: "Voice Recording Started",
        description: "Speak your delivery request clearly...",
      });
      
      // Simulate end of recording after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Voice Recorded",
          description: "Processing your request...",
        });
        
        // Simulate processing
        setTimeout(() => {
          const simulatedText = "Deliver to Hostel C Block";
          setChatMessage(simulatedText);
          toast({
            title: "Voice Processed",
            description: `Recognized: "${simulatedText}"`,
          });
        }, 1500);
      }, 3000);
    } else {
      // Stop recording simulation
      toast({
        title: "Voice Recording Stopped",
        description: "Processing your request...",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.mobile || !formData.dropZone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Delivery Request Submitted",
      description: `Your package will be delivered to ${DROP_ZONES.find(zone => zone.id === formData.dropZone)?.name}.`,
    });
    
    // Reset form (in a real app, you might redirect)
    setFormData({
      name: '',
      mobile: '',
      deliveryCode: '',
      dropZone: '',
      message: ''
    });
  };

  return (
    <Tabs defaultValue="form" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="form">Delivery Form</TabsTrigger>
        <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
      </TabsList>
      
      <TabsContent value="form">
        <Card className="bg-era-card border-era-primary/20">
          <CardHeader>
            <CardTitle>Request Delivery</CardTitle>
            <CardDescription>Enter your details and select a drop zone for delivery.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-era-background border-era-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  className="bg-era-background border-era-primary/20"
                />
                <p className="text-xs text-era-muted">Will be used for delivery notifications</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryCode">Delivery Code/Token (Optional)</Label>
                <Input
                  id="deliveryCode"
                  name="deliveryCode"
                  value={formData.deliveryCode}
                  onChange={handleInputChange}
                  placeholder="Enter delivery code if any"
                  className="bg-era-background border-era-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dropZone">Select Drop Zone</Label>
                <Select value={formData.dropZone} onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-era-background border-era-primary/20">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {DROP_ZONES.map(zone => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Instructions (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any specific instructions for delivery"
                  className="bg-era-background border-era-primary/20"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full bg-era-primary hover:bg-era-primary/80">
                <MapPin className="mr-2 h-4 w-4" />
                Request Delivery
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="assistant">
        <Card className="bg-era-card border-era-primary/20">
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Chat with the AI to help with your delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-y-auto mb-4 space-y-4 p-2">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index}
                  className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] rounded-lg px-4 py-2
                      ${chat.sender === 'user' 
                        ? 'bg-era-primary text-white'
                        : 'bg-era-background text-era-text'
                      }
                    `}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-era-background border-era-primary/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleChatSend();
                  }
                }}
              />
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                className={`border-era-primary/20 ${isRecording ? 'bg-red-500 text-white' : ''}`}
                onClick={handleVoiceRecord}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                size="icon"
                className="bg-era-primary hover:bg-era-primary/80"
                onClick={handleChatSend}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DeliveryForm;
