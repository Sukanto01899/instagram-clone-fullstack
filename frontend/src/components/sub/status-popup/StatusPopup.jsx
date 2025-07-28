import React, { useState } from 'react';
import './success.css';
import popupTemplate from './popupTemplate';
import { Link } from 'react-router-dom';



const StatusPopup = ({ type, template, action }) => {
    const [show, setShow] = useState(true);
    const { title, buttonText, message, Icon, footer, closeButton } = popupTemplate[type][template] || {};

    if (!title || !message || !Icon) {
        console.error("Missing required properties in template");
        return null;
    }
    if (!action) {
        console.error("Action function is required");
        return null;
    }
    return (
        show && (<div className='dialog-container'>
            <div className="dialog">
                <div className="p-8 flex flex-col items-center">
                    <div className="success-icon mb-6">
                        {Icon ? <Icon /> : ""}
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">{title ? title : "Success"}</h3>
                    <p className="text-gray-500 text-center mb-6">{message ? message : ""}</p>

                    <div className="flex space-x-3">
                        <button onClick={action} className="primary-button mb-3">
                            {buttonText ? buttonText : "Continue"}
                        </button>
                        {closeButton && <button onClick={() => setShow(false)} className="secondary-button mb-3">
                            {closeButton ? closeButton : "Close"}
                        </button>}
                    </div>
                    {
                        footer && (
                            <Link to="/profile" className="secondary-button">
                                {footer ? footer : "Complete Your Profile"}
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>)
    );
};

export default StatusPopup;