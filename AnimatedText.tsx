import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useRef } from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

type CharProps = {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder holds the layout, animated copy sits on top. */}
      <span className="opacity-0" aria-hidden="true">
        {char}
      </span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className = '',
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wordIdx) => {
        const startIndex = charIndex;
        charIndex += word.length + 1; // +1 for the space that follows

        return (
          <span key={`${word}-${wordIdx}`} className="inline-block">
            {word.split('').map((char, i) => {
              const position = startIndex + i;
              return (
                <Char
                  key={`${char}-${i}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[position / totalChars, (position + 1) / totalChars]}
                />
              );
            })}
            {wordIdx < words.length - 1 ? '\u00A0' : null}
          </span>
        );
      })}
    </p>
  );
}
