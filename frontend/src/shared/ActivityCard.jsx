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

        <CardBody>
          <div className='card__top d-flex align-items-center justify-content-between'>
            <span className='activity__location d-flex align-items-center gap-1'>
              <i className='ri-map-pin-line'></i> {city}
            </span>

            <span className='activity__rating d-flex align-items-center gap-1'>
              <i className='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
            </span>
          </div>

          <h5 className='activity__title'>
            <Link to={`/activities/${id}`}>{title}</Link>
          </h5>

          <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
            <h5>${price} <span>/per person</span></h5>

            <button className='btn booking__btn'>
              <Link to={`/activities/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActivityCard;
