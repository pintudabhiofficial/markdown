"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { Copy, Check } from "lucide-react";

interface HtmlPanelProps {
  markdown: string;
}

export function HtmlPanel({ markdown }: HtmlPanelProps) {
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    return marked(markdown, { async: false }) as string;
  }, [markdown]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#3e3e42] flex-shrink-0">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Generated HTML
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title="Copy HTML"
        >
          {copied ? (
            <Check size={13} className="text-green-500" />
          ) : (
            <Copy size={13} />
          )}
          {copied ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      {/* HTML source */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm font-mono leading-[1.6] text-[#1a1a1a] dark:text-[#d4d4d4] whitespace-pre-wrap break-all">
          {html}
        </pre>
      </div>
    </div>
  );
}
