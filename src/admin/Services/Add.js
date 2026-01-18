import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import BackButton from '../../front/components/BackButton';
import { toast } from "react-toastify";
import { useAuth } from '../../Context/AuthUser';
const baseURL = process.env.REACT_APP_API_BASE_URL;

function Add() {
    const {user} = useAuth();
    const [service, setService] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [errors, setErrors] = useState({});

    const validator = () => {
        const errors = {};
        if (!service) errors.service = 'service is required!';
        if (!price) errors.price = 'Price is required!';
        if (!duration) errors.duration = 'Duration is required!';
        return errors;
    }
    const barber_id = user?.id;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);
        const { data } = await axios.post(
            `${baseURL}/service/add.php`,
            { barber_id , service, description, price, duration},
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {
            setService('');
            setDescription('');
            setPrice('');
            setDuration('');
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } 
    return (
        <div>
            <div className='page-header'>
                <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Service / Add Service</h4>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <h4 className='page-heading'> Add Service</h4>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Service</label>
                                            <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Enter Service" />
                                            {errors.service && <span style={{ color: "red", fontSize: "14px", }}>{errors.service}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Price</label>
                                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                                            {errors.price && <span style={{ color: "red", fontSize: "14px", }}>{errors.price}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="group-input">
                                            <label>Duration (in minutes)</label>
                                            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Enter service duration in min" />
                                            {errors.duration && <span style={{ color: "red", fontSize: "14px", }}>{errors.price}</span>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="group-input">
                                            <label>Description</label>
                                            <textarea type="password" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Please enter service description...."></textarea>
                                        </div>
                                    </div>
                                    
                                    <div className="col-4">
                                        <div className="group-input">
                                            <button type="submit" className="submit-btn">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
