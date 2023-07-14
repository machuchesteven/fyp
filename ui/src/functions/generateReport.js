import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateReport = (data) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set the document title
    doc.setProperties({
        title: 'Report as per' + new Date().getTime(),
    });

    // Set the font size and text color for the report title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('Report', 10, 15);

    // Set the font size and text color for the report content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color

    // Create a table header
    const headers = [['No.', 'Violation Name', 'Violation Description']];

    // Create a table body from the data array
    const tableData = data.map((item, index) => [index + 1, item.description, item.image_url, item.inspected_url]);

    // Set table options
    const options = {
        startY: 25
    };

    // Add the table to the document
    doc.autoTable({
        head: headers,
        body: tableData,
        startY: 25
    });

    // Save the PDF file with a unique name
    doc.save('report.pdf');
};

export default generateReport;
