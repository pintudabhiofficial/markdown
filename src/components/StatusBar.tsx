"use client";

import { useMemo } from "react";

interface StatusBarProps {
  text: string;
  cursorLine?: number;
  cursorCol?: number;
}

export function StatusBar({ text, cursorLine, cursorCol }: StatusBarProps) {
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    return { words, chars: text.length, lines: text.split("\n").length, readMin: Math.max(1, Math.ceil(words / 200)) };
  }, [text]);

  return (
    <footer className="flex items-center justify-between h-7 px-4 text-[11px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/[0.06] flex-shrink-0 font-mono select-none tabular-nums text-slate-400">
      <div className="flex items-center gap-4">
        {cursorLine != null && cursorCol != null && (
          <span className="text-indigo-300/70">Ln {cursorLine}, Col {cursorCol}</span>
        )}
        <span>{stats.lines} lines</span>
        <span>{stats.words} words</span>
      </div>
      <div className="flex items-center gap-4">
        <span>~{stats.readMin} min read</span>
        <span className="text-violet-300/50">Markdown</span>
      </div>
    </footer>
  );
}
