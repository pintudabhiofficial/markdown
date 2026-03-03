export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  editorRef: React.RefObject<HTMLTextAreaElement | null>;
}

export interface PreviewProps {
  markdown: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export interface ToolbarProps {
  onReset: () => void;
  onCopy: () => void;
  onExportPdf: () => void;
  syncScroll: boolean;
  onSyncScrollToggle: () => void;
}

export interface StatusBarProps {
  text: string;
}
