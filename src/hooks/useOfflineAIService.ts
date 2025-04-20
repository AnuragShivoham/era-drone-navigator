
import { useState, useEffect, useCallback } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface UseOfflineAIServiceReturn {
  chatHistory: ChatMessage[];
  sendMessage: (message: string) => void;
  isProcessing: boolean;
}

// Simulated function to mimic async fetch from local offline AI server over LoRa
const fetchFromOfflineAIServer = async (message: string): Promise<string> => {
  // For prototype, delay and return a canned response
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      // Simple simulated keyword matching to demonstrate
      if (lowerMsg.includes("delivery")) {
        resolve(
          "Offline AI: To place a delivery, provide name, contact, and drop zone."
        );
      } else if (lowerMsg.includes("status")) {
        resolve("Offline AI: You can track your parcel in the History tab.");
      } else {
        resolve(
          `Offline AI: Received your query '${message}'. Backend AI not yet available.`
        );
      }
    }, 1000); // Simulate network delay over LoRa
  });
};

export function useOfflineAIService(
  initialBotMessage?: string
): UseOfflineAIServiceReturn {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      message:
        initialBotMessage ||
        "Hello! This is your ERA offline AI assistant connected via LoRa. How can I assist you?",
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isProcessing) return;

    setChatHistory((prev) => [...prev, { sender: "user", message }]);
    setIsProcessing(true);

    // Simulate async interaction with offline AI LoRa server
    try {
      const botResponse = await fetchFromOfflineAIServer(message);
      setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  return { chatHistory, sendMessage, isProcessing };
}
