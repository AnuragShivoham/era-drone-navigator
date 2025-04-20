
import React, { useState, useRef, useEffect } from "react";
import NavLayout from "@/components/layout/NavLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, CornerDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineAssistant } from "@/hooks/useOfflineAssistant";

const Assistant = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { chatHistory, sendMessage, isProcessing } = useOfflineAssistant();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage(message);
    setMessage("");
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      toast({
        title: "Voice Recording Started",
        description: "Speak clearly...",
      });

      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Voice Recorded",
          description: "Processing your request...",
        });

        setTimeout(() => {
          const simulatedText = "How do I place a delivery request?";
          setMessage(simulatedText);
          toast({
            title: "Voice Processed",
            description: `Recognized: "${simulatedText}"`,
          });
        }, 1500);
      }, 3000);
    } else {
      toast({
        title: "Voice Recording Stopped",
      });
    }
  };

  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">AI Assistant</h1>

        <Card className="bg-era-card border-era-primary/20">
          <CardHeader>
            <CardTitle>ERA Voice Assistant</CardTitle>
            <CardDescription>
              Ask questions or request help with your delivery
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto mb-4 space-y-4 p-4 bg-era-background rounded-lg"
            >
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-lg px-4 py-2
                      ${
                        chat.sender === "user"
                          ? "bg-era-primary text-white"
                          : "bg-era-card text-era-text"
                      }
                    `}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start max-w-[80%] rounded-lg px-4 py-2 bg-era-card text-era-text italic opacity-70">
                  Assistant is typing...
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-era-background border-era-primary/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className={`border-era-primary/20 ${
                  isRecording ? "bg-red-500 text-white" : ""
                }`}
                onClick={handleVoiceRecord}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                className="bg-era-primary hover:bg-era-primary/80"
                onClick={handleSendMessage}
                disabled={isProcessing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-era-card border-era-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Voice Commands</CardTitle>
              <CardDescription>Try saying these phrases</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CornerDownLeft className="text-era-primary mr-2 h-4 w-4" />
                  <span>"Deliver to Hostel C Block"</span>
                </li>
                <li className="flex items-center">
                  <CornerDownLeft className="text-era-primary mr-2 h-4 w-4" />
                  <span>"What's my delivery status?"</span>
                </li>
                <li className="flex items-center">
                  <CornerDownLeft className="text-era-primary mr-2 h-4 w-4" />
                  <span>"Track my parcel"</span>
                </li>
                <li className="flex items-center">
                  <CornerDownLeft className="text-era-primary mr-2 h-4 w-4" />
                  <span>"How does the drone navigate?"</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-era-card border-era-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Assistant Capabilities</CardTitle>
              <CardDescription>What I can help you with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-era-primary"></div>
                  <div>Process delivery requests and guide you through each step</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-era-primary"></div>
                  <div>Track parcels and provide status updates</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-era-primary"></div>
                  <div>Provide information about drone operations</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-era-primary"></div>
                  <div>Help troubleshoot common issues</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-era-primary"></div>
                  <div>Works offline with preloaded responses</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavLayout>
  );
};

export default Assistant;
