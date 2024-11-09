import React,{useEffect,useState} from 'react';
import './Card.scss';  


import { Link } from 'react-router-dom';



const Card = ({ title,  images = [],link}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(intervalId); 
}, []);
  return (
    <div className="card">
      <Link to={link}>
        <section className='card-img'>
        <img src={images[currentImageIndex]} alt={title} className="image" />
        </section>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Card;
