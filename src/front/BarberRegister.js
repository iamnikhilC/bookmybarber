import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ValidatePassword, EyeIcon } from "../utils/validations";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const BarberRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [shopName, setShopName] = useState('');
    const [experience, setExperience] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validator = () => {
        const errors = {};
        if (!name.trim()) errors.name = 'Name is required!';
        if (!shopName.trim()) errors.shopName = 'Shop Name is required!';
        if (!experience.trim()) errors.experience = 'Experience is required!';
        if (!specialization.trim()) errors.specialization = 'Specialization is required!';
        if (!address.trim()) errors.address = 'Address is required!';
        if (!pincode.trim()) errors.pincode = 'Pincode is required!';
        if (!city.trim()) errors.city = 'City is required!';
        if (!state.trim()) errors.state = 'State is required!';
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
                `${baseURL}/auth/barber_resgistration.php`,
                { name, shopName, experience, specialization, address, pincode, city, state, email, mobile, password, cpassword },
                { headers: { "Content-Type": "application/json" } }
            )
            if (data.status === 'success') {
                setName('');
                setEmail('');
                setMobile('');
                setShopName('');
                setExperience('');
                setSpecialization('');
                setAddress('');
                setPincode('');
                setCity('');
                setState('');
                setPassword('');
                setCpassword('');
                setErrors('');
                setShowPassword('');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
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
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Full Name</label>
                                            <input type="text" name="name" placeholder="Please enter your email" value={name} onChange={(e) => setName(e.target.value)} />
                                            {errors.name && <span style={{ color: "red", fontSize: "14px", }}>{errors.name}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Email</label>
                                            <input type="email" name="email" placeholder="Please enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Mobile</label>
                                            <input type="number" name="mobile" placeholder="Please enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                            {errors.mobile && <span style={{ color: "red", fontSize: "14px" }}>{errors.mobile}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Shop Name</label>
                                            <input type="text" name="shop_name" placeholder="Please enter your Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                                            {errors.shopName && <span style={{ color: "red", fontSize: "14px" }}>{errors.shopName}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Experience</label>
                                            <input type="number" name="experience" placeholder="Please enter your experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                            {errors.experience && <span style={{ color: "red", fontSize: "14px" }}>{errors.experience}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Specialization</label>
                                            <input type="text" name="specialization" placeholder="What's your Speciality ?" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                            {errors.specialization && <span style={{ color: "red", fontSize: "14px" }}>{errors.specialization}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Address</label>
                                            <textarea name="address" placeholder="Please enter your shop address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                            {errors.address && <span style={{ color: "red", fontSize: "14px" }}>{errors.address}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Pincode</label>
                                            <input type="number" name="pincode" placeholder="What is your postal code" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                            {errors.pincode && <span style={{ color: "red", fontSize: "14px" }}>{errors.pincode}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>City</label>
                                            <input type="text" name="city" placeholder="What's your Speciality ?" value={city} onChange={(e) => setCity(e.target.value)} />
                                            {errors.city && <span style={{ color: "red", fontSize: "14px" }}>{errors.city}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>State</label>
                                            <input type="text" name="state" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)} />
                                            {errors.state && <span style={{ color: "red", fontSize: "14px" }}>{errors.state}</span>}
                                        </div>
                                    </div>

                                    <div className="col-4">
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
                                    <div className="col-4">

                                        <div className="group-input">
                                            <label>Re-enetr Password</label>
                                            <input type="password" name="cpassword" placeholder="Re-enter Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                                            {errors.cpassword && <span style={{ color: "red", fontSize: "14px" }}>{errors.cpassword}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default BarberRegister;