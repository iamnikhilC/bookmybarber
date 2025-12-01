import React from "react";
import Choose from '../../images/choose-barber.png'; // ✅ import image
import pick from '../../images/pick-service.png'; // ✅ import image
import book from '../../images/book.png'; // ✅ import image
import payment from '../../images/payment.png'; // ✅ import image
const HowItWorks = () => {
    return (
        <section id="how" className="how">
            <h3>How It Works</h3>
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <img src={Choose} alt="MyBarber Hero Logo" className={`logo`} />
                        <h4>Choose Barber</h4>
                        <p>Pick your favorite barber from top-rated professionals.</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                    <img src={pick} alt="MyBarber Hero Logo" className={`logo`} />

                        <h4>Pick Service</h4>
                        <p>From haircuts to grooming packages select exactly what you need.</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                    <img src={book} alt="MyBarber Hero Logo" className={`logo`} />
                        <h4>Book Appointment</h4>
                        <p>Select your preferred date and time to confirm your grooming session.</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                    <img src={payment} alt="payment" />

                        <h4>Make Payment</h4>
                        <p>Complete your booking with fast, secure, and hassle-free online payment.</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HowItWorks;