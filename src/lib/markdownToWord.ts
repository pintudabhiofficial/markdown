import { marked } from "marked";

export function downloadAsWord(markdown: string, filename = "markdown-export.doc") {
  const html = marked(markdown, { async: false }) as string;

  const wordHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <!--[if gte mso 9]><xml>
    <w:WordDocument><w:View>Normal</w:View><w:Zoom>0</w:Zoom></w:WordDocument>
  </xml><![endif]-->
  <style>
    body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 2cm; }
    h1 { font-size: 20pt; } h2 { font-size: 16pt; } h3 { font-size: 14pt; }
    pre { background: #f4f4f4; padding: 10px; font-family: "Courier New", monospace; font-size: 10pt; }
    code { font-family: "Courier New", monospace; background: #f4f4f4; padding: 0 3px; }
    blockquote { border-left: 3px solid #ccc; padding-left: 10px; color: #555; margin: 0; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ccc; padding: 6px 10px; }
    th { background: #f0f0f0; font-weight: bold; }
    img { max-width: 100%; }
  </style>
</head>
<body>${html}</body>
</html>`;

  const blob = new Blob(["\ufeff", wordHtml], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
