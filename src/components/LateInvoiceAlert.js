import React, { useEffect } from 'react';

function LateInvoiceAlert({ invoices }) {
  useEffect(() => {
    const today = new Date();

    invoices.forEach((invoice, index) => {
      const dueDate = new Date(invoice.dueDate);
      if (dueDate < today) {
        alert(`Invoice ${index + 1} is late!`);
      }
    });
  }, [invoices]);

  return null;
}

export default LateInvoiceAlert;
