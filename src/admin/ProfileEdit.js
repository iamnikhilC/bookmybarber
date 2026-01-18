import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthUser'
import BackButton from '../front/components/BackButton';
import { toast } from "react-toastify";
import { Icons } from '../front/components/Icons';
import axiosClient from '../front/axiosClient';
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function ProfileEdit() {
    const navigate = useNavigate();

    const { type } = useParams();
    const { user, avatar } = useAuth();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [ProImage, setProImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const fileInputRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [shopname, setShopname] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [experience, setExperience] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [opentime, setOpentime] = useState("");
    const [closetime, setClosetime] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cPass, setCPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validator = () => {
        const errors = {};
        if (type === "user") {
            if (!name) errors.name = 'Name is required!';
            if (!email) errors.email = 'Email is required!';
            if (!mobile) errors.mobile = 'Mobile is required!';
        } else if (type === 'shop') {
            if (!shopname) errors.shopname = 'shopname is Required!';
            if (!experience) errors.experience = 'experience is Required!';
            if (!address) errors.address = 'address is Required!';
            if (!pincode) errors.pincode = 'pincode is Required!';
            if (!city) errors.city = 'city is Required!';
            if (!state) errors.state = 'state is Required!';
            if (!specialization) errors.specialization = 'specialization is Required!';
            if (!opentime) errors.opentime = 'opentime is Required!';
            if (!closetime) errors.closetime = 'closetime is Required!';
        } else {
            if (!oldPass) errors.oldPass = 'oldPass is required!';
            if (!newPass) {
                errors.newPass = "Password is required";
            } else {
                if (newPass.length < 8) {
                    errors.newPass = "Password must be at least 8 characters";
                } else if (!/[A-Z]/.test(newPass)) {
                    errors.newPass = "Password must contain an uppercase letter";
                } else if (!/[a-z]/.test(newPass)) {
                    errors.newPass = "Password must contain a lowercase letter";
                } else if (!/[0-9]/.test(newPass)) {
                    errors.newPass = "Password must contain a number";
                } else if (!/[!@#$%^&*]/.test(newPass)) {
                    errors.newPass = "Password must contain a special character";
                }
            }

            if (cPass && newPass !== cPass) {
                errors.cPass = "Passwords do not match";
            }
        }
        return errors;
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.id) return;

            try {
                const response = await axiosClient.get(`/auth/profile.php?id=${user.id}`);
                const profile = response.data.data[0];
                console.log('profile', response);
                setName(profile.name);
                setEmail(profile.email);
                setMobile(profile.mobile);
                setProImage(profile.profile_image);
                setShopname(profile.shop_name);
                setBannerImage(profile.banner_image);
                setAddress(profile.address);
                setState(profile.state);
                setCity(profile.city);
                setPincode(profile.pincode);
                setExperience(profile.experience);
                setSpecialization(profile.specialization);
                setOpentime(profile.shop_open_time);
                setClosetime(profile.shop_close_time);

            } catch (err) {
                setErrors("Whoops, something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handelUpdate = async (e) => {
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);

        const formData = new FormData();
        if (type === "barber") {
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            if (image) {
                formData.append("profile_image", image);
            }
        } else if (type === 'shop') {
            formData.append('shop_name', shopname)
            formData.append('experience', experience)
            formData.append('address', address)
            formData.append('pincode', pincode)
            formData.append('city', city)
            formData.append('state', state)
            formData.append('specialization', specialization)
            formData.append('shop_open_time', opentime)
            formData.append('shop_close_time', closetime)

            if (image) {
                formData.append("banner_image", image);
            }
        } else {
            formData.append('old_password', oldPass)
            formData.append('new_password', newPass)
        }

        const { data } = await axiosClient.post(
            `/auth/edit_profile.php?id=${user.id}&type=${type}`,
            formData,
        )
        if (data.status === 'success') {
            navigate(-1);
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    }

    return (
        <div className='edit-profile grid'>
            {type === 'user' && (
                <div className='shop-card '>
                    <div className='card-header'>
                        <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                        <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Personal Details</h4>
                    </div>
                    <form className='grid' onSubmit={handelUpdate}>
                        <img className="profile" src={
                            preview
                                ? preview
                                : ProImage
                                    ? `${baseURL}/auth/uploads/profiles/${ProImage}`
                                    : avatar
                        } onClick={() => fileInputRef.current.click()} alt="profile"
                            style={{ height: '220px', marginBottom: '25px', position: 'relative', left: '50px' }} />
                        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />

                        <div className="group-input">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                            {errors.name && <span style={{ color: "red", fontSize: "14px", }}>{errors.name}</span>}
                        </div>

                        <div className="group-input">
                            <label>Email</label>
                            <input type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            {errors.email && <span style={{ color: "red", fontSize: "14px", }}>{errors.email}</span>}
                        </div>

                        <div className="group-input">
                            <label>Mobile</label>
                            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile" />
                            {errors.mobile && <span style={{ color: "red", fontSize: "14px", }}>{errors.mobile}</span>}
                        </div>

                        <div className="group-input">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            )}
            {type === 'shop' && (
                <div className='shop-card'>
                    <div className='card-header'>
                        <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                        <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Shop Details</h4>
                    </div>
                    <form className='grid' onSubmit={handelUpdate}>
                        <div className="group-input">
                            <label>Shop Name</label>
                            <input type="text" value={shopname} onChange={(e) => setShopname(e.target.value)} placeholder="Enter Name" />
                            {errors.name && <span style={{ color: "red", fontSize: "14px", }}>{errors.name}</span>}

                        </div>
                        <div className="group-input">
                            <label>Address</label>
                            <textarea value={address || ""} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                            {errors.address && <span style={{ color: "red", fontSize: "14px", }}>{errors.address}</span>}

                        </div>
                        <div className="group-input">
                            <label>State</label>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter address" />
                            {errors.state && <span style={{ color: "red", fontSize: "14px", }}>{errors.state}</span>}

                        </div>
                        <div className="group-input">
                            <label>City</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter address" />
                            {errors.city && <span style={{ color: "red", fontSize: "14px", }}>{errors.city}</span>}
                        </div>

                        <div className="group-input">
                            <label>Pincode</label>
                            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter address" />
                            {errors.pincode && <span style={{ color: "red", fontSize: "14px", }}>{errors.pincode}</span>}
                        </div>

                        <div className="group-input">
                            <label>Experience</label>
                            <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter email" />
                            {errors.experience && <span style={{ color: "red", fontSize: "14px", }}>{errors.experience}</span>}
                        </div>

                        <div className="group-input">
                            <label>Specialization</label>
                            <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Enter email" />
                            {errors.specialization && <span style={{ color: "red", fontSize: "14px", }}>{errors.specialization}</span>}
                        </div>

                        <div className="group-input">
                            <label>Shop Open Time</label>
                            <input type="text" value={opentime} onChange={(e) => setOpentime(e.target.value)} placeholder="Enter shop open time" />
                            {errors.opentime && <span style={{ color: "red", fontSize: "14px", }}>{errors.opentime}</span>}
                        </div>
                        <div className="group-input">
                            <label>Shop Close Time</label>
                            <input type="text" value={closetime} onChange={(e) => setClosetime(e.target.value)} placeholder="Enter shop close time" />
                            {errors.closetime && <span style={{ color: "red", fontSize: "14px", }}>{errors.closetime}</span>}
                        </div>
                        <img className="profile" src={
                            preview
                                ? preview
                                : ProImage
                                    ? `${baseURL}/auth/uploads/banners/${bannerImage}`
                                    : `${baseURL}/auth/uploads/banners/default_banner.png`
                        } onClick={() => fileInputRef.current.click()} alt="banner"
                            style={{ height: '155px', width: "100%", marginBottom: '25px', position: 'relative' }} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />

                        <div className="group-input">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>

                </div>
            )}
            {type === 'password' && (
                <div className='shop-card'>
                    <div className='card-header'>
                        <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                        <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Change Password</h4>
                    </div>
                    <form className='grid' onSubmit={handelUpdate}>
                        <div className="group-input">
                            <label>Old Password</label>
                            <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Enter your old password" />
                            {errors.oldPass && <span style={{ color: "red", fontSize: "14px", }}>{errors.oldPass}</span>}
                        </div>

                        <div className="group-input">
                            <label>Set New password</label>
                            <div style={{ position: "relative" }}>
                                <input type={showPassword ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Set your new password" />
                                <span className="toggelBtn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</span>
                            </div>
                            {errors.newPass && <span style={{ color: "red", fontSize: "14px", }}>{errors.newPass}</span>}
                        </div>

                        <div className="group-input">
                            <label>Conform password</label>
                            <div style={{ position: "relative" }}>
                                <input type={showPassword ? "text" : "password"} value={cPass} onChange={(e) => setCPass(e.target.value)} placeholder="Conform your new password" />
                                {/* <span className="toggelBtn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</span> */}
                            </div>
                            {errors.cPass && <span style={{ color: "red", fontSize: "14px", }}>{errors.cPass}</span>}
                        </div>
                        <div className="group-input">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>

                </div>
            )}
        </div>
    )
}
