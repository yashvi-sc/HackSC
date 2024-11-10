// components/TTSButton.tsx
"use client";

import React from 'react';

interface TTSButtonProps {
  label: string;
}

const TTSButton: React.FC<TTSButtonProps> = ({ label }) => {
  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear the queue
      const utterance = new SpeechSynthesisUtterance(label);
      utterance.onstart = () => console.log("Speech started");
      utterance.onend = () => console.log("Speech ended");
      utterance.onerror = (event) => console.error("Speech synthesis error:", event);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <button onClick={handleSpeak} className="border px-4 py-2 rounded text-blue-500">
      {label}
    </button>
  );
};

export default TTSButton;
