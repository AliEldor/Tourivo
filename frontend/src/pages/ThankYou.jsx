import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  const location = useLocation();
  const booking = location.state;

  
};

export default ThankYou;
