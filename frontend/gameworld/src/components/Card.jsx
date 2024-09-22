import React,{useEffect,useState} from 'react';
import './Card.scss';  
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import { Link } from 'react-router-dom';



const Card = ({ title, image, description, link}) => {
  const images = [sudoku1, sudoku2];
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
          <p className="card-description">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
