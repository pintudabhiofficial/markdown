"use client";

import { useState, useRef, useCallback } from "react";
import { X, Copy, Check, Upload, FileInput } from "lucide-react";
import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

interface WordToMarkdownModalProps {
  onClose: () => void;
  onInsert: (markdown: string) => void;
}

export function WordToMarkdownModal({ onClose, onInsert }: WordToMarkdownModalProps) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied]     = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!file || (!validTypes.includes(file.type) && !file.name.match(/\.docx?$/i))) {
      setError("Please select a valid Word file (.docx or .doc).");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    setError("");
    setMarkdown("");

    try {
      const mammoth = await import("mammoth");
      const buffer  = await file.arrayBuffer();
      const result  = await mammoth.convertToHtml({ arrayBuffer: buffer });
      setMarkdown(turndown.turndown(result.value) || "*(No content found)*");
    } catch {
      setError("Failed to parse the Word document. Only .docx files are fully supported.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col w-[92vw] max-w-5xl h-[80vh] bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-200 dark:border-[#3e3e42] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileInput size={18} className="text-blue-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Word → Markdown Converter</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors" title="Close">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden divide-x divide-gray-200 dark:divide-[#3e3e42]">

          {/* Left: upload */}
          <div className="flex flex-col w-1/2 h-full">
            <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
              Word Input
            </div>
            <div
              className="flex-1 flex flex-col items-center justify-center p-6 gap-4"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div
                onClick={() => inputRef.current?.click()}
                className="flex flex-col items-center gap-3 w-full max-w-xs border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
              >
                <Upload size={32} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  {fileName ? <strong>{fileName}</strong> : "Click or drag & drop a Word file (.docx)"}
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                />
              </div>
              {error   && <p className="text-sm text-red-500 text-center">{error}</p>}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  Converting…
                </div>
              )}
            </div>
          </div>

          {/* Right: output */}
          <div className="flex flex-col w-1/2 h-full">
            <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
              Markdown Output
            </div>
            <pre className="flex-1 overflow-auto p-4 text-sm font-mono leading-[1.6] text-[#1a1a1a] dark:text-[#d4d4d4] whitespace-pre-wrap break-words">
              {markdown || <span className="text-gray-400 dark:text-gray-600 font-sans not-italic">Converted markdown will appear here…</span>}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-gray-50 dark:bg-[#252526] border-t border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
          <button onClick={handleCopy} disabled={!markdown} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button onClick={handleInsert} disabled={!markdown} className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Insert into Editor
          </button>
        </div>
      </div>
    </div>
  );
}
