import React, { useState } from 'react';
import LineItemForm from './LineItemForm';
import NotesForm from './NotesForm';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function InvoiceForm({ addInvoice }) {
  const [invoice, setInvoice] = useState({
    lineItems: [],
    notes: '',
    dueDate: '',
    email: '',
    status: 'Outstanding',
  });

  const addLineItem = (lineItem) => {
    setInvoice({ ...invoice, lineItems: [...invoice.lineItems, lineItem] });
  };

  const addNotes = (notes) => {
    setInvoice({ ...invoice, notes });
  };

  const handleDueDateChange = (e) => {
    setInvoice({ ...invoice, dueDate: e.target.value });
  };

  const handleEmailChange = (e) => {
    setInvoice({ ...invoice, email: e.target.value });
  };

  const handleStatusChange = (e) => {
    setInvoice({ ...invoice, status: e.target.value });
  };

  const createInvoice = () => {
    const pdfContent = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: `Status: ${invoice.status}`, style: 'subheader' },
        { text: `Due Date: ${invoice.dueDate}`, style: 'subheader' },
        { text: 'Line Items:', style: 'subheader' },
        ...invoice.lineItems.map((item) => `- ${item.description}: $${item.amount}`),
        { text: 'Notes:', style: 'subheader' },
        { text: invoice.notes },
      ],
      styles: {
        header: { fontSize: 22, bold: true },
        subheader: { fontSize: 18, bold: true },
      },
    };

    const pdfDoc = pdfMake.createPdf(pdfContent);

    pdfDoc.getBlob((blob) => {
      saveAs(blob, 'invoice.pdf');
    });

    addInvoice(invoice);

    setInvoice({
      lineItems: [],
      notes: '',
      dueDate: '',
      email: '',
      status: 'Outstanding',
    });
  };

  return (
    <div className="invoice-form">
      <h2 className="new-invoice-label">Create New Invoice</h2>
      <LineItemForm addLineItem={addLineItem} />
      <NotesForm addNotes={addNotes} />
      <div class="item-form">
        <div className='due-details-block'>
          <div class="row">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              placeholder="Due Date"
              value={invoice.dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div class="row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={invoice.email}
              onChange={handleEmailChange}
            />
          </div>
          <div class="row">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={invoice.status}
              onChange={handleStatusChange}
            >
              <option value="Paid">Paid</option>
              <option value="Outstanding">Outstanding</option>
              <option value="Late">Late</option>
            </select>
          </div>
        </div>
        <button onClick={createInvoice}>Create Invoice</button>
      </div>

    </div>
  );
}

export default InvoiceForm;
