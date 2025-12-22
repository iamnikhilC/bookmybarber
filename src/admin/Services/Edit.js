import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";

const baseURL = process.env.REACT_APP_API_BASE_URL;

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [barber_id, setBarber_id] = useState(1);
    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [errors, setErrors] = useState({});

    const validator = () => {
        const errors = {};
        if (!service) errors.service = 'service is required!';
        if (!price) errors.price = 'Price is required!';
        if (!duration) errors.duration = 'Duration is required!';
        return errors;
    }

    useEffect(() => {
        const fetchService = async () => {
            const response = await axios.get(`${baseURL}/service/edit.php?id=${id}`);
            const ser = response.data.data;
            setService(ser.service);
            setDescription(ser.description);
            setPrice(ser.price);
            setDuration(ser.duration);
        } 
        fetchService();
    }, []); 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validateErrors = validator();
        setErrors(validateErrors);
        const { data } = await axios.post(
            `${baseURL}/service/edit.php?id=${id}`,
            { barber_id, service, description, price, duration},
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {
            setService('');
            setDescription('');
            setPrice('');
            setDuration('');
            toast.success(data.message);

            setTimeout(() => {
                navigate("/admin/services");
            }, 1500); // wait so user sees toast
        } else {
            toast.error(data.message);
        }

        console.log('service', service, 'description', description, 'price', price);
    } 
    return (
        <div>
            <h4>Service / Edit Service</h4>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <h4 className='page-heading'> <CiEdit/>  Edit Service</h4>
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
                                    
                                    <div className="col-1">
                                        <div className="group-input">
                                            <Link to="/admin/services" className="btn-primary">Back</Link>
                                        </div>
                                    </div>
                                    <div className="col-1">
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

export default Edit
