import React, { useState } from "react";
import axiosClient from "./axiosClient";
import { useNavigate, Link } from "react-router-dom";
import Popup from "../components/Popup";
import { useLocation } from "react-router-dom";
import { ValidatePassword, EyeIcon } from "../utils/validations";

const ForgotPassword = () => {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [alert, setAlert] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const validator = () => {
        const errors = {};
        if (!password) errors.password = "Password is required";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
        const { valid, PassErrors } = ValidatePassword(password);
        if (!valid) errors.password = PassErrors;
        return errors;
    }

    const { state } = useLocation();
    const mobile = state?.mobile;
    console.log('mobile', mobile);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            const { data } = await axiosClient.post(`/auth/forgotpassword.php`,
                { mobile, password, otp },
                { headers: { "Content-Type": "application/json" } }
            )
            if (data.status === 'success') {
                navigate('/login');
                setAlert({ type: "success", message: data.message});
            } else {
                setAlert({
                    type: "error",
                    message: "Unable to record payment. Please contact support."
                });
            }
        }
    }

    return (
        <div className="forget-password-container">
            {alert && <Popup type={alert.type} message={alert.message} />}

            <div className="left-section">
                <h2>Forgot Password?</h2>
                <p>No stress! Set your new password and get back into your account.</p>

                <form onSubmit={handleResetPassword}>
                    <div className="col-4">
                        <div className="group-input">
                            <label>Set new password</label>
                            <div style={{ position: "relative" }}>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Please set your password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span className="toggelBtn" onClick={() => setShowPassword(!showPassword)}><EyeIcon visible={showPassword} /></span>
                            </div>
                            {errors.password && errors.password.length > 0 && (
                                <div style={{ color: "red", fontSize: "14px" }}>
                                    {errors.password.map((msg, index) => (
                                        <div key={index}>{msg}</div>  // each message on a new line
                                    ))}
                                </div>
                            )
                            }
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="group-input">
                            <label>Confirm Password</label>
                            <div style={{ position: "relative" }}>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="input-field"
                                />
                                {/* <span className="toggelBtn" onClick={() => setShowPassword(!showPassword)}><EyeIcon visible={showPassword} /></span> */}

                            </div>
                            {errors.confirmPassword && (
                                <span style={{ color: "red", fontSize: "14px" }}>
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    </div>

                    <input
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="input-field"
                    />
                    {errors.otp && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                            {errors.otp}
                        </span>
                    )}

                    <button type="submit" className="btn">
                        Reset Password
                    </button>
                </form>
            </div>

        </div>
    );
};

export default ForgotPassword;

