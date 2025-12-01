import React from 'react'
import MissionImg from "../../images/vision_mission.webp";

function MissionVission() {
    return (
        <section className='vision-mission'>
            <div className='vision'>
                <div className='row'>
                    <div className='col-6'>
                        <h3 className='vision-head'>Our Vision</h3>
                        <p className='text'>To redefine men’s grooming by creating a seamless digital bridge between clients and expert barbers bringing luxury,
                            convenience, and confidence to every booking.</p>
                        <h3 className='mission-head'>Our Mission</h3>
                    </div>
                    <div className='col-5'>
                        <img src={MissionImg} alt="MyBarber Hero Logo" className='vision-img' />
                    </div>
                </div>
            </div>
            <div className='mission'>
                <div className='row'>
                    <div className='mission-point col-3'>
                        <div className='point'>01</div>
                        <div className='text'><strong>Empowering Barbers : </strong>
                            Providing a platform where skilled professionals can showcase their craft, grow their client base,
                            and manage bookings effortlessly.
                        </div>
                    </div>
                    <div className='mission-point col-3'>
                        <div className='point'>02</div>
                        <div className='text'><strong>Simplifying Grooming for Clients :</strong> Helping customers easily discover trusted barbers nearby,
                            explore services, and book appointments in just a few taps.
                        </div>
                    </div>
                    <div className='mission-point col-3'>
                        <div className='point'>03</div>
                        <div className='text'><strong>Blending Tradition with Technology : </strong>
                            Combining the artistry of classic barbering with the efficiency of modern digital solutions.
                        </div>
                    </div>
                    <div className='mission-point col-3'>
                        <div className='point'>04</div>
                        <div className='text'><strong>Delivering Quality & Trust : </strong>
                            Ensuring every experience from booking to the final cut reflects excellence, care, and professionalism.
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default MissionVission
