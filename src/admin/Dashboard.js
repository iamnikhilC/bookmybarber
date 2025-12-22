import React from "react";
import newBooking from '../images/new-booking.png'; // ✅ import image
const Dashboard = () => {
    return (
        <div className="dashbaord">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <p>You have new booking for <strong>Hari cutting</strong></p>
                            <img src={newBooking} alt="MyBarber Hero Logo" />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">Customers</div>
                        <div className="card-body"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">Barber's</div>
                        <div className="card-body"></div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">Customers</div>
                        <div className="card-body"></div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">Customers</div>
                        <div className="card-body"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;