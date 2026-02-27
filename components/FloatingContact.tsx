"use client";

import { MessageCircle, Phone, X, MessageSquare, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;

      if (shouldShow && !isVisible) {
        setIsVisible(true);
        setShowInstruction(true);
      } else if (!shouldShow) {
        setIsVisible(false);
        setShowInstruction(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleToggle = () => {
    setShowChatbot(!showChatbot);
    if (showInstruction) {
      setShowInstruction(false);
    }
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const handleMessageUs = () => {
    window.open('https://m.me/61561838143537', '_blank');
    setShowChatbot(false);
  };

  return (
    <>
      {/* Chatbot Overlay */}
      {showChatbot && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={handleCloseChatbot} />
      )}

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-36 sm:bottom-40 left-4 right-4 sm:left-auto sm:right-8 sm:w-80 z-[60] transition-all duration-300 ${showChatbot ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Caliber Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={handleCloseChatbot}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-gray-700 text-sm">
                Hi there! 👋 Welcome to Caliber Business Resource. How can I help you today?
              </p>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-right">Just now</div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3">Choose an option:</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleMessageUs}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Message us on Messenger
              </button>
              <a
                href="tel:+14059268324"
                className="flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call us directly
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Container */}
      <div className={`fixed bottom-24 right-4 sm:right-8 z-30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Toggle Button with Instruction Tooltip */}
        <div className="relative">
          {/* Instruction Tooltip */}
          <div
            className={`absolute -top-12 right-0 bg-white text-gray-900 px-3 sm:px-4 py-2 rounded-lg shadow-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-500 ${showInstruction && !showChatbot ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span>Message us or call!</span>
            </div>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white transform rotate-45"></div>
          </div>

          <button
            onClick={handleToggle}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${showChatbot ? 'bg-gray-700 rotate-45' : 'bg-primary hover:bg-primary/90'}`}
            aria-label={showChatbot ? 'Close chatbot' : 'Open chatbot'}
          >
            {showChatbot ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}