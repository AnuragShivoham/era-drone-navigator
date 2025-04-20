
import { useState, useCallback, useEffect } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface UseUnifiedOfflineAssistantReturn {
  chatHistory: ChatMessage[];
  sendMessage: (message: string) => void;
  isProcessing: boolean;
  connectionStatus: "disconnected" | "connecting" | "connected" | "error";
  setConnectToOfflineServer: (connect: boolean) => void;
  connectionError: string | null;
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

export function useUnifiedOfflineAssistant(
  initialBotMessage?: string
): UseUnifiedOfflineAssistantReturn {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      message:
        initialBotMessage ||
        "Hello! This is your ERA unified offline AI assistant connected via LoRa. How can I assist you?",
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectToOfflineServer, setConnectToOfflineServer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected" | "error"
  >("disconnected");
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Local AI keyword logic (same as original offline assistant)
  const localResponses: { keywords: string[]; response: string }[] = [
    {
      keywords: ["hello", "hi"],
      response:
        "Hello there! How can I assist with your drone delivery needs today?",
    },
    {
      keywords: ["delivery", "how"],
      response:
        "To place a delivery request, please provide your name, contact number, and select a drop zone. You can do this via the Delivery form in the app.",
    },
    {
      keywords: ["track", "status"],
      response:
        "You can track your delivery in the History section. If you have a specific parcel ID, I can help you check its current status.",
    },
    {
      keywords: ["problem", "help"],
      response:
        "I'm sorry to hear you're having trouble. Could you please describe the issue in more detail so I can assist you better?",
    },
    {
      keywords: ["drone", "how"],
      response:
        "Our drones navigate using a combination of computer vision and predefined waypoints. They operate offline using LoRa communication.",
    },
    {
      keywords: ["weather"],
      response:
        "Current weather conditions are suitable for drone operations. Clear skies with wind speed at 12 km/h.",
    },
    {
      keywords: ["thanks", "thank you"],
      response:
        "You're welcome! Let me know if there's anything else I can help you with.",
    },
    {
      keywords: ["cancel", "delivery"],
      response:
        "To cancel a delivery, go to the History section, select your parcel, and tap on 'Cancel Delivery'.",
    },
    {
      keywords: ["battery", "drone"],
      response:
        "Our drones are solar-powered and designed to last over a month with minimal charging requirements.",
    },
    {
      keywords: ["offline", "work"],
      response:
        "Yes, our system is designed to work completely offline using LoRa communication and onboard AI.",
    },
    {
      keywords: ["call", "drone"],
      response:
        "The drone will call your registered number once it reaches the closest drop-point near your location.",
    },
    {
      keywords: ["drop", "location"],
      response:
        "You can select your drop location in the app's delivery form. Make sure it's within the supported zone.",
    },
    {
      keywords: ["security", "safe"],
      response:
        "Your delivery is secured using AES-128 encryption and biometric verification at the final step.",
    },
    {
      keywords: ["biometric", "fingerprint"],
      response:
        "The drone uses biometric verification (like fingerprint or face scan) before handing over the parcel.",
    },
    {
      keywords: ["rasa", "ai"],
      response:
        "Yes, this chatbot is powered by AI using Rasa and can understand basic queries about delivery and drone services.",
    },
    {
      keywords: ["time", "delivery"],
      response:
        "Most deliveries are completed within 30–45 minutes, depending on distance and weather conditions.",
    },
    {
      keywords: ["price", "cost"],
      response:
        "Our delivery charges are minimal and depend on distance. You can view the exact cost in the app before confirming.",
    },
    {
      keywords: ["working", "hours"],
      response: "Drone deliveries are operational from 7 AM to 7 PM daily.",
    },
  ];

  // Returns local response if matched, else undefined
  const matchLocalResponse = (userMessage: string): string | undefined => {
    const lowerMessage = userMessage.toLowerCase();
    for (let entry of localResponses) {
      const match = entry.keywords.every((keyword) =>
        lowerMessage.includes(keyword)
      );
      if (match) return entry.response;
    }
    return undefined;
  };

  // Simulates connecting to offline AI server
  useEffect(() => {
    if (connectToOfflineServer) {
      setConnectionStatus("connecting");
      setConnectionError(null);
      // Simulate connection delay and success/failure
      const timer = setTimeout(() => {
        // Let's simulate a 90% chance of success
        const success = Math.random() < 0.9;
        if (success) {
          setConnectionStatus("connected");
        } else {
          setConnectionStatus("error");
          setConnectionError(
            "Failed to connect to offline AI server. Please check your connection or try again."
          );
        }
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setConnectionStatus("disconnected");
      setConnectionError(null);
    }
  }, [connectToOfflineServer]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isProcessing) return;

      setChatHistory((prev) => [...prev, { sender: "user", message }]);
      setIsProcessing(true);

      // If connected to offline AI server, send all requests to server
      if (connectionStatus === "connected") {
        try {
          const botResponse = await fetchFromOfflineAIServer(message);
          setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
        } catch (error) {
          // On error fallback to local bot response
          const fallbackResponse =
            "Offline AI server unreachable currently. Here's the local assistant response: " +
            (matchLocalResponse(message) ??
              `I understand you're asking about: "${message}". Could you please clarify or ask in a different way?`);
          setChatHistory((prev) => [...prev, { sender: "bot", message: fallbackResponse }]);
          setConnectionStatus("error");
          setConnectionError(
            "Lost connection to offline AI server during interaction."
          );
        } finally {
          setIsProcessing(false);
        }
        return;
      }

      // If not connected, try local bot logic first
      const localBotResponse = matchLocalResponse(message);
      if (localBotResponse) {
        setChatHistory((prev) => [...prev, { sender: "bot", message: localBotResponse }]);
        setIsProcessing(false);
        return;
      }

      // No local match, fallback to offline AI server (try connecting if enabled)
      if (connectToOfflineServer) {
        try {
          const botResponse = await fetchFromOfflineAIServer(message);
          setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
        } catch (error) {
          const fallbackResponse =
            "Offline AI server unreachable currently. Here's the local assistant response: " +
            (matchLocalResponse(message) ??
              `I understand you're asking about: "${message}". Could you please clarify or ask in a different way?`);
          setChatHistory((prev) => [...prev, { sender: "bot", message: fallbackResponse }]);
          setConnectionStatus("error");
          setConnectionError(
            "Lost connection to offline AI server during interaction."
          );
        } finally {
          setIsProcessing(false);
        }
        return;
      }

      // Finally fallback to local response with default message if no match
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          message: `I understand you're asking about: "${message}". Could you please clarify or ask in a different way?`,
        },
      ]);
      setIsProcessing(false);
    },
    [isProcessing, connectionStatus, connectToOfflineServer]
  );

  return {
    chatHistory,
    sendMessage,
    isProcessing,
    connectionStatus,
    setConnectToOfflineServer,
    connectionError,
  };
}
