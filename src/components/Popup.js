import { useEffect, useState } from "react";
import { Icons } from "../front/components/Icons";


const Popup = ({ type = "success", message, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <Icons.Success/>;
            case "error":
                return <Icons.Error/>;
            case "warning":
                return "⚠️";
            default:
                return "ℹ️";
        }
    };



    if (!visible) return null;

    return (
        <div className={`alert alert-${type}`}>
            <span className="alert-icon">{getIcon()}</span>
            <span className="alert-message">{message}</span>
            <button
                className="alert-close"
                onClick={() => setVisible(false)}
            >
                ×
            </button>
        </div>
    );
};

export default Popup;
