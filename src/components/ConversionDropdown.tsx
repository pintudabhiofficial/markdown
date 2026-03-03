"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, FileCode2, FileDown, FileType2, ScanSearch, FileInput, ArrowRightLeft } from "lucide-react";

interface ConversionDropdownProps {
  onHtmlToMarkdown: () => void;
  onMarkdownToPdf: () => void;
  onMarkdownToWord: () => void;
  onPdfToMarkdown: () => void;
  onWordToMarkdown: () => void;
}

const groups = [
  {
    label: "Export from Markdown",
    items: [
      { key: "mdToPdf",  label: "Markdown → PDF",  Icon: FileDown,  color: "text-rose-500" },
      { key: "mdToWord", label: "Markdown → Word", Icon: FileType2, color: "text-blue-500" },
    ],
  },
  {
    label: "Import to Markdown",
    items: [
      { key: "htmlToMd", label: "HTML → Markdown",  Icon: FileCode2,  color: "text-orange-500" },
      { key: "pdfToMd",  label: "PDF → Markdown",   Icon: ScanSearch, color: "text-purple-500" },
      { key: "wordToMd", label: "Word → Markdown",  Icon: FileInput,  color: "text-green-500" },
    ],
  },
] as const;

export function ConversionDropdown({
  onHtmlToMarkdown,
  onMarkdownToPdf,
  onMarkdownToWord,
  onPdfToMarkdown,
  onWordToMarkdown,
}: ConversionDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlers: Record<string, () => void> = {
    htmlToMd: onHtmlToMarkdown,
    mdToPdf:  onMarkdownToPdf,
    mdToWord: onMarkdownToWord,
    pdfToMd:  onPdfToMarkdown,
    wordToMd: onWordToMarkdown,
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-600 dark:text-gray-300 transition-all duration-150 active:scale-[0.97]"
        title="Convert"
      >
        <ArrowRightLeft size={15} />
        <span className="hidden sm:inline">Convert</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-56 bg-white dark:bg-[#252526] border border-gray-200 dark:border-[#3e3e42] rounded-lg shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1">
          {groups.map((group, gi) => (
            <div key={group.label}>
              {gi > 0 && <div className="my-1 border-t border-gray-100 dark:border-[#3e3e42]" />}
              <div className="px-3 pt-2 pb-1 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {group.label}
              </div>
              {group.items.map(({ key, label, Icon, color }) => (
                <button
                  key={key}
                  onClick={() => { handlers[key](); setOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <Icon size={14} className={`${color} flex-shrink-0`} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
