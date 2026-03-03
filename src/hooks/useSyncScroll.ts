"use client";

import { useCallback, useRef } from "react";

export function useSyncScroll(
  editorRef: React.RefObject<HTMLElement | null>,
  previewRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const isSyncing = useRef(false);

  const handleEditorScroll = useCallback(() => {
    if (!enabled || isSyncing.current) return;
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (!editor || !preview) return;

    isSyncing.current = true;
    const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);
    preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  }, [enabled, editorRef, previewRef]);

  const handlePreviewScroll = useCallback(() => {
    if (!enabled || isSyncing.current) return;
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (!editor || !preview) return;

    isSyncing.current = true;
    const percentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight || 1);
    editor.scrollTop = percentage * (editor.scrollHeight - editor.clientHeight);
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  }, [enabled, editorRef, previewRef]);

  return { handleEditorScroll, handlePreviewScroll };
}
