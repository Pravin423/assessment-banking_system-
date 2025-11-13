import React from 'react';

export default function Modal({visible, onClose, children}){
  if(!visible) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <div style={{textAlign:'right'}}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
