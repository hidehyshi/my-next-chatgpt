// components/TypingText.tsx
"use client";

import { useEffect, useState, useRef } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
}

export default function TypingText({ text, speed = 100 }: TypingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0); // テキストが変わるたびにリセット

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      style={{
        whiteSpace: "pre-wrap", // 改行を反映
        wordBreak: "break-word", // 長い単語で折り返し
        lineHeight: "1.5",
        fontSize: "16px",
      }}
    >
      {text.slice(0, index)}
    </div>
  );
}
