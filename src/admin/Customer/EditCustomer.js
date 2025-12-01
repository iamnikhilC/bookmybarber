import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import { ValidatePassword, EyeIcon } from "../../utils/validations";
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL; 
const EditCustomer = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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
    const handelEdit = () => {


    }

    const getCustomer = async () => {
        const response = await axios.get(`${baseURL}/customer/edit.php?id=${id}`);
        console.log('response', response);

    }
    getCustomer();
    return (
        <>
            <h4>Admin/Customer/Edit</h4>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='row'>
                            <div className='col'>
                                <CiEdit size={24} /> Edit Customer
                            </div>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handelEdit}>
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
                                <div className="row">
                                    <div className="col">
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditCustomer
