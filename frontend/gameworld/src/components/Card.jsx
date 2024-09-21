import React from 'react';
import './Card.scss';  
import { Link } from 'react-router-dom';

const Card = ({ title, image, description, link}) => {
  return (
    <div className="card">
      <Link to={link}>
        <section className='card-img'>
        <img src={image} alt={title} className="image" />
        </section>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
