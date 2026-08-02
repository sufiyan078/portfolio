import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  children,
  className = '',
  duration = 75,
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index < children.length) {
          index++;
          setDisplayedText(children.slice(0, index));
        } else {
          setIsTyping(false);
          clearInterval(intervalId);
        }
      }, duration);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [children, duration, delay]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-2 sm:w-3 md:w-4 h-[1em] ml-1 bg-[#FF8F00] animate-pulse align-middle" />
      )}
    </span>
  );
};
