import React, { useState, useEffect,useContext } from 'react';
import './QuizeGame.scss';
import a from '../../images/a.jpg';
import b from '../../images/b.webp';
import c from '../../images/c.avif';
import d from '../../images/d.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function QuizeGame() {
    const [difficulty, setDifficulty] = useState('Easy');
    const [isWinnerPopupVisible, setWinnerPopupVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [highscore, setHighScore] = useState(0);
    const [gameStatus, setGameStatus] = useState(false);
    const [gameEndType, setGameEndType] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(60);
    const { user } = useContext(UserContext);
    const [gameName] = useState("Snake");
    const images = [a, b, c, d];

  
    const saveGame = async () => {
        try {
          const response = await axios.post('http://localhost:5000/saveQuize', {
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
                saveGame();
            }
        };

        window.addEventListener("keydown", keyPress);

        return () => {
            window.removeEventListener("keydown", keyPress);
        };
    }, [gameStatus]);

    useEffect(() => {
        const fetchQuestions = async (level) => {
            try {
                const response = await fetch(`/QuizeQuestions_${level.trim().toLowerCase()}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const shuffledQuestions = shuffleArray(data.quiz); // Shuffle the questions
                setQuestions(shuffledQuestions);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchQuestions(difficulty);
    }, [difficulty]);

    useEffect(() => {
        let countdown;
        if (isRunning && !gameStatus && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isRunning) {
            setGameEndType('timeout');
            setGameStatus(true);
        }

        return () => clearInterval(countdown);
    }, [isRunning, timer, gameStatus]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
        setPopupVisible(false);
    };

    const handleAnswerClick = (givenAnswer) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (isRunning) {
            if (givenAnswer === currentQuestion.correct_answer) {
                setScore(score + 1);
                setTimer(60);
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    setGameEndType('completed');
                    setGameStatus(true);
                }
            } else {
                setGameEndType('wrong');
                setGameStatus(true);
            }
        }
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setScore(0);
        setTimer(60);
        setCurrentQuestionIndex(0);
        setIsRunning(false);
        setGameStatus(false);
    };

    return (
        <main className='QuizeGame-container'>
            <section className='Quize-header'>
                <section className='title'> <h3>Quize Game - {difficulty}</h3></section>
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
            <section className='Quize-body'>
                <section className='Quize-status'>
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
                <section className='Quize-content'>
                    {gameStatus ? (
                        <div className="winner-popup">
                            <h2>Game Over!</h2>
                            <h3>  {gameEndType === 'wrong' ? 'You selected a wrong answer.' : 'You completed the quiz!'}</h3>
                            <p>You finished the {difficulty} game with a score of {score}!</p>
                            <p>Click Enter to continue.</p>
                        </div>
                    ) : (
                        questions.length > 0 && (
                            <section className='quize-board'>
                                <section className='questions'>
                                    <p>{questions[currentQuestionIndex].question}</p>
                                </section>

                                <section className='answers'>
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`answer`}
                                            onClick={() => handleAnswerClick(option.charAt(0))}
                                        >
                                            <section>
                                                <span className='image'><img src={images[index]} alt="" /></span>
                                                <span className='answer'>{option}</span>
                                            </section>
                                        </div>
                                    ))}
                                </section>
                            </section>
                        )
                    )}
                </section>
            </section>
            <section className='Quize-end'>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </section>
        </main>
    );
}
