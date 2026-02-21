import React from "react";

const BtnPopup = ({ type, message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className={`popup-box ${type}`}>
                <p>{message}</p>

                {/* CONFIRM TYPE */}
                {type === "confirm" && (
                    <div className="popup-actions">
                        <button
                            className="btn cancel"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn confirm"
                            onClick={onConfirm}
                        >
                            Yes, Paid
                        </button>
                    </div>
                )}

                {/* ALERT TYPES */}
                {type !== "confirm" && (
                    <div className="popup-actions">
                        <button className="btn confirm" onClick={onCancel}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BtnPopup;
