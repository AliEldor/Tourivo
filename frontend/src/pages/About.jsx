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

      
    </>
  );
};

export default About;
