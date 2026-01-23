const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePdfReport() {
  const screenshotDir = path.join(__dirname, '../reports/screenshots');
  const reportPath = path.join(__dirname, '../reports/TestReport.pdf');

  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotDir)) {
    console.log('No screenshots found');
    return;
  }

  // Get all screenshots
  const screenshots = fs.readdirSync(screenshotDir)
    .filter(file => file.endsWith('.png'))
    .sort();

  if (screenshots.length === 0) {
    console.log('No screenshots found in reports/screenshots directory');
    return;
  }

  // Create PDF document
  const doc = new PDFDocument({
    size: 'A4',
    margin: 20
  });

  // Pipe to file
  const stream = fs.createWriteStream(reportPath);
  doc.pipe(stream);

  // Add title on first page
  doc.fontSize(20).font('Helvetica-Bold').text('TodoMVC Test Report', { align: 'center' });
  doc.moveDown(0.3);
  
  const timestamp = new Date().toLocaleString();
  doc.fontSize(10).font('Helvetica').text(`Generated on: ${timestamp}`, { align: 'center' });
  doc.moveDown(0.5);

  // Add summary
  doc.fontSize(12).font('Helvetica-Bold').text('Test Execution Summary', { underline: true });
  doc.fontSize(10).font('Helvetica');
  doc.text(`Total Screenshots: ${screenshots.length}`);
  doc.text(`Screenshot Directory: ${screenshotDir}`);
  doc.moveDown(1);

  // Add each screenshot
  let firstPage = true;
  screenshots.forEach((screenshot, index) => {
    const screenshotPath = path.join(screenshotDir, screenshot);
    
    try {
      // Add page break if not the first image
      if (!firstPage) {
        doc.addPage();
      }
      firstPage = false;

      // Add screenshot number and name
      doc.fontSize(11).font('Helvetica-Bold').text(`Screenshot ${index + 1}`, { underline: false });
      doc.fontSize(9).font('Helvetica').text(screenshot, { color: 'gray' });
      doc.moveDown(0.2);

      // Add the screenshot image (scaled to fit)
      const imageWidth = 550;
      const imageHeight = 350;
      
      try {
        doc.image(screenshotPath, {
          width: imageWidth,
          height: imageHeight,
          align: 'center'
        });
      } catch (error) {
        doc.fontSize(10).text(`Error loading image: ${error.message}`, { color: 'red' });
      }

      doc.moveDown(0.3);
    } catch (error) {
      console.error(`Error processing screenshot ${screenshot}:`, error);
    }
  });

  // Finalize PDF
  doc.end();

  stream.on('finish', () => {
    console.log(`✓ PDF Report generated successfully at: ${reportPath}`);
    console.log(`✓ Total screenshots included: ${screenshots.length}`);
  });

  stream.on('error', (error) => {
    console.error('Error generating PDF:', error);
  });
}

// Run the function
generatePdfReport();
