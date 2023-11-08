import React, { useState } from 'react';

function InvoiceList({ invoices, onDeleteInvoice }) {
  const handleDelete = (index) => {
    onDeleteInvoice(index);
  };

  return (
    <div className="invoice-list">
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index}>
            <h3>Invoice {index + 1}</h3>
            <div>
              <h4>Line Items</h4>
              <ul>
                {invoice.lineItems.map((item, i) => (
                  <li key={i}>
                    {item.description}: ${item.amount}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Notes</h4>
              <p>{invoice.notes}</p>
            </div>
            <button className='btn-delete' onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;
