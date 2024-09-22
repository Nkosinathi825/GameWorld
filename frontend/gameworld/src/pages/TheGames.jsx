import React from 'react'
import Card from '../components/Card'
import sudoku1 from '../images/sudoku1.JPG';
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
          image={sudoku1}
          description="Sudoku a number game."
          link='/s'
        />
      </section>
       
    </main>
  )
}
