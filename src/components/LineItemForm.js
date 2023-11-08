import React, { useState } from 'react';

function LineItemForm({ addLineItem }) {
 const [lineItem, setLineItem] = useState({ description: '', amount: null });
 const [isPopupOpen, setIsPopupOpen] = useState(false);

 const handleDescriptionChange = (e) => {
    setLineItem({ ...lineItem, description: e.target.value });
 };

 const handleAmountChange = (e) => {
    setLineItem({ ...lineItem, amount: parseFloat(e.target.value) });
 };

 const addLineItemToInvoice = () => {
    if (lineItem.description && lineItem.amount > 0) {
      addLineItem(lineItem);
      setLineItem({ description: '', amount: 0 });
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 2000);
    }
 };

 return (
    <div className="item-form">
      <h3>Add Line Item</h3>
      <div class="input-row">
        <input type="text" placeholder="Description" value={lineItem.description} onChange={handleDescriptionChange} />
        <input type="number" placeholder="Amount" value={lineItem.amount} onChange={handleAmountChange} />
      </div>
      <div className='btn-wrapper'>
        <button class="add-line-item-button" onClick={addLineItemToInvoice}>Add Line Item</button>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <h4>Line Item Added!</h4>
        </div>
      )}
    </div>
 );
}

export default LineItemForm;