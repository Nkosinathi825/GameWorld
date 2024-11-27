import React, { useEffect, useState, useContext } from 'react';
import './Mole.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';


export default function Mole() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [items, setItems] = useState([]);
  const [timer, setTimer] = useState(60);
  const [gameEndType, setGameEndType] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { user } = useContext(UserContext);
  const [gameName] = useState("Mole");


  const saveGame = async () => {
    try {
        const response = await axios.post(`http://localhost:5000/user/${user.id}/score`, {
            level: difficulty,
            score: score,
            gameName: gameName,
        });
        console.log('Game saved:', response.data);
    } catch (error) {
        console.error("Couldn't save your game:", error);
    }
};
useEffect(() => {
    const keyPress = (e) => {
        if (gameOver && e.key === "Enter") {
            handleReset();
            saveGame();
        }
    };

    window.addEventListener("keydown", keyPress);

    return () => {
        window.removeEventListener("keydown", keyPress);
    };
}, [gameOver]);

  useEffect(() => {
    const fetchQuestions = async (level) => {
        try {
            const response = await fetch(`/Mole_${level.trim().toLowerCase()}.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data.Mole);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    fetchQuestions(difficulty);
    setIsRunning(false);
    setScore(0);
    setGameOver(false);
    setTimer(60);
}, [difficulty]);
useEffect(() => {
  if (isRunning && items.length > 0) {
      let time = 0;
      switch (difficulty) {
          case 'Easy':
              time = 1000;
              break;
          case 'Medium':
              time = 800;
              break;
          case 'Hard':
              time = 600;
              break;
          default:
              time = 400;
              break;
      }
      const interval = setInterval(() => {
          setItems((prevItems) => {
              const resetMoles = prevItems.map(item => ({ ...item, isMole: false }));
              const randomIndex = Math.floor(Math.random() * resetMoles.length);
              resetMoles[randomIndex].isMole = true;
              return resetMoles;
          });
      }, time);

      return () => clearInterval(interval);
  }
}, [isRunning, items.length, difficulty]);


useEffect(() => {
  const countdown = setInterval(() => {
      if (isRunning && timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
      } else if (timer === 0 && isRunning) {
          setGameEndType('timeOut');
          setGameOver(true);
      }
  }, 1000);

  return () => clearInterval(countdown);
}, [isRunning, timer]);


  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  }

  const handleDifficultyChange = (difficulty) => {
      setDifficulty(difficulty);
      setPopupVisible(!popupVisible);
  }
  function handleClick(index) {
    if (items[index].isMole) {
        setScore(prevScore => prevScore + 1);
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, isMole: false } : item
        );
        setItems(updatedItems);
    }
  }

  const handleStart = () => {
    setIsRunning(true);
};

// Handle reset button click
const handleReset = () => {
    setScore(0);
    setTimer(60);
    setIsRunning(false);
    setGameOver(false);
};
  return (
    <main className='MoleGame'>
      <section className='header'>
        <section className='title'>
          <h1>Whack The Mole Game - {difficulty}</h1>
        </section>
        <section className='option'>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={(e) => {
            e.stopPropagation();
            togglePopup();
            }}
          />
          {popupVisible && (
            <div className="popup-menu" onClick={e => e.stopPropagation()}>
              <ul>
                <li onClick={() => handleDifficultyChange('Easy')}>Easy</li>
                <li onClick={() => handleDifficultyChange('Medium')}>Medium</li>
                <li onClick={() => handleDifficultyChange('Hard')}>Hard</li>
                <li onClick={() => handleDifficultyChange('EvilHard')}>Evil Hard</li>
              </ul>
            </div>
          )}
        </section>
      </section>
      <section className='MoleBody'>
                <section className='Mole-status'>
                    <p>Time</p>
                    <span className='outer-circle'>
                        <span className='inner-circle'>
                            <span>{timer}</span>
                        </span>
                    </span>
                    <p>Score</p>
                    <span className='outer-circle'>
                        <span className='inner-circle'>
                            <span>{score}</span>
                        </span>
                    </span>
                </section>

                {
                    gameOver ? (
                        <div className="winner-popup">
                            <h2>Game Over!</h2>
                            <h3>{gameEndType === 'timeOut' ? 'time out' : 'You completed the game!'}</h3>
                            <p>You finished the {difficulty} level with a score of {score}!</p>
                            <p>Click Enter to continue.</p>
                        </div>
                    ) : (
                        <section className='MoleContent'>
                            {isRunning && items.length > 0 ? (
                                <div className={difficulty}>
                                    {items.map((mole, index) => (
                                        <img key={index}  src={mole.isMole? mole.mole:mole.hole} alt="" onClick={()=>{handleClick(index)}}/>
                                    ))}
                                </div>
                            ) : (
                                <section className='gamenot'><p>Click "Start" to begin the game</p></section>
                            )}
                        </section>
                    )
                }
            </section>
            <section className='Mole-end'>
                <button onClick={handleStart}>Start</button>
                <button onClick={handleReset}>Reset</button>
            </section>

    </main>
  )
}
