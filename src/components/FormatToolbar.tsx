"use client";

import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  Link, Code, List, ListOrdered, Quote, Minus, Image, FileEdit,
} from "lucide-react";

interface FormatToolbarProps {
  onFormat: (prefix: string, suffix: string, defaultText?: string) => void;
  onLinePrefix: (prefix: string) => void;
  onInsertLine: (text: string) => void;
}

export function FormatToolbar({ onFormat, onLinePrefix, onInsertLine }: FormatToolbarProps) {
  const btn =
    "flex items-center justify-center w-7 h-7 rounded-md text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-75 active:scale-[0.9]";

  const sep = <div className="w-px h-4 bg-slate-200 dark:bg-white/[0.06] mx-1 flex-shrink-0" />;

  return (
    <div className="flex items-center h-9 px-3 gap-0.5 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50/80 dark:bg-slate-900/50 flex-shrink-0 overflow-x-auto backdrop-blur-sm">
      {/* Label */}
      <div className="flex items-center gap-1.5 mr-2 flex-shrink-0">
        <FileEdit size={12} className="text-indigo-400/60 dark:text-indigo-400/40" />
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Editor
        </span>
      </div>

      {sep}

      <button className={btn} title="Bold (Ctrl+B)" onClick={() => onFormat("**", "**", "bold text")}>
        <Bold size={14} />
      </button>
      <button className={btn} title="Italic (Ctrl+I)" onClick={() => onFormat("*", "*", "italic text")}>
        <Italic size={14} />
      </button>
      <button className={btn} title="Strikethrough" onClick={() => onFormat("~~", "~~", "text")}>
        <Strikethrough size={14} />
      </button>

      {sep}

      <button className={btn} title="Heading 1" onClick={() => onLinePrefix("# ")}>
        <Heading1 size={14} />
      </button>
      <button className={btn} title="Heading 2" onClick={() => onLinePrefix("## ")}>
        <Heading2 size={14} />
      </button>
      <button className={btn} title="Heading 3" onClick={() => onLinePrefix("### ")}>
        <Heading3 size={14} />
      </button>

      {sep}

      <button className={btn} title="Unordered List" onClick={() => onLinePrefix("- ")}>
        <List size={14} />
      </button>
      <button className={btn} title="Ordered List" onClick={() => onLinePrefix("1. ")}>
        <ListOrdered size={14} />
      </button>
      <button className={btn} title="Blockquote" onClick={() => onLinePrefix("> ")}>
        <Quote size={14} />
      </button>

      {sep}

      <button className={btn} title="Inline Code (Ctrl+E)" onClick={() => onFormat("`", "`", "code")}>
        <Code size={14} />
      </button>
      <button className={btn} title="Link (Ctrl+K)" onClick={() => onFormat("[", "](url)", "link text")}>
        <Link size={14} />
      </button>
      <button className={btn} title="Image" onClick={() => onFormat("![", "](url)", "alt text")}>
        <Image size={14} />
      </button>
      <button className={btn} title="Horizontal Rule" onClick={() => onInsertLine("\n---\n")}>
        <Minus size={14} />
      </button>
    </div>
  );
}
