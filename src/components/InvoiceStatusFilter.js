import React, { useState } from 'react';

function InvoiceStatusFilter({ invoices, onFilterChange }) {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilterChange(status);
  }

  return (
    <div className="filter">
      <label htmlFor="statusFilter">Filter by Status:</label>
      <select
        id="statusFilter"
        value={selectedStatus}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="Paid">Paid</option>
        <option value="Outstanding">Outstanding</option>
        <option value="Late">Late</option>
      </select>
    </div>
  );
}

export default InvoiceStatusFilter;
