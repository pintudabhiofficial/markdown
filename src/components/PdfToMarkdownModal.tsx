"use client";

import { useState, useRef, useCallback } from "react";
import { X, Copy, Check, Upload, ScanSearch } from "lucide-react";

interface PdfToMarkdownModalProps {
  onClose: () => void;
  onInsert: (markdown: string) => void;
}

export function PdfToMarkdownModal({ onClose, onInsert }: PdfToMarkdownModalProps) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied]     = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    setError("");
    setMarkdown("");

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const buffer = await file.arrayBuffer();
      const pdf    = await pdfjsLib.getDocument({ data: buffer }).promise;
      const parts: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page    = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text    = content.items
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => ("str" in item ? item.str : ""))
          .join(" ")
          .trim();
        if (text) {
          parts.push(pdf.numPages > 1 ? `## Page ${i}\n\n${text}` : text);
        }
      }

      setMarkdown(parts.join("\n\n---\n\n") || "*(No text could be extracted)*");
    } catch {
      setError("Failed to parse PDF. The file may be encrypted or image-only.");
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
            <ScanSearch size={18} className="text-blue-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">PDF → Markdown Converter</span>
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
              PDF Input
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
                  {fileName ? <strong>{fileName}</strong> : "Click or drag & drop a PDF file"}
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                />
              </div>
              {error   && <p className="text-sm text-red-500 text-center">{error}</p>}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  Extracting text…
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
              {markdown || <span className="text-gray-400 dark:text-gray-600 font-sans not-italic">Extracted markdown will appear here…</span>}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-gray-50 dark:bg-[#252526] border-t border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
          <button onClick={handleCopy} disabled={!markdown} className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded border shadow-sm transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:shadow-none ${copied ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 hover:shadow-md disabled:hover:bg-indigo-50 dark:disabled:hover:bg-indigo-500/10"}`}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
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
