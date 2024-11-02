import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(element: HTMLElement) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11]
  });

  pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
  pdf.save("title-page.pdf");
}
