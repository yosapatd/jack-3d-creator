import { useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-scrubbed frame sequence on a canvas.
 *
 * Why frames on a canvas rather than a <video>:
 *  - MP4/H.264 has no alpha channel, and Safari does not composite the alpha
 *    channel of a VP9 WebM, so a transparent video would need two encodes and
 *    still break somewhere.
 *  - Seeking a video via currentTime on every scroll frame is unreliable on
 *    iOS Safari. Drawing an already-decoded image is not.
 *
 * Cost of the approach is bytes, so the sequence is only fetched when it will
 * actually be used: reduced-motion and data-saver visitors get frame 0 alone.
 */

const FRAME_COUNT = 48;
const FRAME_W = 560;
const FRAME_H = 497;

const frameUrl = (i: number) => `/hero/f${String(i).padStart(2, '0')}.webp`;

type ScrollSequenceProps = {
  progress: MotionValue<number>;
  className?: string;
  alt: string;
};

export default function ScrollSequence({
  progress,
  className = '',
  alt,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const drawnRef = useRef(-1);
  const [scrubReady, setScrubReady] = useState(false);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete) return;
    if (drawnRef.current === index) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, FRAME_W, FRAME_H);
    ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
    drawnRef.current = index;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = (i: number) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`frame ${i} failed`));
        img.src = frameUrl(i);
      });

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const frugal =
      Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? '');

    load(0)
      .then((img) => {
        if (cancelled) return undefined;
        framesRef.current[0] = img;
        draw(0);
        if (prefersReduced || frugal) return undefined;

        return Promise.all(
          Array.from({ length: FRAME_COUNT - 1 }, (_, k) =>
            load(k + 1).then((frame) => {
              framesRef.current[k + 1] = frame;
            })
          )
        ).then(() => {
          if (!cancelled) setScrubReady(true);
        });
      })
      .catch(() => {
        /* leave the canvas empty rather than throwing during scroll */
      });

    return () => {
      cancelled = true;
    };
  }, [draw]);

  const frameFor = useCallback(
    (v: number) => {
      if (!scrubReady) return 0;
      const i = Math.round(v * (FRAME_COUNT - 1));
      return Math.min(FRAME_COUNT - 1, Math.max(0, i));
    },
    [scrubReady]
  );

  useMotionValueEvent(progress, 'change', (v) => draw(frameFor(v)));

  // Catch up as soon as the full sequence lands, without waiting for a scroll.
  useEffect(() => {
    if (scrubReady) draw(frameFor(progress.get()));
  }, [scrubReady, draw, frameFor, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_W}
      height={FRAME_H}
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label={alt}
    />
  );
}
