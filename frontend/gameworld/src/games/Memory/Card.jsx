// Card.js
import React from 'react';
import './Card.scss';

export default function Card({ question, difficulty, id, handleCardClick }) {
  let animationDuration = '2s';
  const isActive = question.status === 'active' || question.status === 'correct';

  return (
    <div
      className={`Cards ${isActive ? 'active' : 'inactive'} ${question.status}`}
      style={{ animationDuration }}
      onClick={() => handleCardClick(id)}
    >
      <img
        src={question.question}
        alt="Memory Card"
        className={`image ${isActive ? 'active' : 'inactive'}`}
        style={{ animationDuration }}
      />
    </div>
  );
}