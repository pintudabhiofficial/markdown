export async function exportToPdf(element: HTMLElement, filename = "markdown-export.pdf") {
  const html2pdf = (await import("html2pdf.js")).default;
  html2pdf()
    .set({
      margin: 10,
      filename,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}
