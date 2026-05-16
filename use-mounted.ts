'use client';

import { useState, useEffect } from 'react';
import { getRandomBiblicalMessage } from '@/lib/biblical-messages';
import { Heart } from 'lucide-react';

export function BiblicalMessage() {
  const [message, setMessage] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get random message on component mount
    const randomMessage = getRandomBiblicalMessage();
    setMessage(randomMessage);
    setIsVisible(true);
  }, []);

  const handleRefresh = () => {
    setIsVisible(false);
    setTimeout(() => {
      const randomMessage = getRandomBiblicalMessage();
      setMessage(randomMessage);
      setIsVisible(true);
    }, 300);
  };

  if (!message) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 rounded-xl p-8 max-w-2xl mx-auto transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="flex items-start gap-4">
        <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1 animate-pulse" />
        <div className="flex-1">
          <p className="text-lg font-display italic text-foreground leading-relaxed mb-4">
            "{message.text}"
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{message.reference}</span>
              {' — '}
              {message.context}
            </p>
            <button
              onClick={handleRefresh}
              className="text-xs px-3 py-1 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
            >
              Nova mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
