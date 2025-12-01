import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultBanner from '../../images/default_banner.png'; // ✅ import image
import defaultProfile from '../../images/logo.png'; // ✅ import image

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Topbarber = () => {
    const [barbers, setBarbers] = useState([]);

    // Fetch data once when the component mounts
    useEffect(() => {
        const getTopBarbers = async () => {
            try {
                const response = await axios.get(`${baseURL}/front/topbarbers.php`);
                if (response.data && response.data.barbers) {
                    console.log(response.data.barbers);
                    setBarbers(response.data.barbers);
                }
            } catch (error) {
                console.error("Error fetching top barbers:", error);
            }
        };

        getTopBarbers();
    }, []);

    return (
        <section id="topbarber">
            <h3>Top Barbers</h3>

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
                                {/* <Link to="admin/view-barbers" className="bg-red-500 text-white px-4 py-2 rounded">View</Link> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading top barbers...</p>
                )}
                <Link to="/view-barbers" className="bg-red-500 text-white px-4 py-2 rounded">View All</Link>
            </div>
        </section>
    );
};

export default Topbarber;
