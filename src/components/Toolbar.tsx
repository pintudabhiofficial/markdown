"use client";

import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import {
  RotateCcw, Copy, Check, Moon, Sun, ArrowDownUp,
  FileDown, FileUp, FileText, FileCode, FileType, Linkedin,
} from "lucide-react";
import { Tooltip } from "./Tooltip";

interface ToolbarProps {
  onReset: () => void;
  onCopy: () => void;
  onExportPdf: () => void;
  onHtmlToMarkdown: () => void;
  onMarkdownToWord: () => void;
  onPdfToMarkdown: () => void;
  onWordToMarkdown: () => void;
  onTextToMarkdown: () => void;
  syncScroll: boolean;
  onSyncScrollToggle: () => void;
}

export function Toolbar({
  onReset,
  onCopy,
  onExportPdf,
  onHtmlToMarkdown,
  onMarkdownToWord,
  onPdfToMarkdown,
  onWordToMarkdown,
  onTextToMarkdown,
  syncScroll,
  onSyncScrollToggle,
}: ToolbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col justify-center py-2 px-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/[0.06] flex-shrink-0 select-none">
      <div className="grid grid-cols-[auto_1fr_auto] gap-y-1.5 items-center w-full">
        
        {/* Brand — always visible, pinned left */}
        <div className="flex items-center gap-2.5 mr-2 flex-shrink-0 col-start-1 row-start-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent hidden lg:inline whitespace-nowrap">
            Markdown Preview Live
          </span>
        </div>

        {/* Scrollable middle — top row tool buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none min-w-0 col-start-2 row-start-1">
          <Sep />

          {/* Utility */}
          <ToolBtn icon={<RotateCcw size={14} />} label="Reset" onClick={onReset} />
          <ToolBtn
            icon={copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            label={copied ? "Copied!" : "Copy"}
            onClick={handleCopy}
            active={copied}
          />

          <Sep />

          {/* Export buttons */}
          <ToolBtn icon={<FileText size={14} />} label="Export PDF" onClick={onExportPdf} variant="export" />
          <ToolBtn icon={<FileType size={14} />} label="Export Word" onClick={onMarkdownToWord} variant="export" />

          <Sep />

          {/* Toggles */}
          <ToggleBtn
            icon={<ArrowDownUp size={14} />}
            label="Sync scroll"
            active={syncScroll}
            onClick={onSyncScrollToggle}
          />
          <ToggleBtn
            icon={theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            label="Dark mode"
            active={theme === "dark"}
            onClick={toggleTheme}
          />
        </div>

        {/* LinkedIn — always visible, pinned right */}
        <a
          href="https://www.linkedin.com/in/pintudabhi/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 ml-2 px-2.5 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#0958a8] text-white transition-colors flex-shrink-0 col-start-3 row-start-1"
          title="LinkedIn - Pintu Dabhi"
        >
          <Linkedin size={16} />
          <span className="hidden sm:inline text-[13px] font-medium whitespace-nowrap">Pintu Dabhi</span>
        </a>

        {/* Bottom Row */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none min-w-0 col-start-2 row-start-2">
          <div className="w-px h-5 mx-1.5 flex-shrink-0 invisible" />
          <ToolBtn icon={<FileCode size={14} />} label="HTML → Markdown Converter (Import)" onClick={onHtmlToMarkdown} variant="import" />
          <ToolBtn icon={<FileText size={14} />} label="Text → Markdown Converter (Import)" onClick={onTextToMarkdown} variant="import" />
          <ToolBtn icon={<FileDown size={14} />} label="PDF → Markdown Converter (Import)" onClick={onPdfToMarkdown} variant="import" />
          <ToolBtn icon={<FileUp size={14} />} label="Word → Markdown Converter (Import)" onClick={onWordToMarkdown} variant="import" />
        </div>

      </div>
    </header>
  );
}

/* ── Separator ── */
function Sep() {
  return <div className="w-px h-5 bg-white/[0.08] mx-1.5 flex-shrink-0" />;
}

/* ── Tool Button ── */
function ToolBtn({
  icon,
  label,
  onClick,
  variant,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "export" | "import";
  active?: boolean;
}) {
  const variantClasses =
    variant === "export"
      ? "text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/15"
      : variant === "import"
        ? "text-violet-300 hover:text-violet-200 hover:bg-violet-500/15"
        : active
          ? "text-emerald-300 hover:bg-emerald-500/15"
          : "text-slate-300 hover:text-white hover:bg-white/[0.08]";

  return (
    <Tooltip content={label}>
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-100 whitespace-nowrap active:scale-[0.97] ${variantClasses}`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </button>
    </Tooltip>
  );
}

/* ── Toggle Button ── */
function ToggleBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip content={label}>
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-100 whitespace-nowrap active:scale-[0.97] ${
          active
            ? "bg-indigo-500/20 text-indigo-300 shadow-sm shadow-indigo-500/10"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
        }`}
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </button>
    </Tooltip>
  );
}
