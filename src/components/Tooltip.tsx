"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

export function Tooltip({ children, content }: { children: ReactNode; content: string }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  };

  const show = () => {
    calculatePosition();
    setVisible(true);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      show();
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    hide();
  };

  const handleTouchStart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    show();
  };

  const handleTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      hide();
    }, 2500);
  };

  useEffect(() => {
    if (visible) {
      const handleScroll = () => calculatePosition();
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [visible]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>
      {mounted && visible &&
        createPortal(
          <div
            className="lg:hidden fixed z-[99999] px-2.5 py-1.5 text-[12px] font-medium tracking-wide text-white bg-slate-800 dark:bg-white dark:text-slate-900 rounded shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
            style={{ 
              top: `${coords.top}px`, 
              left: `${coords.left}px`,
              transform: "translateX(-50%)"
            }}
          >
            {content}
            <div 
              className="absolute w-2 h-2 bg-slate-800 dark:bg-white rotate-45"
              style={{ top: "-3px", left: "calc(50% - 4px)" }}
            />
          </div>,
          document.body
        )}
    </>
  );
}
