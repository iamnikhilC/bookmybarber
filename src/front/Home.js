import React from "react";
import "../App.css";
import Hero from "./components/Hero";
// import AppService from "./components/Service";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CAT";
import Topbarber from "./components/Topbarber";
import MissionVission from "./components/MissionVission";
import AboutUs from "./components/AboutUs";

const Home = () => {
    return (
        <div className="font-roboto">

            {/* Hero Section */}
            <Hero/>

            {/* Services Section */}
            <Topbarber/>

            {/* Services Section */}
            {/* <AppService/> */}
            <MissionVission/>
            {/* How It Works */}
            <HowItWorks/>
            <AboutUs/>
            {/* CTA Section */}
            <CTA/>

           
        </div>
    );
};

export default Home;
