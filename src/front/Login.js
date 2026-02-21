import React, { useState } from "react";
import axiosClient from "./axiosClient";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { ValidatePassword, EyeIcon } from "../utils/validations";

const Login = () => {
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const navigate = useNavigate();

	const validator = () => {
		const errors = {};
		if (!mobile.trim()) errors.mobile = 'Mobile is required!';
		if (!password) errors.password = "Password is required";
		return errors;
	}
	const handelLogin = async (e) => {
		e.preventDefault();
		const validateErrors = validator();
		setErrors(validateErrors);

		if (Object.keys(validateErrors).length === 0) {
			const { data } = await axiosClient.post(`/auth/login.php`,
				{ mobile, password, remember: rememberMe},
				{ headers: { "Content-Type": "application/json" } }
			)
			if (data.status === 'success') {
				localStorage.setItem("user", JSON.stringify(data.user));
				localStorage.setItem("access_token", JSON.stringify(data.access_token));

				navigate('/admin');
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		}
	}
	const handelNavigation = async (e) => {
		e.preventDefault();
		const { data } = await axiosClient.post(`/auth/send-otp.php`,
				{ mobile },
				{ headers: { "Content-Type": "application/json" } }
			)
			if (data.status === 'success') {
				navigate('/forgot-password', {
					state: { mobile: mobile }
				});
					
				
			} else {
				toast.error(data.message);
			}
	}
	return (
		<div className="login-container">

			{/* Right Section */}
			<div className="right-section">

				<div className="hanging-text">
					<span>L</span>
					<span>O</span>
					<span>G</span>
					<span>I</span>
					<span>N</span>
				</div>
			</div>

			{/* Left Section */}
			<div className="left-section">
				<h2>Welcome Back</h2>
				<p>Please login to continue</p>
				<form onSubmit={handelLogin}>
					<input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile number" className="input-field" />
					{errors.mobile && <span style={{ color: 'red', fontSize: '14px' }}>{errors.mobile}</span>}
					<div className="col-4">
                        <div className="group-input">
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
					<div className="bottom-section">
						<div className="forget">

							<label className='checkbox'>
								<input
									type="checkbox"
									name="home_service"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
								/>
								Remember me
							</label>
							<Link to="#" onClick={handelNavigation}>Forgote password</Link>
						</div>
						<div className="not-member">
							<span>Not a member?</span>
							<Link to="/">Create New account</Link>
						</div>
					</div>
					<button type="submit" className="btn">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

