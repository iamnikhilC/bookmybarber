import React from 'react'
import Aboutus from "../../images/about-us.webp";

function AboutUs() {
    return (
        <section className='about-us'>
            <div className='about-content'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='card'>
                            <h3 className='head'>About Us</h3>
                            <p className='text'>Look sharp, feel confident anytime, anywhere. <br/>
                                MyBarber connects you with trusted barbers near you for quick, easy, and stylish grooming.
                                Book your appointment in seconds, skip the wait, and enjoy professional service that fits your lifestyle.
                                Because at MyBarber, it’s not just a haircut — it’s your confidence, redefined.</p>
                        </div>
                    </div>
                    <div className='col-4'>
                        <img src={Aboutus} alt="about-us" className='about-img' />
                    </div>
                    <div className='col-4 about-points'>
                        <div className='points'>
                            <div className='point'>01</div>
                            <div className='text'>Highly skilled artisans who prioritize precision and style</div>
                        </div>
                        <div className='points'>
                            <div className='point'>02</div>
                            <div className='text'>A luxurious environment designed for the modern gentleman</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
