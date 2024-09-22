import React from 'react'
import Card from '../components/Card'
import sudoku1 from '../images/sudoku1.JPG';
import './TheGame.scss'


export default function TheGames() {

  return (
    <main className='games-container'>
        <Card
        title="Sudoku"
        image={sudoku1}
        description="Sudoku is a number puzzle game."
        link='/s'
      />
    </main>
  )
}
