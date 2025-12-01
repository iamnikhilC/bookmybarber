import React, { useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

function Add() {
    const [barber_id, setBarber_id] = useState(1);
    const [service, setService] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({});

    const validator = () => {
        const errors = {};
        if (!service) errors.service = 'service is required!';
        if (!price) errors.price = 'Experience is required!';
        return errors;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);
        const { data } = await axios.post(
            `${baseURL}/service/add.php`,
            { barber_id, service, description, price},
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {
            setService('');
            setDescription('');
            setPrice('');
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }

        console.log('service', service, 'description', description, 'price', price);
    } 
    return (
        <div>
            <h4>Service / Add Service</h4>
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
