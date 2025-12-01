import React from "react";
const services = [
    { title: "Haircut", desc: "Stylish cuts by top barbers", price: "$15" },
    { title: "Shave", desc: "Smooth & clean shaves", price: "$10" },
    { title: "Beard Trim", desc: "Perfectly groomed beard", price: "$12" },
    { title: "Hair Color", desc: "Vibrant & safe coloring", price: "$20" },
];
const Service = () => {
    return (
        <section id="services" className="services">
            <h3>Our Services</h3>
            <div className="services-grid">
                {services.map((s, index) => (
                    <div key={index} className="service-card">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                        <span>{s.price}</span>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default Service;