import React from "react";
import book from '../../images/book-now.png'; // ✅ import image
import partner from '../../images/partner.png';
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="cta">
            <h3>Ready to get started?</h3>
            <div className="grid">
                <div className="card">
                    <div className="card-body">
                        <img src={book} alt="CTA" />
                        <div><Link to="/view-barbers" className="btn">Book an Appointment</Link></div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <img src={partner} alt="CTA" />
                        <div><Link to="/barber-register" className="btn">Became a partner</Link></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA;