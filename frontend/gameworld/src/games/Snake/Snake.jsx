import React, { useEffect, useState ,useContext} from 'react'
import './Snake.scss'
import TheSnakeGame from './TheSnakeGame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'; 
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function Snake() {

  const [score,setScore]=useState(0)
  const [highscore,setHighScore]=useState(0)
  const [gameStatus,setGameStatus]=useState(false)
  const [collisionType,setCollisionType]=useState('')
  const [difficulty, setDifficulty] = useState('Easy');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false); 
  const [gameName] = useState("Snake");
  const { user } = useContext(UserContext);
  
  
  const saveGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/saveSnake', {
        user_id: user.id,
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
        if (gameStatus && e.key === "Enter") {
            handleReset();
            console.log(user.id)
            saveGame()
        }
       
    };
    
    window.addEventListener("keydown", keyPress);
    
    return () => {
        window.removeEventListener("keydown", keyPress);
    };
}, [gameStatus]);

  useEffect(() => {
    if (score > highscore) {
        setHighScore(score);
    }
}, [score, highscore]);

  const handleReset = () => {
    setGameStatus(false);       
    setScore(0)     
  };
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const handleDifficultyChange = (level) => {
    setDifficulty(level); 
    setPopupVisible(false);
  };


  const handleGameover = (type) => {
    setGameStatus(true);
    setCollisionType(type);

    setTimeout(() => {
        handleReset();
        setGameStatus(false);
        saveGame()
    }, 5000);  
};

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStart = () => {
      setIsPaused(false);
      if (!gameStatus) handleReset();
  };
  return (
    <main className='Snake-game'>
      <section className='Snake-header'>
        <section className='title'> <h3>Snake Game - {difficulty}</h3></section>
        <section className='options'>
          <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    togglePopup();
                  }}
                />
                {isPopupVisible && (
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
      <section className='Snake-body'>
        <section className='Snake-status'>
          <p>Score</p>
            <span className='outer-circle'>
              <span className='inner-circle'>
              <span>{score}</span>
              </span>
            </span>
            <p>HighScore</p>
            <span className='outer-circle'>
              <span className='inner-circle'>
              <span>{highscore}</span>
              </span>
            </span>
          </section>
        <section className='Snake-content'>
          {
            gameStatus && (
              <div className="winner-popup">
                <h2>Game Over! 
                  {collisionType === 'wall' ? 'you hit the wall' : 
                   collisionType === 'obstacle' ? 'you hit the obstacle' : 
                   'you ate yourself'}
                </h2>
                <p>You completed the {difficulty} game with {score} score!</p>
                <p>Click enter to continue</p>
              </div>
            )
          }{
            !gameStatus && (
              <TheSnakeGame 
                score={score} 
                setScore={setScore} 
                gameStatus={(type)=> handleGameover(type)} 
                difficulty={difficulty} 
                isPaused={isPaused} 
              />
            )
          }

        </section>
      </section>

    </main>
  )
}
