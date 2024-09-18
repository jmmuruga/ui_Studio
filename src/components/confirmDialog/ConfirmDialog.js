import React from 'react';
import './ConfirmDialog.css'; // Optional for styling

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog-box">
                <h3 className='text-fam-cal' style={{ color: '#007791' }}>{title}</h3>
                <hr></hr>
                <p className='text-fam-cal' style={{ color: 'teal', fontWeight: '600' }}>{message}</p>
                <div className="confirm-dialog-actions">
                    <button onClick={onConfirm} className="confirm-btn">Confirm</button>
                    <button onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
