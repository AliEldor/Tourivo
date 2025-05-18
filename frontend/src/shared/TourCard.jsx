import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  
};

export default TourCard;
