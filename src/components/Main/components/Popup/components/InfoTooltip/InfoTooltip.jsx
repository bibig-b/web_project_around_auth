import React from "react";
import { Navigate } from "react-router-dom";
import reject from '../../../../../../images/reject.jpg';
import success from '../../../../../../images/accept.jpg';
import close from '../../../../../../images/Close_Icon.png';

function infotooltip({ status, onClose, message }) {  
   const icon = status === "success" ? success : reject;
   
    return (
        <>
        <div className="modal__wrapper">
            <img className="infotooltip__close" src= {close} alt="botão close" 
            onClick={onClose}/>
            <div className="infotooltip">
                <img className="infotooltip__icon" src={icon} alt="ícone de status" />
                <p className="infotooltip__message">{message}</p>
            </div>
        </div>
        </>
    );
}

export default infotooltip;