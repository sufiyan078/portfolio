import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  children,
  className = '',
  duration = 75
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText((prev) => prev + children.charAt(i));
        setI((prev) => prev + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, i]);

  return (
    <span className={className}>
      {displayedText}
      {i < children.length && (
        <span className="inline-block w-2 sm:w-3 md:w-4 h-[1em] ml-1 bg-[#FF8F00] animate-pulse align-middle" />
      )}
    </span>
  );
};
