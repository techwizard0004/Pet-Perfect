import React from 'react';
import "../Styles/Home.css";
import { faArrowRightLong, faPhoneVolume, faMoneyCheckDollar, faTruckFast, faArrowRotateLeft, faPhoneSquare, faEnvelopeSquare, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pets from "../Assets/img.jpg";

function Home() {
    return (
        <div className="container-fluid">
            <div className="row" id="wrapper-landing">
                <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                    <h1>Pet-Perfect</h1>
                    <p>
                        We care for your beloved Pet, train them & make them Perfect
                    </p>
                    <a href="/products"><button>Our Products <FontAwesomeIcon icon={faArrowRightLong} /></button></a>
                </div>
            </div>
            <div className="row" id="wrapper-about">
                <div className="col-sm-7">
                    <h2>About Us</h2>
                    <p>
                        A pet, or companion animal, is an animal kept primarily for a person's company or entertainment rather than as a working animal, livestock, or a laboratory animal. Popular pets are often considered to have attractive/cute appearances, intelligence, and relatable personalities, but some pets may be taken in on an altruistic basis (such as a stray animal) and accepted by the owner regardless of these characteristics.Two of the most popular pets are dogs and cats. Other animals commonly kept include rabbits; ferrets; pigs; rodents such as gerbils, hamsters, chinchillas, rats, mice, and guinea pigs; birds such as parrots, passerines, and fowls; reptiles such as turtles, lizards, snakes, and iguanas; aquatic pets such as fish, freshwater snails, and saltwater snails; amphibians such as frogs and salamanders; and arthropod pets such as tarantulas and hermit crabs. Small pets may be grouped together as pocket pets, while the equine and bovine group include the largest companion animals.Pets provide their owners (or "guardians") both physical and emotional benefits. Walking a dog can provide both the human and the dog with exercise, fresh air, and social interaction. Pets can give companionship to people who are living alone or elderly adults who do not have adequate social interaction with other people. There is a medically approved class of therapy animals, that are brought to visit confined humans, such as children in hospitals or elders in nursing homes. Pet therapy utilizes trained animals and handlers to achieve specific physical, social, cognitive, or emotional goals with patients. 
                    </p>
                </div>
                <div className="col-sm-5">
                    <img src={Pets} alt="Pets" />
                </div>
            </div>
            <div className="row" id="wrapper-contact">
                <h2>Get In Touch</h2>
                <p>In case you are qurious about our Locations, or Contact details or willing to Write somthing to us</p>
                <div className="col-sm-6 d-flex flex-column align-items-end">
                    <div className="card">
                        <h6>
                            <FontAwesomeIcon icon={faMapPin} id="icon" style={{ color: "var(--bgone)", fontSize: "35px" }} /> <strong>Address: </strong>
                            Shopno 4 Street, Dhake Colony, J P Road, Opposite Wadia High School, Andheri (w), Mumbai, Maharastra-803341
                        </h6><br />
                        <h6>
                            <FontAwesomeIcon icon={faPhoneSquare} id="icon" style={{ color: "var(--bgone)", fontSize: "35px" }} /> <strong>Contact: </strong>
                            (033) 8652-9652
                        </h6><br />
                        <h6>
                            <FontAwesomeIcon icon={faEnvelopeSquare} id="icon" style={{ color: "var(--bgone)", fontSize: "35px" }} /> <strong>Email: </strong>
                            writetous.pp.2022@gmail.com
                        </h6><br />
                        <h6>
                            <FontAwesomeIcon icon={faWhatsappSquare} id="icon" style={{ color: "var(--bgone)", fontSize: "35px" }} /> <strong>Whatsapp: </strong>
                            +91-8632014527
                        </h6>
                    </div>
                </div>
                <div className="col-sm-6 d-flex flex-column align-items-start">
                    <div className="map-wrap d-flex flex-column align-items-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.594156381789!2d78.33020731467136!3d17.431253688052323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9378f796da6b%3A0xec03d681155c740a!2sDOGGY%20VILLE!5e0!3m2!1sen!2sin!4v1676088882256!5m2!1sen!2sin" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home