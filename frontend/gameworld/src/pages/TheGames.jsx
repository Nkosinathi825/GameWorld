import React from 'react'
import Card from '../components/Card'
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import snake1 from '../images/snake.jpg'
import snake2 from '../images/snake4.jpg'
import quize1 from '../images/quize1.jpg';
import quize2 from '../images/quize2.png'
import quize3 from '../images/quize3.jpeg'
import math1 from '../images/math1.jpg'
import math2 from '../images/math2.avif'
import math3 from '../images/math3.jpg'
import spelling from  '../images/spelling.avif'
import spelling1 from  '../images/spelling1.avif'
import spelling2 from  '../images/spelling2.avif'
import memory from  '../images/memory.webp'
import memory1 from  '../images/memory1.avif'
import memory2 from  '../images/memory2.jpg'
import mole from  '../images/mole.jpg'
import mole1 from  '../images/mole1.jpg'
import mole2 from  '../images/mole2.jpg'
import jump from '../images/jump.webp'
import jump1 from "../images/jump1.jpg";
import jump2 from "../images/jump2.jpg";
import './TheGame.scss'


export default function TheGames() {

  return (
    <main className="games-container">
      <section className="games-header">
        <h3>Endless Fun, One Destination – Play Anytime, Anywhere!</h3>
      </section>
      <section className="games-games">
        <Card 
          title="Sudoku" 
          images={[sudoku1, sudoku2]} 
          link="/sudoku" />
        <Card 
          title="Snake Game" 
          images={[snake1, snake2]} 
          link="/snake" />
        <Card
          title="Quiz Game"
          images={[quize1, quize2, quize3]}
          link="/quize"
        />
        <Card
          title="Mathematics  Game"
          images={[math1, math2, math3]}
          link="/math"
        />
        <Card
          title="Spelling Game"
          images={[spelling, spelling1, spelling2]}
          link="/spelling"
        />
        <Card
          title="Memory game"
          images={[memory, memory1, memory2]}
          link="/memory"
        />
        <Card
          title="Whack The mole Game"
          images={[mole, mole1, mole2]}
          link="/mole"
        />
        <Card
          title="The Rolling Ball Game"
          images={[jump, jump1, jump2]}
          link="/The Rolling Ball Game"
        />
      </section>
    </main>
  );
}
