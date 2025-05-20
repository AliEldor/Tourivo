import React from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";

import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";

const About = () => {
  return (
    <>
      <CommonSection title={"About"} />
      <section>
        <Container>
          <Row></Row>
        </Container>
      </section>

      <section className="pt-5">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Discover Our Passion for Travel
                  <span className="highlight"></span>
                </h1>
                <p>
                  <p>
                    Welcome to Our Travel Agency, where we believe that travel
                    is not just about visiting new places, but about creating
                    transformative experiences. Our mission is to inspire and
                    connect people through the joy of exploration. We are
                    passionate about curating exceptional journeys that immerse
                    you in the rich cultures, breathtaking landscapes, and
                    hidden gems of our world. With a team of dedicated travel
                    experts, we strive to provide personalized attention,
                    meticulous planning, and unparalleled service to ensure that
                    every trip exceeds your expectations. Whether you're seeking
                    thrilling adventures, relaxing getaways, or meaningful
                    encounters, let us be your trusted partner in crafting
                    unforgettable memories. Embark on a journey with us and let
                    the magic of travel unfold.
                  </p>
                </p>
              </div>
            </Col>

            <Col lg="6">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default About;
