import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';

import './tour-card.css';

const ActivityCard = ({ activity }) => {
  const { id, title, city, photo, price, featured, reviews } = activity;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

 
};

export default ActivityCard;
