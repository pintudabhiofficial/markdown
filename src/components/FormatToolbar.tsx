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
  /* ── Per-group button styles: coloured at rest, brighter on hover ── */
  const btn = (color: "indigo" | "violet" | "purple" | "emerald") => {
    const map = {
      indigo:  "text-indigo-500 dark:text-indigo-400 hover:text-white dark:hover:text-white hover:bg-indigo-500 dark:hover:bg-indigo-500",
      violet:  "text-violet-500 dark:text-violet-400 hover:text-white dark:hover:text-white hover:bg-violet-500 dark:hover:bg-violet-500",
      purple:  "text-purple-500 dark:text-purple-400 hover:text-white dark:hover:text-white hover:bg-purple-500 dark:hover:bg-purple-500",
      emerald: "text-emerald-600 dark:text-emerald-400 hover:text-white dark:hover:text-white hover:bg-emerald-500 dark:hover:bg-emerald-500",
    };
    return `flex items-center justify-center w-8 h-8 rounded-md font-medium transition-all duration-100 active:scale-[0.88] ${map[color]}`;
  };

  const sep = <div className="w-px h-5 bg-slate-300 dark:bg-white/[0.12] mx-1.5 flex-shrink-0" />;

  return (
    <div className="flex items-center h-10 px-3 gap-0.5
                    border-b border-slate-200 dark:border-white/[0.10]
                    bg-slate-50 dark:bg-slate-800/80
                    flex-shrink-0 overflow-x-auto scrollbar-none">

      {/* Label */}
      <div className="flex items-center gap-1.5 mr-2 flex-shrink-0">
        <FileEdit size={13} className="text-indigo-500 dark:text-indigo-400" />
        <span className="text-[11px] font-bold bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent uppercase tracking-widest select-none">
          Editor
        </span>
      </div>

      {sep}

      {/* ── Text formatting · indigo ── */}
      <button className={btn("indigo")} title="Bold (Ctrl+B)" onClick={() => onFormat("**", "**", "bold text")}>
        <Bold size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("indigo")} title="Italic (Ctrl+I)" onClick={() => onFormat("*", "*", "italic text")}>
        <Italic size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("indigo")} title="Strikethrough" onClick={() => onFormat("~~", "~~", "text")}>
        <Strikethrough size={15} strokeWidth={2.5} />
      </button>

      {sep}

      {/* ── Headings · violet ── */}
      <button className={btn("violet")} title="Heading 1" onClick={() => onLinePrefix("# ")}>
        <Heading1 size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("violet")} title="Heading 2" onClick={() => onLinePrefix("## ")}>
        <Heading2 size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("violet")} title="Heading 3" onClick={() => onLinePrefix("### ")}>
        <Heading3 size={15} strokeWidth={2.5} />
      </button>

      {sep}

      {/* ── Lists & Quote · purple ── */}
      <button className={btn("purple")} title="Unordered List" onClick={() => onLinePrefix("- ")}>
        <List size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("purple")} title="Ordered List" onClick={() => onLinePrefix("1. ")}>
        <ListOrdered size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("purple")} title="Blockquote" onClick={() => onLinePrefix("> ")}>
        <Quote size={15} strokeWidth={2.5} />
      </button>

      {sep}

      {/* ── Code, links & misc · emerald ── */}
      <button className={btn("emerald")} title="Inline Code (Ctrl+E)" onClick={() => onFormat("`", "`", "code")}>
        <Code size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("emerald")} title="Link (Ctrl+K)" onClick={() => onFormat("[", "](url)", "link text")}>
        <Link size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("emerald")} title="Image" onClick={() => onFormat("![", "](url)", "alt text")}>
        <Image size={15} strokeWidth={2.5} />
      </button>
      <button className={btn("emerald")} title="Horizontal Rule" onClick={() => onInsertLine("\n---\n")}>
        <Minus size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
