
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
import { Send, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineAssistant } from "@/hooks/useOfflineAssistant";

const OfflineAI = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
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
    toast({
      title: "Voice recording for LoRa offline AI is not yet implemented.",
      description: "This feature is planned for future updates.",
    });
  };

  return (
    <NavLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Offline AI Assistant (LoRa)</h1>

        <Card className="bg-era-card border-era-primary/20">
          <CardHeader>
            <CardTitle>Local Offline AI Assistant</CardTitle>
            <CardDescription>
              Chat with your LoRa-connected offline AI assistant
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
                className="border-era-primary/20"
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
      </div>
    </NavLayout>
  );
};

export default OfflineAI;

