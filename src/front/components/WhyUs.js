import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import MissionImg from "../../images/vision_mission.webp";

function WhyUs() {

    const [active, setActive] = useState("customer");

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev === "customer" ? "barber" : "customer"));
        }, 6000); // same as progress duration

        return () => clearInterval(interval);
    }, []);
    return (
        <section className='why-us'>
            <div className='why-us-head'>
                <div className='row'>
                    <div className='col-6'>
                        <h3 className=''>Why Us</h3>
                        <div className='progress-why-us'>
                            <div className={`progress ${active === "customer" ? "active" : ""}`}>
                                Why Customers Love Us?
                                <span className="progress-line"></span>
                            </div>
                            <div className={`progress ${active === "barber" ? "active" : ""}`}>
                                Why Barbers Choose Us?
                                <span className="progress-line"></span>
                            </div>
                        </div>
                        {active === "customer" && (
                            <h3 className='progress-head'>Why Customers Love Us?</h3>)}
                        {active === "barber" && (
                            <h3 className='progress-head'>Why Barbers Choose Us?</h3>)}
                    </div>
                </div>
            </div>
            <div className='why-us-cards'>
                {active === "customer" && (
                    <>
                        <div className='row'>
                            <div className='why-us-point col-3 card'>
                                <div className='point'>01</div>
                                <div className='text'>
                                    <strong>Find nearby barbers & salons</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>02</div>
                                <div className='text'>
                                    <strong>Book anytime, no waiting</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>03</div>
                                <div className='text'>
                                    <strong>Choose services & prices</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>04</div>
                                <div className='text'>
                                    <strong>Ratings & trusted professionals</strong>
                                </div>
                            </div>
                            <div className='row'><Link to="/view-barbers" className="btn">Book Now</Link></div>
                        </div>
                    </>
                )}
                {active === "barber" && (
                    <>
                        <div className='row'>
                            <div className='why-us-point col-3 card'>
                                <div className='point'>01</div>
                                <div className='text'>
                                    <strong>Manage bookings easily</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>02</div>
                                <div className='text'>
                                    <strong>Get more customers nearby</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>03</div>
                                <div className='text'>
                                    <strong>Increase income</strong>
                                </div>
                            </div>

                            <div className='why-us-point col-3 card'>
                                <div className='point'>04</div>
                                <div className='text'>
                                    <strong>Track services & earnings</strong>
                                </div>
                            </div>
                        </div>
                        <div className='row'><Link to="/barber-register" className="btn">Register Your Shop</Link></div>
                    </>
                )}
            </div>
        </section>
    )
}

export default WhyUs
