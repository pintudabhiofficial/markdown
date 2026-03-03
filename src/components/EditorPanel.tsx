"use client";

import React, { useMemo, useCallback } from "react";
import { FormatToolbar } from "./FormatToolbar";

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  onScroll: () => void;
  onCursorChange?: (line: number, col: number) => void;
}

export function EditorPanel({ value, onChange, editorRef, onScroll, onCursorChange }: EditorPanelProps) {
  const lineNumbers = useMemo(() => {
    const count = value.split("\n").length;
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [value]);

  const handleFormat = useCallback((prefix: string, suffix: string, defaultText = "text") => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const newValue = value.substring(0, start) + prefix + selected + suffix + value.substring(end);
    onChange(newValue);
    requestAnimationFrame(() => {
      ta.selectionStart = start + prefix.length;
      ta.selectionEnd = start + prefix.length + selected.length;
      ta.focus();
    });
  }, [value, onChange, editorRef]);

  const handleLinePrefix = useCallback((prefix: string) => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
    onChange(newValue);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + prefix.length;
      ta.focus();
    });
  }, [value, onChange, editorRef]);

  const handleInsertLine = useCallback((text: string) => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const newValue = value.substring(0, start) + text + value.substring(ta.selectionEnd);
    onChange(newValue);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + text.length;
      ta.focus();
    });
  }, [value, onChange, editorRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);
      requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; });
      return;
    }
    if (mod && e.key === "b") { e.preventDefault(); handleFormat("**", "**", "bold text"); }
    else if (mod && e.key === "i") { e.preventDefault(); handleFormat("*", "*", "italic text"); }
    else if (mod && e.key === "k") { e.preventDefault(); handleFormat("[", "](url)", "link text"); }
    else if (mod && e.key === "e") { e.preventDefault(); handleFormat("`", "`", "code"); }
  };

  const handleSelect = () => {
    if (!onCursorChange || !editorRef.current) return;
    const ta = editorRef.current;
    const pos = ta.selectionStart;
    const before = value.substring(0, pos);
    onCursorChange(before.split("\n").length, pos - before.lastIndexOf("\n"));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-[#0f1117]">
      {/* Single combined bar: label + format buttons */}
      <FormatToolbar onFormat={handleFormat} onLinePrefix={handleLinePrefix} onInsertLine={handleInsertLine} />

      {/* Editor area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div
          className="flex-shrink-0 py-4 px-2 text-right select-none text-xs leading-[1.6] font-mono text-slate-300 dark:text-slate-600 bg-slate-50/50 dark:bg-[#0c0e14] overflow-hidden"
          style={{ minWidth: "3rem" }}
        >
          {lineNumbers.map((n) => <div key={n}>{n}</div>)}
        </div>

        {/* Textarea */}
        <textarea
          ref={editorRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={onScroll}
          onSelect={handleSelect}
          onClick={handleSelect}
          spellCheck={false}
          className="flex-1 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-900 dark:text-slate-300 font-mono text-sm leading-[1.6] placeholder:text-slate-300 dark:placeholder:text-slate-600 caret-indigo-500"
          placeholder="Start writing Markdown..."
        />
      </div>
    </div>
  );
}
