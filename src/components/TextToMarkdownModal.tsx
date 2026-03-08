"use client";

import { useState, useMemo, useCallback } from "react";
import { X, Copy, Check, ArrowRight, FileText } from "lucide-react";

interface TextToMarkdownModalProps {
  onClose: () => void;
  onInsert: (markdown: string) => void;
}

export function TextToMarkdownModal({ onClose, onInsert }: TextToMarkdownModalProps) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => {
    if (!text.trim()) return "";
    
    const rawLines = text.split('\n');
    let isFirstBody = true;
    let inCodeBlock = false;
    
    const formattedLines: { type: string; text: string }[] = [];
    
    for (let i = 0; i < rawLines.length; i++) {
      const originalLine = rawLines[i];
      const line = originalLine.trim();
      
      if (/^`{3}/.test(line)) {
        inCodeBlock = !inCodeBlock;
        formattedLines.push({ type: 'raw', text: line });
        continue;
      }
      
      if (inCodeBlock) {
        formattedLines.push({ type: 'raw', text: originalLine });
        continue;
      }

      if (!line) {
         continue;
      }

      if (
        /^#{1,6}\s/.test(line) || 
        /^[-*+]\s/.test(line) || 
        /^\d+\.\s/.test(line) || 
        /^>/.test(line) || 
        /^\|.*\|$/.test(line) || 
        /^[-*_]{3,}$/.test(line) ||
        /^\*\*.*\*\*$/.test(line) || 
        /^__.*__$/.test(line) || 
        /^\*.*\*$/.test(line) || 
        /^_.*_$/.test(line)
      ) {
        formattedLines.push({ type: 'raw', text: line });
        continue;
      }
      
      const isShort = line.length < 80;
      const hasHeadingPunctuation = /[.!;]$/.test(line);
      
      if (isShort && !hasHeadingPunctuation) {
        formattedLines.push({ type: 'heading', text: (formattedLines.length === 0 ? `# ${line}` : `## ${line}`) });
        continue;
      }
      
      if (isFirstBody && line.length >= 80) {
        isFirstBody = false;
        formattedLines.push({ type: 'paragraph', text: `**${line}**` });
        continue;
      }
      
      if (line.length < 200) {
        formattedLines.push({ type: 'list', text: `* ${line}` });
      } else {
        formattedLines.push({ type: 'paragraph', text: line });
      }
    }

    let result = '';
    for (let i = 0; i < formattedLines.length; i++) {
       const curr = formattedLines[i];
       const prev = i > 0 ? formattedLines[i-1] : null;
       
       if (i === 0) {
         result += curr.text;
       } else {
         if (
           (curr.type === 'list' && prev?.type === 'list') ||
           (curr.type === 'raw' && prev?.type === 'raw')
         ) {
           result += '\n' + curr.text;
         } else {
           result += '\n\n' + curr.text;
         }
       }
    }
    
    return result;
  }, [text]);

  const handleCopy = useCallback(async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const handleInsert = useCallback(() => {
    if (!markdown) return;
    onInsert(markdown);
    onClose();
  }, [markdown, onInsert, onClose]);

  const processFile = useCallback((file: File) => {
    if (!file || !file.name.match(/\.txt$/i)) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setText(result);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col w-[92vw] max-w-5xl h-[80vh] bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-200 dark:border-[#3e3e42] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-gray-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              Text → Markdown Converter
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body: two panes */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-[#3e3e42]">
          {/* Left: Text input */}
          <div 
            className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0 flex justify-between items-center">
              <span>Text Input (Paste or Drop .txt file)</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your plain text here, or drag and drop a .txt file..."
              spellCheck={false}
              className="flex-1 w-full p-4 resize-none outline-none bg-transparent text-[#1a1a1a] dark:text-[#d4d4d4] font-mono text-sm leading-[1.6] placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>

          {/* Arrow indicator */}
          <div className="hidden md:flex items-center justify-center w-0 overflow-visible z-10">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 shadow-md -translate-x-1/2">
              <ArrowRight size={14} className="text-white" />
            </div>
          </div>

          {/* Right: Markdown output */}
          <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full">
            <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
              Markdown Output
            </div>
            <pre className="flex-1 overflow-auto p-4 text-sm font-mono leading-[1.6] text-[#1a1a1a] dark:text-[#d4d4d4] whitespace-pre-wrap break-words select-all">
              {markdown || (
                <span className="text-gray-400 dark:text-gray-600 not-italic font-sans">
                  Markdown will appear here…
                </span>
              )}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-gray-50 dark:bg-[#252526] border-t border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
          <button
            onClick={handleCopy}
            disabled={!markdown}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded border shadow-sm transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:shadow-none ${
              copied
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 hover:shadow-md disabled:hover:bg-indigo-50 dark:disabled:hover:bg-indigo-500/10"
            }`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={handleInsert}
            disabled={!markdown}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Insert into Editor
          </button>
        </div>
      </div>
    </div>
  );
}
