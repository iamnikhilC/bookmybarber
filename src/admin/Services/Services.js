import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRupeeSign, FaCut } from "react-icons/fa";   // from Font Awesome
import { CiEdit } from "react-icons/ci";

import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Services = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await axios.get(`${baseURL}/service/barberServices.php`);
				setServices(response.data.data);
			} catch (err) {
				setError("Whoops, something went wrong!");
			} finally {
				setLoading(false);
			}
		};

		fetchServices();
	}, []);

	

	if (loading) return <p>Loading services...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<h4>Admin / Services</h4>
			<div className="add-service row">
				<Link to="/add-service" className="btn-primary">Add New</Link>
			</div>

			<div className='service grid'>
				{services.map((service, i) => (
					<div key={i} className={` card`}>
						<div className='card-body'>
							<Link to={`/edit-service/${service.id}`} className="edit-service"><CiEdit/></Link>
							<h3 className='capitalize-first'>{service.service} </h3>
							<p>{service.description}</p>
							<p>{service.duration + ' Min' ?? '30 min'}</p>
							<p className='price'>
								<FaRupeeSign />
								<strong>{service.price.toFixed(2)}</strong>
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Services;