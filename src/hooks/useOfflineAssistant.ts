
import { useState, useEffect } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface UseOfflineAssistantReturn {
  chatHistory: ChatMessage[];
  sendMessage: (message: string) => void;
  isProcessing: boolean;
  // Optionally voice recording or other flags can be here
}

export function useOfflineAssistant(initialBotMessage?: string): UseOfflineAssistantReturn {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "bot", message: initialBotMessage || "Hello! I am your ERA AI Assistant. How can I help you today?" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to simulate AI response from local/offline AI logic
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello there! How can I assist with your drone delivery needs today?";
    } else if (lowerMessage.includes("delivery") && lowerMessage.includes("how")) {
      return "To place a delivery request, please provide your name, contact number, and select a drop zone. You can do this via the Delivery form in the app.";
    } else if (lowerMessage.includes("track") || lowerMessage.includes("status")) {
      return "You can track your delivery in the History section. If you have a specific parcel ID, I can help you check its current status.";
    } else if (lowerMessage.includes("problem") || lowerMessage.includes("help")) {
      return "I'm sorry to hear you're having trouble. Could you please describe the issue in more detail so I can assist you better?";
    } else if (lowerMessage.includes("drone") && lowerMessage.includes("how")) {
      return "Our drones navigate using a combination of GPS, computer vision, and predefined waypoints. They can operate completely offline and use LoRa technology for long-range communication.";
    } else if (lowerMessage.includes("weather")) {
      return "Current weather conditions are suitable for drone operations. Clear skies with wind speed at 12 km/h.";
    } else {
      return `I understand you're asking about: "${userMessage}". Could you please provide more details or clarify your question so I can better assist you?`;
    }
  };

  const sendMessage = (message: string) => {
    if (!message.trim() || isProcessing) return;
    setChatHistory((prev) => [...prev, { sender: "user", message }]);
    setIsProcessing(true);

    // Simulate a processing delay to mimic AI thinking locally
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
      setIsProcessing(false);
    }, 800);
  };

  return { chatHistory, sendMessage, isProcessing };
}

