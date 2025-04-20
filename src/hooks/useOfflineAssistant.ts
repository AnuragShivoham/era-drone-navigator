
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
    }
   else if (lowerMessage.includes("thanks") || lowerMessage.includes("thank you")) {
  return "You're welcome! Let me know if there's anything else I can help you with.";
} else if (lowerMessage.includes("cancel") && lowerMessage.includes("delivery")) {
  return "To cancel a delivery, go to the History section, select your parcel, and tap on 'Cancel Delivery'.";
} else if (lowerMessage.includes("battery") && lowerMessage.includes("drone")) {
  return "Our drones are solar-powered and designed to last over a month with minimal charging requirements.";
} else if (lowerMessage.includes("offline") && lowerMessage.includes("work")) {
  return "Yes, our system is designed to work completely offline using LoRa communication and onboard AI.";
} else if (lowerMessage.includes("call") && lowerMessage.includes("drone")) {
  return "The drone will call your registered number once it reaches the closest drop-point near your location.";
} else if (lowerMessage.includes("drop") && lowerMessage.includes("location")) {
  return "You can select your drop location in the app's delivery form. Make sure it's within the supported zone.";
} else if (lowerMessage.includes("security") || lowerMessage.includes("safe")) {
  return "Your delivery is secured using AES-128 encryption and biometric verification at the final step.";
} else if (lowerMessage.includes("biometric") || lowerMessage.includes("fingerprint")) {
  return "The drone uses biometric verification (like fingerprint or face scan) before handing over the parcel.";
} else if (lowerMessage.includes("rasa") || lowerMessage.includes("ai")) {
  return "Yes, this chatbot is powered by AI using Rasa and can understand basic queries about delivery and drone services.";
} else if (lowerMessage.includes("time") && lowerMessage.includes("delivery")) {
  return "Most deliveries are completed within 30–45 minutes, depending on distance and weather conditions.";
} else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
  return "Our delivery charges are minimal and depend on distance. You can view the exact cost in the app before confirming.";
} else if (lowerMessage.includes("working") && lowerMessage.includes("hours")) {
  return "Drone deliveries are operational from 7 AM to 7 PM daily.";
    }
    else {
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

