import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';

import './tour-card.css';

const ActivityCard = ({ activity }) => {
  const { id, title, city, photo, price, featured, reviews } = activity;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='activity__card'>
      <Card>
        <div className='activity__img'>
          <img src={photo} alt='activity-img' />
          {featured && <span>Featured</span>}
        </div>

        
      </Card>
    </div>
  );
};

export default ActivityCard;
