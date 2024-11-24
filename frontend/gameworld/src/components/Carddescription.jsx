import React from 'react';
import './Carddescription.scss';

export default function Carddescription({ title, array = [], link, img }) {
  return (
    <main className='Card'>
      <section className='header'>
        <section className='name'>{title}</section>
        <section className='img'>
          <img src={img} alt={title} />
        </section>
      </section>
      <section className='bodys'>
        <span className='headings'>{title} Basics</span>
        <ul className='list'>
          {array.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
