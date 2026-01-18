import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ValidatePassword, EyeIcon } from "../utils/validations";
import BackButton from "./components/BackButton";
import { useNavigate, Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validator = () => {
        const errors = {};
        if (!name.trim()) errors.name = 'Name is required!';
        if (!email.trim()) errors.email = 'Email is required!';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

        if (!mobile.trim()) errors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(mobile)) errors.mobile = "Mobile must be 10 digits";

        if (!password) errors.password = "Password is required";
        if (password !== cpassword) errors.cpassword = "Passwords do not match";
        const { valid, PassErrors } = ValidatePassword(password);
        if (!valid) errors.password = PassErrors;
        return errors;
    }
    const handelRegistration = async (e) => {
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            const { data } = await axios.post(
                `${baseURL}/auth/customer_registration.php`,
                { name, email, mobile, password, cpassword },
                { headers: { "Content-Type": "application/json" } }
            )
            if (data.status === 'success') {
                navigate('/login');
                setName('');
                setEmail('');
                setMobile('');
                setPassword('');
                setCpassword('');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }
    }

    return (
        <div className="resigtration container">
            <div className="row">
                <div className='page-header'>
                    <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Registration</h4>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h2>
                                Welcome! Register
                            </h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handelRegistration}>
                                <div className="row">
                                    <div className="col">
                                        <div className="group-input">
                                            <label>Full Name</label>
                                            <input type="text" name="name" placeholder="Please enter your email" value={name} onChange={(e) => setName(e.target.value)} />
                                            {errors.name && <span style={{ color: "red", fontSize: "14px", }}>{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="group-input">
                                            <label>Email</label>
                                            <input type="email" name="email" placeholder="Please enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="group-input">
                                            <label>Mobile</label>
                                            <input type="number" name="mobile" placeholder="Please enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                            {errors.mobile && <span style={{ color: "red", fontSize: "14px" }}>{errors.mobile}</span>}
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="group-input">
                                            <label>Password</label>
                                            <div style={{ position: "relative" }}>
                                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Please set your password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="group-input">
                                            <label>Re-enetr Password</label>
                                            <input type="password" name="cpassword" placeholder="Re-enter Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                                            {errors.cpassword && <span style={{ color: "red", fontSize: "14px" }}>{errors.cpassword}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div >
                    </div>
                </div >
            </div>
        </div >

    )
}

export default Register;