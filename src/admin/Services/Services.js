import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icons } from "../../front/components/Icons";
import { Link } from "react-router-dom";
import BackButton from "../../front/components/BackButton";
import empty from "../../images/empty.png";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Services = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const authUser = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await axios.get(`${baseURL}/service/barberServices.php?id=${authUser.id}`);
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
		<div className="manage-section">
			<div className='page-header'>
				<Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
				<h4 style={{ fontSize: '16px', fontWeight: '600' }}>Services</h4>
			</div>
			{services && services.length > 0 ? (
				<div className="add-service row">
					<Link to="/add-service" className="btn-primary">Add New</Link>
				</div>
			) : ("")}

			<div className='grid'>
				{services && services.length > 0 ? (
					services.map((service, i) => (
						<div key={i} className={` card`}>
							<div className='card-body'>
								<h3 className='capitalize-first'>
									{service.service}
									<Link to={`/edit-service/${service.id}`} className="edit-service"><Icons.Edit /></Link>
								</h3>
								<p>{service.description}</p>
								<p>
									<span className="icon"><Icons.Watch /></span>
									{service.duration + ' Min' ?? '30 min'}
								</p>
								<p className='price'>
									<span className="icon"><Icons.Wallet /></span>
									Rs. {service.price.toFixed(2)}
								</p>
							</div>
						</div>
					))
				) : (
					<div className="empty-state">
						<img src={empty} alt="no_service" />
						<p>No services added yet</p>
						<Link to="/add-service" className="btn-primary">Add Now</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Services;