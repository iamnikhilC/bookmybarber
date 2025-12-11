import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Logo from '../../images/white-logo.png'; // ✅ import image

export default function Footer() {
    return (
        <section className="footer">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <img className="logo" alt="logo" src={Logo} />
                    <p className="mt-3 text-gray-300 text-sm">
                        Your trusted barber booking platform.
                        Find barbers near you & book appointments instantly.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/barbers" className="hover:text-white">Barbers</Link></li>
                        <li><Link to="/booking" className="hover:text-white">Book Appointment</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

            </div>

            <div className="text-center text-gray-400 text-sm mt-10 border-t border-white/20 pt-5">
                © {new Date().getFullYear()} MyBarber. All rights reserved.
            </div>
        </section>
    );
}
