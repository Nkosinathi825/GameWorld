import React, { useEffect, useState, useContext } from 'react';
import './Memory.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function Memory() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [difficulty, setDifficulty] = useState('Easy');
    const [items, setItems] = useState([]);
    const [timer, setTimer] = useState(120);
    const [gameEndType, setGameEndType] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [prev, setPrev] = useState(-1);
    const [matchedPairs, setMatchedPairs] = useState(0);  // Track matched pairs
    const { user } = useContext(UserContext);
    const [gameName] = useState("Memory");

    // Fetch questions
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
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions(difficulty);
        setIsRunning(false);
        setScore(0);
        setMatchedPairs(0); // Reset matched pairs count
        setGameOver(false);

        // Set timer based on difficulty
        if (difficulty === 'Easy' || difficulty === 'Medium') {
            setTimer(60); 
        } else if (difficulty === 'Hard') {
            setTimer(90); 
        } else if (difficulty === 'EvilHard') {
            setTimer(120);
        }

    }, [difficulty]);

    // Save game result to server
    const saveGame = async () => {
        try {
            const response = await axios.post('http://localhost:5000/saveMemory', {
                user_id: user.id,
                level: difficulty,
                time: timer,
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

    // Timer countdown and game over check
    useEffect(() => {
        let countdown;
        if (isRunning && !gameOver && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isRunning) {
            setGameEndType('timeOut');
            setGameOver(true);
        }

        return () => clearInterval(countdown);
    }, [isRunning, timer, gameOver]);

    // Shuffle array function
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Handle difficulty change
    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    }

    const handleDifficultyChange = (difficulty) => {
        setDifficulty(difficulty);
        setPopupVisible(!popupVisible);
    }

    // Handle start button click
    const handleStart = () => {
        setIsRunning(true);
        setMatchedPairs(0);  // Reset matched pairs count on start
    };

    // Handle reset button click
    const handleReset = () => {
        setScore(0);
         if (difficulty === "Easy" || difficulty === "Medium") {
           setTimer(60);
         } else if (difficulty === "Hard") {
           setTimer(90);
         } else if (difficulty === "EvilHard") {
           setTimer(120);
         }
        setIsRunning(false);
        setMatchedPairs(0);  // Reset matched pairs count on reset
        setGameOver(false);
    };

    // Check if the selected pair of cards match
    function check(current) {
        if (items[current].correct_answer === items[prev].correct_answer) {
            setScore(score + 1);
            items[current].status = "active";
            items[prev].status = "active";
            setItems([...items]);

            // Increment matched pairs count
            setMatchedPairs((prevCount) => prevCount + 1);

            // Check if game is won
            if (matchedPairs + 1 === items.length / 2) {
                setGameEndType('win');
                setGameOver(true);
            }

            setPrev(-1);
        } else {
            items[current].status = "active";
            items[prev].status = "active";
            setItems([...items]);
            setTimeout(() => {
                items[current].status = "inactive";
                items[prev].status = "inactive";
                setItems([...items]);
                setPrev(-1);
            }, 1500);
        }
    }

    // Handle card click
    function handleCardClick(id) {
        if (prev === -1) {
            items[id].status = "active";
            setItems([...items]);
            setPrev(id);
        } else {
            check(id);
        }
    }

    return (
        <main className='MemoryGame'>
            <section className='header'>
                <section className='title'>
                    <h1>Memory Game - {difficulty}</h1>
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
                            <h3>{gameEndType === 'timeOut' ? 'You ran out of time' : 'You completed the game!'}</h3>
                            <p>You finished the {difficulty} game with a score of {score}!</p>
                            <p>Click Enter to continue.</p>
                        </div>
                    ) : (
                        <section className='MemoryContent'>
                            {isRunning && items.length > 0 ? (
                                <div className={difficulty}>
                                    {items.map((question, index) => (
                                        <Card key={index} id={index} question={question} difficulty={difficulty} handleCardClick={handleCardClick} />
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
