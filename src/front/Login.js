import React, { useState } from "react";
import axiosClient from "./axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const validator = () => {
		const errors = {};
		if (!email.trim()) errors.email = 'Email is required!';
		else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
		if (!password) errors.password = "Password is required";
		return errors;
	}
	const handelLogin = async (e) => {
		e.preventDefault();
		const validateErrors = validator();
		setErrors(validateErrors);

		if (Object.keys(validateErrors).length === 0) {
			const { data } = await axiosClient.post(`/auth/login.php`,
				{ email, password },
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
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-field" />
					{errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" />
					<button type="submit" className="submit-btn">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

