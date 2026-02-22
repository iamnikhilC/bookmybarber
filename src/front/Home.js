import React from "react";
import "../App.css";
import Hero from "./components/Hero";
// import AppService from "./components/Service";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CAT";
import Topbarber from "./components/Topbarber";
import MissionVission from "./components/MissionVission";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import OurFeartures from "./components/OurFeatures";
import Announcment from "./components/Announcment";
const Home = () => {
    return (
        <div className="font-roboto">
            <Announcment/>
            <Topbarber/>
            <WhyUs/>
            <HowItWorks/>
            <MissionVission/>
            <OurFeartures/>
            {/* How It Works */}
            <AboutUs/>
            {/* CTA Section */}
            {/* <CTA/> */}

           
        </div>
    );
};

export default Home;
