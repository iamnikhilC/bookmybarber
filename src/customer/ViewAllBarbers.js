import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultBanner from '../images/default_banner.png'; // ✅ import image
import defaultProfile from '../images/logo.png'; // ✅ import image
import BackButton from "../front/components/BackButton";
import { Icons } from "../front/components/Icons";
import StarRating from "../front/components/StarRating";
import empty from "../images/empty.png";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function ViewAllBarbers({ onView = (b) => console.log("view", b), onBook = (b) => console.log("book", b), }) {
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState("nearest");
	const [showOnlyOpen, setShowOnlyOpen] = useState(false);
	const [barbers, setBarbers] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const getTopBarbers = async () => {
		try {
			const response = await axios.get(`${baseURL}/front/topbarbers.php`, {
				params: {
					page,
					limit: 3,
					search: query,
					sort
				}
			});
			if (response.data && response.data.barbers) {
				setBarbers(response.data.barbers);
				setTotalPages(response.data.pagination.totalPages);
			}
		} catch (error) {
			console.error("Error fetching top barbers:", error);
		}
	};

	useEffect(() => {
		getTopBarbers();
	}, [page, query, sort]);

	return (
		<div className="vab">
			<div className="vab-content">
				<div className="search-box grid">
					<div className='page-header'>
						<Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
						<h4 style={{ fontSize: '16px', fontWeight: '600' }}>All Barbers</h4>
					</div>

					<div className="grid">
						<div className="input-group">
							<input type="text"
								aria-label="Search barbers"
								className=""
								placeholder="Search by shop name, barber name or area"
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
								}}
							/>
						</div>
						{/* <div className="input-group">
							<select aria-label="Sort barbers" value={sort} onChange={(e) => setSort(e.target.value)} className="" >
								<option value="">Sort By</option>
								<option value="nearest">Nearest</option>
								<option value="rating">Top rated</option>
								<option value="price_low">Price: Low to High</option>
								<option value="price_high">Price: High to Low</option>
							</select>
						</div> */}
					</div>
				</div>
				<div className="topbarber-grid">
					{barbers.length > 0 ? (
						barbers.map((barber, index) => (
							<div className="card" key={index}>
								<div className="card-header">
									<img className="banner" src={
										barber?.banner_image
											? `${baseURL}/auth/uploads/banners/${barber.banner_image}`
											: defaultBanner} alt={barber.shop_name || "Barber Banner"} />
									<img className="profile" src={
										barber?.profile_image
											? `${baseURL}/auth/uploads/profiles/${barber.profile_image}`
											: defaultProfile} alt={barber.shop_name || "Barber Banner"} />
								</div>
								<div className="card-body">
									<span className="business-name">
										{barber.shop_name || "Unnamed Barber"}
									</span>
									<span className="name">{barber.name || "No Name"}</span>
									<div className="divider"></div>
									<p className="profile-bio">
										Excellent service! The barber was professional and friendly. I loved the haircut — exactly what I asked for!
									</p>
									<StarRating rating={barber.rating} />

									<div className="">
										<button><Link to={`/booking/${barber.id}`} className="">Book Now</Link></button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="empty-state">
							<img src={empty} alt="no_service" />
							<p>No barber found</p>
						</div>

					)}
					<div className="pagination">
						<button
							disabled={page === 1}
							onClick={() => setPage(page - 1)}
						>
							<Icons.BackArrow />
						</button>

						<span>Page {page} of {totalPages}</span>

						<button
							disabled={page === totalPages}
							onClick={() => setPage(page + 1)}
						>
							<Icons.ForwardArrow />
						</button>
					</div>

				</div>

			</div>
		</div>
	);
}




