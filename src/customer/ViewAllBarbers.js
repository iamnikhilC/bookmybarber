import React, { useState, useEffect } from "react";
import Header from "../front/components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultBanner from '../images/default_banner.png'; // ✅ import image
import defaultProfile from '../images/logo.png'; // ✅ import image

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function ViewAllBarbers({ onView = (b) => console.log("view", b), onBook = (b) => console.log("book", b), }) {
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState("nearest");
	const [showOnlyOpen, setShowOnlyOpen] = useState(false);
	const [barbers, setBarbers] = useState([]);

	useEffect(() => {
		const getTopBarbers = async () => {
			try {
				const response = await axios.get(`${baseURL}/front/topbarbers.php`);
				if (response.data && response.data.barbers) {
					setBarbers(response.data.barbers);
				}
			} catch (error) {
				console.error("Error fetching top barbers:", error);
			}
		};

		getTopBarbers();
	}, []);

	return (
		<div className="vab container">
			<Header />
			<div className="vab-content">
				<div className="search-box row">
					<h3 className="head col-3">All Barbers</h3>

					<div className="col-9" style={{ marginTop: "50px" }}>
						<div className="row" style={{ justifyContent: "flex-end" }}>
							<div className="input-group col-4">
								<input type="text"
									aria-label="Search barbers"
									className=""
									placeholder="Search by name, specialty or area"
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</div>
							<div className="input-group col-3">
								<select aria-label="Sort barbers" value={sort} onChange={(e) => setSort(e.target.value)} className="" >
									<option value="nearest">Nearest</option>
									<option value="rating">Top rated</option>
									<option value="price_low">Price: Low to High</option>
									<option value="price_high">Price: High to Low</option>
								</select>
							</div>
							<div className="col-2 ">
								<label className="checkbox">
									<input type="checkbox" checked={showOnlyOpen} onChange={(e) => setShowOnlyOpen(e.target.checked)} />
									Open now
								</label>
							</div>
							<div className="col-2">
								<button className="input-group" onClick={() => { setQuery(""); }}> Search</button>
							</div>

						</div>
					</div>
				</div>
				<div className="topbarber-grid">
					{barbers.length > 0 ? (
						barbers.map((barber, index) => (
							<div className="card" key={index}>
								<div className="card-header">
									<img className="banner" src={barber.banner || defaultBanner} alt={barber.shop_name || "Barber Banner"} />
									<img className="profile" src={barber.banner || defaultProfile} alt={barber.shop_name || "Barber Banner"} />

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
									<div className="rating-stars">
										{[...Array(5)].map((_, i) => (
											<span
												key={i}
												className={`star ${i < (barber.rating || 0) ? "filled" : ""}`}
											></span>
										))}
									</div>
									<div className="">
										<button><Link to={`/booking/${barber.id}`} className="">Book Now</Link></button>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Loading top barbers...</p>
					)}
				</div>
			</div>
		</div>
	);
}

// Small star rating component (display only)
function StarRating({ rating = 0 }) {
	const full = Math.floor(rating);
	const half = rating - full >= 0.5;
	const total = 5;
	return (
		<div className="flex items-center gap-0.5" aria-hidden>
			{Array.from({ length: total }).map((_, i) => {
				const idx = i + 1;
				let symbol = "☆";
				if (idx <= full) symbol = "★";
				else if (idx === full + 1 && half) symbol = "⯨"; // approximate half
				return <span key={i} className="text-yellow-500 text-sm">{symbol}</span>;
			})}
		</div>
	);
}


