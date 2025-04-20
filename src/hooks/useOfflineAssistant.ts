import { useState } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface UseOfflineAssistantReturn {
  chatHistory: ChatMessage[];
  sendMessage: (message: string) => void;
  isProcessing: boolean;
}

export function useOfflineAssistant(initialBotMessage?: string): UseOfflineAssistantReturn {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "bot", message: initialBotMessage || "Hello! I am your ERA AI Assistant. How can I help you today?" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Local AI keyword logic
  const responses: { keywords: string[]; response: string }[] = [
    {
      keywords: ["hello", "hi"],
      response: "Hello there! How can I assist with your drone delivery needs today?",
    },
    {
      keywords: ["delivery", "how"],
      response: "To place a delivery request, please provide your name, contact number, and select a drop zone. You can do this via the Delivery form in the app.",
    },
    {
      keywords: ["track", "status"],
      response: "You can track your delivery in the History section. If you have a specific parcel ID, I can help you check its current status.",
    },
    {
      keywords: ["problem", "help"],
      response: "I'm sorry to hear you're having trouble. Could you please describe the issue in more detail so I can assist you better?",
    },
    {
      keywords: ["drone", "how"],
      response: "Our drones navigate using a combination of computer vision and predefined waypoints. They operate offline using LoRa communication.",
    },
    {
      keywords: ["weather"],
      response: "Current weather conditions are suitable for drone operations. Clear skies with wind speed at 12 km/h.",
    },
    {
      keywords: ["thanks", "thank you"],
      response: "You're welcome! Let me know if there's anything else I can help you with.",
    },
    {
      keywords: ["cancel", "delivery"],
      response: "To cancel a delivery, go to the History section, select your parcel, and tap on 'Cancel Delivery'.",
    },
    {
      keywords: ["battery", "drone"],
      response: "Our drones are solar-powered and designed to last over a month with minimal charging requirements.",
    },
    {
      keywords: ["offline", "work"],
      response: "Yes, our system is designed to work completely offline using LoRa communication and onboard AI.",
    },
    {
      keywords: ["call", "drone"],
      response: "The drone will call your registered number once it reaches the closest drop-point near your location.",
    },
    {
      keywords: ["drop", "location"],
      response: "You can select your drop location in the app's delivery form. Make sure it's within the supported zone.",
    },
    {
      keywords: ["security", "safe"],
      response: "Your delivery is secured using AES-128 encryption and biometric verification at the final step.",
    },
    {
      keywords: ["biometric", "fingerprint"],
      response: "The drone uses biometric verification (like fingerprint or face scan) before handing over the parcel.",
    },
    {
      keywords: ["rasa", "ai"],
      response: "Yes, this chatbot is powered by AI using Rasa and can understand basic queries about delivery and drone services.",
    },
    {
      keywords: ["time", "delivery"],
      response: "Most deliveries are completed within 30–45 minutes, depending on distance and weather conditions.",
    },
    {
      keywords: ["price", "cost"],
      response: "Our delivery charges are minimal and depend on distance. You can view the exact cost in the app before confirming.",
    },
    {
      keywords: ["working", "hours"],
      response: "Drone deliveries are operational from 7 AM to 7 PM daily.",
    },
  ];

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (let entry of responses) {
      const match = entry.keywords.every((keyword) => lowerMessage.includes(keyword));
      if (match) return entry.response;
    }

    return `I understand you're asking about: "${userMessage}". Could you please clarify or ask in a different way?`;
  };

  const sendMessage = (message: string) => {
    if (!message.trim() || isProcessing) return;

    setChatHistory((prev) => [...prev, { sender: "user", message }]);
    setIsProcessing(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
      setIsProcessing(false);
    }, 800);
  };

  return { chatHistory, sendMessage, isProcessing };
}
