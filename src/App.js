import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import LateInvoiceAlert from './components/LateInvoiceAlert';
import InvoiceStatusFilter from './components/InvoiceStatusFilter';

function App() {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const deleteInvoice = (index) => {
    const updatedInvoices = [...invoices];
    updatedInvoices.splice(index, 1);
    setInvoices(updatedInvoices);
  };

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  const handleFilterChange = (status) => {
    if (status === 'All') {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((invoice) => invoice.status === status);
      setFilteredInvoices(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Invoicing App</h1>
      <div className='main-block'>
        <div className='sub-block'>
          <LateInvoiceAlert invoices={invoices} />
          <InvoiceForm addInvoice={addInvoice} />
        </div>
        <div className='sub-block sub-block-custom'>
          <InvoiceStatusFilter invoices={invoices} onFilterChange={handleFilterChange} />
          <InvoiceList invoices={filteredInvoices} onDeleteInvoice={deleteInvoice} />
          <h2>All Invoices</h2>
          <InvoiceList invoices={invoices} onDeleteInvoice={deleteInvoice} />
        </div>
      </div>
    </div>
  );
}

export default App;
