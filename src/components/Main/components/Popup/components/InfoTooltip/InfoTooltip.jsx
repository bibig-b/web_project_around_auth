import React from "react";
import { Navigate } from "react-router-dom";

function infotooltip({ isOpen, onClose, isSuccess }) {  
    if (!isOpen) {      
        return null;
    }

    return (
        <div className="popup popup_type_infotooltip">
            <div className="popup__content">
                <button className="popup__close" onClick={onClose}>&times;</button>
                <h2 className="popup__title">{isSuccess ? "Success!" : "Error!"}</h2>
                <p className="popup__message">{isSuccess ? "Your operation was successful." : "Something went wrong. Please try again."}</p>
            </div>
        </div>
    );
}

export default infotooltip;