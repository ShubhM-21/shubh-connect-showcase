"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export const ChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hello! How can I help you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractWebsiteContent = () => {
    // Try to get main content first
    const mainTag = document.querySelector("main");
    if (mainTag) {
      return mainTag.innerText;
    }
    // Fallback to body text
    return document.body.innerText;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    const inputValue = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      const websiteContent = extractWebsiteContent();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: inputValue, websiteContent })
      });

      // CRITICAL FIX: Check if returned non-JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`API returned non-JSON. Check if your API route is in the correct folder. Status: ${res.status}`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || `Server Error: ${res.status}`);
      }

      const aiResponse = data.text;
      const assistantMessage: Message = { role: "assistant", text: aiResponse };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {
      console.error("Frontend Chat Error:", err);
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: `Error: ${err instanceof Error ? err.message : String(err)}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isExpanded && (
        <div className="w-80 sm:w-96 h-[30rem] bg-white dark:bg-slate-900 rounded-xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 mb-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Portfolio Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => {
              if (msg.role === 'assistant' && msg.text.trim() === '[SHOW_CONTACT_BUTTON]') {
                return (
                  <div key={idx} className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-slate-200 p-3 rounded-xl max-w-[85%] text-sm">
                      <p className="mb-2">I don't have that information, but I'd love to connect with you!</p>
                      <a
                        href="#contact"
                        onClick={() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Go to Contact Page
                      </a>
                    </div>
                  </div>
                );
              }

              return (
                <div key={idx} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3 rounded-xl max-w-[85%] text-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-slate-600 dark:text-slate-300">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask me about the portfolio..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
};
