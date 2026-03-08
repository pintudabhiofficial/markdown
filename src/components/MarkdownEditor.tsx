"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import { HtmlPanel } from "./HtmlPanel";
import { HtmlToMarkdownModal } from "./HtmlToMarkdownModal";
import { PdfToMarkdownModal } from "./PdfToMarkdownModal";
import { WordToMarkdownModal } from "./WordToMarkdownModal";
import { Toolbar } from "./Toolbar";
import { StatusBar } from "./StatusBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSyncScroll } from "../hooks/useSyncScroll";
import { useDebounce } from "../hooks/useDebounce";
import { defaultMarkdown } from "../lib/defaultMarkdown";
import { exportToPdf } from "../lib/exportPdf";
import { downloadAsWord } from "../lib/markdownToWord";
import { Eye, Code2, Copy, Check } from "lucide-react";

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useLocalStorage<string>("markdown-content", defaultMarkdown);
  const [syncScroll, setSyncScroll] = useLocalStorage<boolean>("sync-scroll", true);
  const [dividerPos, setDividerPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [rightPanelMode, setRightPanelMode] = useState<"preview" | "html">("preview");
  const [showHtmlToMd, setShowHtmlToMd] = useState(false);
  const [showPdfToMd, setShowPdfToMd] = useState(false);
  const [showWordToMd, setShowWordToMd] = useState(false);
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorCol, setCursorCol] = useState(1);
  const [copiedPreview, setCopiedPreview] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null!);
  const previewRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const debouncedMarkdown = useDebounce(markdown, 150);
  const { handleEditorScroll, handlePreviewScroll } = useSyncScroll(editorRef, previewRef, syncScroll);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDividerPos(Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 25), 75));
    };
    const up = () => setIsDragging(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
  }, [isDragging]);

  const handleCursorChange = useCallback((l: number, c: number) => { setCursorLine(l); setCursorCol(c); }, []);

  const handleCopyPreview = useCallback(() => {
    if (!previewRef.current) return;
    const range = document.createRange();
    range.selectNode(previewRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    try {
      document.execCommand("copy");
      setCopiedPreview(true);
      setTimeout(() => setCopiedPreview(false), 2000);
    } catch (err) {
      console.error("Failed to copy preview", err);
    }
    window.getSelection()?.removeAllRanges();
  }, []);

  /* ── Right-panel tab button ── */
  const tab = (active: boolean) =>
    `flex items-center gap-1.5 px-3 h-9 text-[11px] font-medium uppercase tracking-wider transition-colors duration-100 border-b-2 ${
      active
        ? "text-indigo-600 dark:text-indigo-400 border-indigo-500"
        : "text-slate-400 dark:text-slate-500 border-transparent hover:text-slate-600 dark:hover:text-slate-300"
    }`;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0f1117]">
      <Toolbar
        onReset={() => setMarkdown(defaultMarkdown)}
        onCopy={async () => { await navigator.clipboard.writeText(markdown); }}
        onExportPdf={() => { if (previewRef.current) exportToPdf(previewRef.current); }}
        onHtmlToMarkdown={() => setShowHtmlToMd(true)}
        onMarkdownToWord={() => downloadAsWord(markdown)}
        onPdfToMarkdown={() => setShowPdfToMd(true)}
        onWordToMarkdown={() => setShowWordToMd(true)}
        syncScroll={syncScroll}
        onSyncScrollToggle={() => setSyncScroll((p: boolean) => !p)}
      />

      {showHtmlToMd && <HtmlToMarkdownModal onClose={() => setShowHtmlToMd(false)} onInsert={(md) => setMarkdown((p: string) => p ? p + "\n\n" + md : md)} />}
      {showPdfToMd && <PdfToMarkdownModal onClose={() => setShowPdfToMd(false)} onInsert={(md) => setMarkdown((p: string) => p ? p + "\n\n" + md : md)} />}
      {showWordToMd && <WordToMarkdownModal onClose={() => setShowWordToMd(false)} onInsert={(md) => setMarkdown((p: string) => p ? p + "\n\n" + md : md)} />}

      {/* Mobile tabs */}
      {isMobile && (
        <div className="flex border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0f1117]">
          {(["editor", "preview"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-2.5 text-[13px] font-medium capitalize transition-colors ${
                activeTab === t ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500" : "text-slate-400 dark:text-slate-500"
              }`}
            >{t}</button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden" style={{ cursor: isDragging ? "col-resize" : undefined }}>
        {isMobile ? (
          <>
            <div className={`w-full h-full ${activeTab === "editor" ? "block" : "hidden"}`}>
              <EditorPanel value={markdown} onChange={setMarkdown} editorRef={editorRef} onScroll={handleEditorScroll} onCursorChange={handleCursorChange} />
            </div>
            <div className={`w-full h-full flex flex-col ${activeTab === "preview" ? "flex" : "hidden"}`}>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0f1117] flex-shrink-0">
                <div className="flex">
                  <button onClick={() => setRightPanelMode("preview")} className={tab(rightPanelMode === "preview")}><Eye size={12} />Preview</button>
                  <button onClick={() => setRightPanelMode("html")} className={tab(rightPanelMode === "html")}><Code2 size={12} />HTML</button>
                </div>
                {rightPanelMode === "preview" && (
                  <button
                    onClick={handleCopyPreview}
                    className={`flex items-center gap-1.5 px-3 py-1.5 mr-2 text-[11px] font-bold uppercase tracking-wider rounded border shadow-sm transition-all active:scale-[0.97] ${
                      copiedPreview
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                        : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 hover:shadow-md"
                    }`}
                  >
                    {copiedPreview ? <Check size={12} /> : <Copy size={12} />}
                    {copiedPreview ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                {rightPanelMode === "preview"
                  ? <PreviewPanel markdown={debouncedMarkdown} previewRef={previewRef} onScroll={handlePreviewScroll} />
                  : <HtmlPanel markdown={debouncedMarkdown} />}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Editor */}
            <div style={{ width: `${dividerPos}%` }} className="h-full overflow-hidden">
              <EditorPanel value={markdown} onChange={setMarkdown} editorRef={editorRef} onScroll={handleEditorScroll} onCursorChange={handleCursorChange} />
            </div>

            {/* Divider */}
            <div
              onMouseDown={handleMouseDown}
              className={`w-[3px] cursor-col-resize flex-shrink-0 transition-colors duration-100 group relative ${
                isDragging ? "bg-indigo-500" : "bg-slate-200 dark:bg-white/[0.06] hover:bg-indigo-400 dark:hover:bg-indigo-500"
              }`}
            >
              {/* Grip dots */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ width: `${100 - dividerPos}%` }} className="h-full overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0f1117] flex-shrink-0">
                <div className="flex">
                  <button onClick={() => setRightPanelMode("preview")} className={tab(rightPanelMode === "preview")}><Eye size={12} />Preview</button>
                  <button onClick={() => setRightPanelMode("html")} className={tab(rightPanelMode === "html")}><Code2 size={12} />HTML</button>
                </div>
                {rightPanelMode === "preview" && (
                  <button
                    onClick={handleCopyPreview}
                    className={`flex items-center gap-1.5 px-3 py-1.5 mr-2 text-[11px] font-bold uppercase tracking-wider rounded border shadow-sm transition-all active:scale-[0.97] ${
                      copiedPreview
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                        : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30 hover:shadow-md"
                    }`}
                  >
                    {copiedPreview ? <Check size={12} /> : <Copy size={12} />}
                    {copiedPreview ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                {rightPanelMode === "preview"
                  ? <PreviewPanel markdown={debouncedMarkdown} previewRef={previewRef} onScroll={handlePreviewScroll} />
                  : <HtmlPanel markdown={debouncedMarkdown} />}
              </div>
            </div>
          </>
        )}
      </div>

      <StatusBar text={markdown} cursorLine={cursorLine} cursorCol={cursorCol} />
    </div>
  );
}
