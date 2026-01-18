import React from "react";
import time from '../../images/real-time.png'; // ✅ import image
import pick from '../../images/pick-service.png'; // ✅ import image
import book from '../../images/book.png'; // ✅ import image
import payment from '../../images/payment.png'; // ✅ import image
const OurFeartures = () => {
    return (
        <section id="feature" className="how">
            <h3>Our Features</h3>
            <div className="row">
                <div className="col-3">
                    <div className="feature">
                        <span className="bullet"></span>
                        <img src={time} alt="MyBarber Hero Logo" className={`logo`} />
                        <h4>Real-time booking</h4>
                        <p>Book and confirm appointments instantly—barbers and customers stay perfectly in sync.</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="feature">
                        <span className="bullet"></span>

                        <img src={pick} alt="MyBarber Hero Logo" className={`logo`} />

                        <h4>No waiting time</h4>
                        <p>Arrive on time, get served on time. No queues, no wasted hours.</p>
                    </div>
                </div>
                <div className="col-3">
                    <span className="bullet"></span>

                    <div className="feature">
                        <img src={book} alt="MyBarber Hero Logo" className={`logo`} />
                        <h4>Fair pricing</h4>
                        <p>Transparent service prices with no hidden charges—for customers and barbers alike.</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="feature">
                        <span className="bullet"></span>

                        <img src={payment} alt="payment" />

                        <h4>Local discovery</h4>
                        <p>Find trusted barbers nearby or help customers discover your shop easily.</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default OurFeartures;