import React from 'react'
import './Dashboard.scss'
import Carddescription from '../components/Carddescription'
import snake1 from '../images/snake.jpg'
import sudoku1 from '../images/sudoku1.JPG';
import quize3 from '../images/quize2.png'
import math1 from '../images/math1.jpg'
import memory from  '../images/memory.webp'
import mole from  '../images/mole.jpg'
import spelling from  '../images/spelling.avif'
import jump from '../images/jump.webp'

export default function Dashboard() {
  return (
    <main className='HomePage'> 
      <section className="games-header">
        <h3>Game descriptions</h3>
      </section>
      <section className='HomeBody'>
        <Carddescription 
        title="Snake Game"
        array={[  " The player controls a snake that moves around a grid-like screen ",
          "The snake continuously moves in one direction, and the player can change its direction (up, down, left, right) using arrow keys or other controls.",
          "The objective of the game is to eat food that appears on the screen. Each time the snake eats food, it grows longer.",
          "The game ends if the snake collides with the walls or itself.",
          "The score is typically based on how long the snake gets."]}
     
        link="/snake"
        img={snake1}
        />
        <Carddescription
          title="Sudoku Game"
          array={["Sudoku is played on a 9x9 grid, divided into nine smaller 3x3 subgrids",
            "The goal of Sudoku is to fill in the entire 9x9 grid with numbers from 1 to 9",
            "Each row must contain every number from 1 to 9 exactly once",
            "Each column must also contain every number from 1 to 9 exactly once",
            "Each 3x3 subgrid (box) must contain every number from 1 to 9 exactly once",
            "The challenge of Sudoku is to figure out the correct numbers for the remaining empty cells, using logic and deduction"

          ]}
           link="/sudoku"
           img={sudoku1}
        />
        <Carddescription
        title="Quiz Game"
        array={[ 
          "The goal of the quiz game is to answer as many questions correctly as possible, with the score usually based on how many questions are answered correctly within a set time limit or number of questions",
          " The player is shown a question with multiple-choice answers . The player must choose the correct answer.",
          "The game keeps track of the player’s score based on correct answers. For each correct answer, points are awarded",
          "Easy: The questions are simple and based on basic knowledge or trivia that most people would know.",
          "Medium: These questions require a bit more specialized knowledge or reasoning.",
          "Hard: The questions are more difficult, requiring expert knowledge or more detailed understanding of the topic."

        ]}
        link="/quize"
        img={quize3}
        />
          <Carddescription
          title="Mathematics Game"
          array={[
            "The Mathematics Game is a fast-paced game where players solve arithmetic problems within a time limit.",
            "The objective is to answer as many questions correctly as possible before time runs out",
            " The game features four difficulty levels: Easy, Medium, Hard, and EvilHard. Each level has a different range of numbers and a different set of operations.",
            "Score Tracking: Players’ scores are tracked based on the number of correct answers. The faster and more accurately the player answers, the higher the score.",


          ]}
          link="/math"
          img={math1}
          />
            <Carddescription
          title="Memory Game"
          array={[
            "Memory Game is a classic matching card game where the objective is to match pairs of cards",
            "The game is played on a grid of face-down cards. Players flip over two cards at a time, trying to match pairs",
            "If the cards match, they stay face-up; if not, they flip back over",
            "The game ends when all pairs are matched, and the player's score is based on how quickly and efficiently they find the pairs",
            "Timer: The game has a countdown timer based on the selected difficulty. The game ends when the timer runs out or when all pairs are matched",
            "Score Tracking: The score is tracked based on the number of correct matches made. A higher score is awarded for quicker and more accurate matches."
          ]}
          link="/memory"
          img={memory}
          />
           <Carddescription
           title="Whack the mole Game"
           array={[
            "The Mole Game is an action-packed game where players aim to whack the moles that pop up randomly on the screen",
            "The player earns points for each mole they hit, and the game ends  when the timer runs out",
            "Difficulty Levels: The game offers multiple difficulty levels: Easy, Medium, Hard, and EvilHard. Each difficulty level changes the speed at which moles appear and the length of the game.",
            "Timer: The game features a countdown timer that is adjusted based on the selected difficulty. The game ends when the timer runs out.",
            "Score Tracking: Players earn points by clicking on moles as they appear. The faster and more accurately they hit moles, the higher their score will be."

           ]}
           link="/mole"
           img={mole}
           />
           <Carddescription
           title='Spelling Game'
           array={[
            "The Rolling Ball Game is an action-based game where a ball rolls through an obstacle course.",
            "The objective is to avoid obstacles by jumping, and the player earns points for every second they avoid them",
            "The game ends when the ball collides with an obstacle. Players can control the ball's movement with the keyboard (using the space bar or up arrow key to jump)",
            "Obstacle Avoidance: The player must avoid obstacles that appear on the screen, represented by yellow blocks.",
            "Difficulty Adjustments: The speed of obstacles gradually increases as the player progresses, making the game harder."

           ]}
            link="/spelling"
            img={spelling}
           />
           <Carddescription
           title='The Rolling ball Game'
           array={[
            "The Spelling Game is an interactive quiz game where players are shown images and must select the correct answer from a list of options",
            "The game tests players' spelling skills by asking them to identify the correct word associated with an image",
            " The game ends when the timer runs out, the player selects an incorrect answer, or the quiz is completed",
            "Difficulty Levels: The game offers multiple difficulty levels, such as Easy and Medium, which change the complexity of the questions or the speed of the game.",
            "Score Tracking: Players earn points by answering questions correctly. Each correct answer adds a point to their score."
           ]}
           link="/The Rolling Ball Game"
            img={jump}
           />
      </section>
    </main>
  )
}
