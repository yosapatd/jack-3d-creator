import { motion } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useMemo } from 'react';

type FadeInProps = {
  children?: ReactNode;
  /** Element type to render, e.g. 'div' | 'h1' | 'nav' | 'p'. */
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  // motion.create() lets the wrapper animate whatever tag is passed in.
  const MotionTag = useMemo(
    () => motion.create(as as ElementType) as ElementType,
    [as]
  );

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
