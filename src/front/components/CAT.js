import React from "react";
import book from '../../images/book-now.png'; // ✅ import image
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="cta">
            <h3>Ready for a Fresh Look?</h3>
            <div className="row">
                <div className="col-4">
                    <img src={book} alt="CTA" />
                    <div><Link to="/view-barbers" className="btn">Book an Appointment</Link></div>
                </div>
            </div>
        </section>
    )
}

export default CTA;