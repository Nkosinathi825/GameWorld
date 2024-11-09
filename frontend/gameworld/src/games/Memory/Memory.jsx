import React,{useEffect, useState,useContext} from 'react'
import './Memory.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function Memory() {
    const [popupVisible, setPopupVisible] =useState(false);
    const [difficulty, setDifficulty] = useState('Easy');
    const [items, setItems] = useState([]);
    const [timer,setTimer]=useState(120);
    const [gameEndType, setGameEndType] = useState('');
    const [score, setScore]=useState(0);
    const [gameOver, setGameOver]=useState(false);
    const [isRunning,setIsRunning]=useState(false);
    const [prev,setPrev]=useState(-1);
    const { user } = useContext(UserContext);
    const [gameName] = useState("Memory");



    useEffect(() => {
        const fetchQuestions = async (level) => {
            try {
                const response = await fetch(`/Memory_${level.trim().toLowerCase()}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const shuffledQuestions = shuffleArray(data.Memory);
                setItems(shuffledQuestions);
    
            } catch (error) {
             
            }
        };
    

        fetchQuestions(difficulty);
        setIsRunning(false);
        setScore(0);
        setGameOver(false);

        if (difficulty === 'Easy' || difficulty === 'Medium') {
            setTimer(60); 
        } else if (difficulty === 'Hard') {
            setTimer(90); 
        } else if (difficulty === 'EvilHard') {
            setTimer(120);
        }
    
    }, [difficulty]); 
    

    const saveGame = async () => {
        try {
          const response = await axios.post('http://localhost:5000/saveMemory', {
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
            if (gameOver && e.key === "Enter") {
                handleReset();
                saveGame();
                window.location.reload();
            }
        };

        window.addEventListener("keydown", keyPress);

        return () => {
            window.removeEventListener("keydown", keyPress);
        };
    }, [gameOver]);

    useEffect(() => {
        let countdown;
        if (isRunning && !gameOver && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isRunning) {
            setGameEndType('timeOut')
            setGameOver(true);
        }

        return () => clearInterval(countdown);
    }, [isRunning, timer, gameOver]);


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    }

    const handleDifficultyChange = (difficulty) => {
        setDifficulty(difficulty);
        setPopupVisible(!popupVisible);
    }
    const handleStart = () => {
        setIsRunning(true);
        if (difficulty === 'Easy' || difficulty === 'Medium') {
            setTimer(60); 
        } else if (difficulty === 'Hard') {
            setTimer(90); 
        } else if (difficulty === 'EvilHard') {
            setTimer(120); 
        }
    };
    

    const handleReset = () => {
        setScore(0);
        setTimer(0);
        setIsRunning(false);
        setGameOver(false);
        window.location.reload();
    };
    function check(current){
        if(items[current].correct_answer == items[prev].correct_answer){
            setScore(score+1)
            items[current].status = "active"
            items[prev].status = "active"
            setItems([...items])
            setPrev(-1)
        }else{
            items[current].status = "active"
            items[prev].status = "active"
            setItems([...items])
            setTimeout(() => {
                items[current].status= "inactive"
                items[prev].status = "inactive"
                setItems([...items])
                setPrev(-1)
            }, 1500)
        }
    }

    function handleCardClick(id){
        if(prev === -1){
            items[id].status = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }

    
    

  return (
    <main className='MemoryGame'>
        <section className='header '>
            <section className='title'><h1>Memory Game - {difficulty}</h1></section>
            <section className='option'>
                <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePopup();
                            }}
                        />
                {popupVisible&&(
                    <div className="popup-menu" onClick={e => e.stopPropagation()}> 
                    <ul>
                        <li onClick={() => handleDifficultyChange('Easy')}>Easy</li>
                        <li onClick={() => handleDifficultyChange('Medium')}>Medium</li>
                        <li onClick={() => handleDifficultyChange('Hard')}>Hard</li>
                        <li onClick={() => handleDifficultyChange('EvilHard')}>Evil Hard</li>
                    </ul>
                    </div>
                )
                }
                    
            </section>
        </section>
        <section className='MemoryBody'>
            <section className='Memory-status'>
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
                        <h3>  {gameEndType === 'timeOut' ? 'You ran out of time' : 'You completed the game!'}</h3>
                        <p>You finished the {difficulty} game with a score of {score}!</p>
                        <p>Click Enter to continue.</p>
                    </div>
                ):(
                    <section className='MemoryContent'>
            
                    {isRunning && items.length > 0 ? (
                            <div className={difficulty} >
                                {items.map((question, index) => (
                                    <Card key={index}  id={index} question={question} difficulty={difficulty} handleCardClick={handleCardClick}/>
                                ))}
                            </div>
                            ) : (
                                <section className='gamenot'><p>Click "Start" to begin the game</p></section>
                            )}
                    
                </section>
                )
            }

        </section>
        <section className='Memory-end'>
                <button onClick={handleStart}>Start</button>
                <button onClick={handleReset}>Reset</button>
        </section>
    </main>
  )
}
