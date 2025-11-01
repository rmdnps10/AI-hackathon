import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export function useTypingEffect({
  text,
  speed = 100,
  delay = 0,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}
