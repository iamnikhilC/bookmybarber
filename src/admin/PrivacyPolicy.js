import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../front/components/BackButton";

export default function PrivacyPolicy() {
    return (
        <div className="page-container grid">
            <div className="card-header" style={{ padding: "16px", lineHeight: "1.7" }}>
                <Link to="" style={{ fontSize: "20px", color: "gray" }}>
                    <BackButton />
                </Link>
                <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: 0 }}>
                    Privacy Policy
                </h4>
            </div>

            <div className="page-content" style={{ padding: "16px", paddingTop:0, lineHeight: "1.7" }}>
                <p style={{marginTop: 0,}}><strong>Effective Date:</strong> [Insert Date]</p>
                <p><strong>Website:</strong> bookmybarber.com</p>

                <p>
                    Welcome to BookMyBarber (“we,” “our,” or “us”). This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use our website and services.
                </p>

                <h5>1. Information We Collect</h5>
                <p><strong>a) Personal Information</strong></p>
                <ul>
                    <li>Full Name</li>
                    <li>Phone Number</li>
                    <li>Email Address</li>
                    <li>Profile Photo (optional)</li>
                    <li>Address or Location (for home service bookings)</li>
                </ul>

                <p><strong>b) Barber Information</strong></p>
                <ul>
                    <li>Name & Shop Details</li>
                    <li>Phone Number & Email</li>
                    <li>Business Address</li>
                    <li>Service Listings & Pricing</li>
                    <li>Bank / UPI details (for payouts)</li>
                </ul>

                <p><strong>c) Booking Information</strong></p>
                <ul>
                    <li>Selected services</li>
                    <li>Date & Time of appointment</li>
                    <li>Booking status and history</li>
                    <li>Payment details (processed via secure gateway)</li>
                </ul>

                <p><strong>d) Automatically Collected Data</strong></p>
                <ul>
                    <li>IP Address</li>
                    <li>Device type & browser</li>
                    <li>Usage data and interactions</li>
                    <li>Cookies and tracking data</li>
                </ul>

                <h5>2. How We Use Your Information</h5>
                <ul>
                    <li>Provide and manage bookings</li>
                    <li>Connect customers with nearby barbers</li>
                    <li>Process payments and payouts</li>
                    <li>Send booking confirmations & notifications</li>
                    <li>Improve platform performance and user experience</li>
                    <li>Prevent fraud and ensure security</li>
                    <li>Provide customer support</li>
                </ul>

                <h5>3. Cookies and Tracking Technologies</h5>
                <p>
                    We use cookies to remember user sessions, improve functionality, and analyze traffic trends.
                    You can disable cookies in your browser settings, but some features may not work properly.
                </p>

                <h5>4. Sharing of Information</h5>
                <p>We do not sell your personal data. We may share information only in the following cases:</p>
                <ul>
                    <li>With barbers to fulfill booking requests</li>
                    <li>With payment gateways to process transactions securely</li>
                    <li>With service providers (hosting, analytics)</li>
                    <li>When required by law or legal process</li>
                </ul>

                <h5>5. Data Security</h5>
                <p>
                    We implement industry-standard security measures such as SSL encryption, secure authentication,
                    and restricted database access. However, no online platform is 100% secure.
                </p>

                <h5>6. User Rights</h5>
                <ul>
                    <li>Access your personal data</li>
                    <li>Update or correct profile information</li>
                    <li>Request account deletion</li>
                    <li>Opt-out of promotional notifications</li>
                </ul>

                <h5>7. Data Retention</h5>
                <p>
                    We retain user data as long as the account is active or as needed to comply with legal obligations,
                    resolve disputes, and enforce agreements.
                </p>

                <h5>8. Children’s Privacy</h5>
                <p>
                    Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                    data from minors.
                </p>

                <h5>9. Third-Party Links</h5>
                <p>
                    Our platform may contain links to third-party services (payment gateways, maps, etc.).
                    We are not responsible for their privacy practices.
                </p>

                <h5>10. Changes to This Privacy Policy</h5>
                <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page
                    with the updated effective date.
                </p>

                <h5>11. Contact Us</h5>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    <strong>Email:</strong> support@bookmybarber.com
                    <br />
                    <strong>Website:</strong> bookmybarber.com
                </p>

                <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                    By using bookmybarber.com, you agree to this Privacy Policy.
                </p>
            </div>
        </div>
    );
}
