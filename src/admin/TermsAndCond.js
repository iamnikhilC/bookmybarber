import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../front/components/BackButton";

export default function TermsAndCond() {
    return (
        <div className="page-container grid">
            <div className="card-header" style={{ padding: "16px", lineHeight: "1.7" }}>
                <Link to="" style={{ fontSize: "20px", color: "gray" }}>
                    <BackButton />
                </Link>
                <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: 0 }}>
                    Terms & Conditions
                </h4>
            </div>

            <div className="page-content" style={{ padding: "16px", paddingTop: 0, lineHeight: "1.7", fontSize: "14px" }}>
                
                <p>
                    Welcome to BookMyBarber.com. By accessing or using our platform, you agree to be bound by these Terms & Conditions.
                    If you do not agree, please do not use the platform.
                </p>

                <h5>1. Platform Role</h5>
                <p>
                    BookMyBarber is a technology platform that connects customers with independent barbers. 
                    We do not provide barber services directly and are not responsible for service quality, hygiene, or conduct of barbers.
                </p>

                <h5>2. Eligibility</h5>
                <p>
                    Users must be at least 18 years old and provide accurate information during registration.
                </p>

                <h5>3. Customer Terms</h5>
                <ul>
                    <li>Provide accurate personal details and maintain account confidentiality.</li>
                    <li>Pay the full booking amount including applicable taxes.</li>
                    <li>Respect barbers and avoid fake or duplicate bookings.</li>
                    <li>Late cancellations or no-shows may result in cancellation charges.</li>
                </ul>

                <h5>4. Barber Terms</h5>
                <ul>
                    <li>Maintain correct service details, pricing, and availability.</li>
                    <li>Ensure professional conduct, hygiene, and timely service.</li>
                    <li>Avoid repeated cancellations or extra undisclosed charges.</li>
                    <li>Platform may suspend accounts for policy violations.</li>
                </ul>

                <h5>5. Pricing & Payments</h5>
                <p>
                    Prices are determined by barbers. Platform fees or taxes may apply. Payments once confirmed are subject to our refund policy.
                </p>

                <h5>6. Cancellation & Refunds</h5>
                <ul>
                    <li>Refunds are issued if the barber cancels or service is not delivered.</li>
                    <li>No refund for completed services or customer no-show.</li>
                </ul>

                <h5>7. Ratings & Reviews</h5>
                <p>
                    Customers may leave genuine reviews. We reserve the right to remove abusive or fake reviews.
                </p>

                <h5>8. Limitation of Liability</h5>
                <p>
                    BookMyBarber is not liable for service dissatisfaction, personal injury, or damages arising from services provided by barbers.
                </p>

                <h5>9. Account Suspension</h5>
                <p>
                    Accounts may be suspended or terminated for fraudulent activity, misuse, or violation of these terms.
                </p>

                <h5>10. Modifications</h5>
                <p>
                    We may update these Terms at any time. Continued use of the platform implies acceptance of updated Terms.
                </p>

                <h5>11. Governing Law</h5>
                <p>
                    These Terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of your local courts.
                </p>

                <p style={{ marginTop: "16px", fontWeight: 500 }}>
                    By using BookMyBarber, both customers and barbers agree to comply with these Terms & Conditions.
                </p>
            </div>
        </div>
    );
}
