import React, { useState } from 'react';

function NotesForm({ addNotes }) {
 const [notes, setNotes] = useState('');
 const [isPopupOpen, setIsPopupOpen] = useState(false);

 const handleNotesChange = (e) => {
    setNotes(e.target.value);
 };

 const saveNotes = () => {
    addNotes(notes);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 2000);
 };

 return (
    <div className="item-form">
      <h3>Add Notes</h3>
      <div class="input-row">
        <textarea
          placeholder="Enter notes here"
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
      <div className='btn-wrapper'>
        <button onClick={saveNotes}>Save Notes</button>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <h4>Notes Added!</h4>
        </div>
      )}
    </div>
 );
}

export default NotesForm;