const fs = require('fs');
const { PDFDocument, rgb, StandardFonts, degrees } = require('pdf-lib');

exports.addTextWatermark = async (inputPath, outputPath, watermarkText) => {
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    page.drawText(watermarkText, {
      x: width / 2 - 150,
      y: height / 2,
      size: 36,
      font,
      color: rgb(0.75, 0.75, 0.75),
      rotate: degrees(45),
      opacity: 0.4,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};
