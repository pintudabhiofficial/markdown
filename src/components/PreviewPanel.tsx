"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "./CodeBlock";

interface PreviewPanelProps {
  markdown: string;
  previewRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}

export function PreviewPanel({ markdown, previewRef, onScroll }: PreviewPanelProps) {
  return (
    <div
      ref={previewRef}
      onScroll={onScroll}
      className="h-full overflow-auto p-6 bg-white dark:bg-[#1e1e1e] text-[#1a1a1a] dark:text-[#d4d4d4]"
    >
      <div className="prose dark:prose-invert max-w-none prose-headings:border-b prose-headings:border-gray-200 dark:prose-headings:border-gray-700 prose-headings:pb-2 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-table:border-collapse prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-3 prose-td:py-1.5 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-3 prose-th:py-1.5 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-hr:border-gray-300 dark:prose-hr:border-gray-600">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              }
              return <CodeBlock className={className}>{children}</CodeBlock>;
            },
            input({ type, checked, ...props }) {
              if (type === "checkbox") {
                return (
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="mr-2 accent-blue-500"
                    {...props}
                  />
                );
              }
              return <input type={type} {...props} />;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
