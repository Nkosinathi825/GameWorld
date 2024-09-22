import React from 'react'
import Card from '../components/Card'
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import snake1 from '../images/snake1.png'
import snake2 from '../images/snake2.png'
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
          description="Sudoku a number game."
          link='/snake'
        />
      </section>
       
    </main>
  )
}
