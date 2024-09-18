import React from 'react';
import './LoadingSpinner.css'

function LoadingSpinner() {
    return (
        <>
            <div className="confirm-dialog-overlay">
                <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    )
}

export default LoadingSpinner;