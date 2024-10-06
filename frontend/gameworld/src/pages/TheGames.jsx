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
import './TheGame.scss'


export default function TheGames() {

  return (
    <main className='games-container'>
      <section className='games-header'> 
        <h3>"Endless Fun, One Destination – Play Anytime, Anywhere!"</h3>
      </section>
      <section className='games-games'>
        <Card
          title="Sudoku"
          images={[sudoku1,sudoku2]}
          description="Sudoku a number game."
          link='/sudoku'
        />
         <Card
          title="Snake"
          images={[snake1,snake2]}
          description="Snake game."
          link='/snake'
        />
        <Card
          title="Quiz"
          images={[quize1,quize2,quize3]}
          description="Quiz game."
          link='/quize'
        />
        <Card
          title="Mathematics"
          images={[math1,math2,math3]}
          description="Mathematics game"
          link='/math'
        />
      </section>
       
    </main>
  )
}
