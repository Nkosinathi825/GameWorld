import React, { useState, useEffect, useContext } from 'react';
import './MathGame.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function MathGame() {
    const [difficulty, setDifficulty] = useState('Easy');
    const [score, setScore] = useState(0);
    const [highscore, setHighScore] = useState(0);
    const [gameStatus, setGameStatus] = useState(false);
    const [gameEndType, setGameEndType] = useState('');
    const [isRunning, setIsRunning] = useState(false); // Tracks if the game has started
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [timer, setTimer] = useState(60);
    const [question, setQuestion] = useState('');
    const { user } = useContext(UserContext);
    const [gameName] = useState("Mathematics");
    const [answer, setAnswer] = useState('');
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [sign, setSign] = useState('');
    const [array, setArray] = useState([]);

    const saveGame = async () => {
        try {
            const response = await axios.post('http://localhost:5000/saveMath', {
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
        const advanceQuestions = (level) => {
            if (level === "Easy" || level === "Medium") {
                setArray(['+', '-']);
            } else if (level === "Hard") {
                setArray(['+', '-', '*']);
            } else if (level === "EvilHard") {
                setArray(['+', '-', '*', '/']);
            }
        };

        advanceQuestions(difficulty);
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

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
        handleReset();
        setPopupVisible(false);
    };

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const difficultyLevels = {
        Easy: { range: [1, 10], operators: ['+', '-'] },
        Medium: { range: [1, 20], operators: ['+', '-'] },
        Hard: { range: [1, 50], operators: ['+', '-', '*'] },
        EvilHard: { range: [1, 100], operators: ['+', '-', '*', '/'] },
    };
    
    const handleQuestions = () => {
        const { range, operators } = difficultyLevels[difficulty];
        const num1 = getRandomNumber(range[0], range[1]);
        const num2 = getRandomNumber(range[0], range[1]);
        const selectedSign = operators[getRandomNumber(0, operators.length - 1)];
    
      
        if (selectedSign === '/' && num2 === 0) {
            num2 = 1;
        }
    
        setQuestion(`${num1} ${selectedSign} ${num2}`);
        setNumber1(num1);
        setNumber2(num2);
        setSign(selectedSign);
    };
    

    const handleStart = () => {
        setIsRunning(true); // Start the game
        if (!question) {
            handleQuestions();
        }
    };

    const handlePause = () => setIsRunning(false);

    const handleReset = () => {
        setScore(0);
        setTimer(60);
        setIsRunning(false);
        setGameStatus(false);
        setAnswer('');
        setQuestion('');
    };

    const isCorrect = (userAnswer) => {
        let correctAnswer;
        switch (sign) {
            case '+':
                correctAnswer = number1 + number2;
                break;
            case '-':
                correctAnswer = number1 - number2;
                break;
            case '*':
                correctAnswer = number1 * number2;
                break;
            case '/':
                correctAnswer = number1 / number2;
                break;
            default:
                break;
        }
        if (parseInt(userAnswer) === correctAnswer) {
            setScore((prevScore) => prevScore + 1);
            handleQuestions(); // Get a new question after a correct answer
        } else {
            setGameEndType('wrong');
            setGameStatus(true);
        }
    };

    const handleAnswerSubmit = (e) => {
        if (e.key === 'Enter' && isRunning) { // Only allow submitting if game has started
            isCorrect(answer);
            setAnswer('');
            setTimer(60);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleAnswerSubmit);
        return () => {
            window.removeEventListener("keydown", handleAnswerSubmit);
        };
    }, [answer]);

    return (
        <main className='MathsGame-container'>
            <section className='Maths-header'>
                <section className='title'>
                    <h3>Mathematics Game - {difficulty}</h3>
                </section>
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
            <section className='Maths-body'>
                <section className='Maths-status'>
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
                <section className='Maths-content'>
                    {gameStatus ? (
                        <div className="winner-popup">
                            <h2>Game Over!</h2>
                            <h3>{gameEndType === 'wrong' ? 'You gave a wrong answer.' : 'You ran out of time.'}</h3>
                            <p>You finished the {difficulty} game with a score of {score}!</p>
                            <p>Click Enter to continue.</p>
                        </div>
                    ) : (
                        <section className='Maths-board'>
                            <section className='questions'>
                                {isRunning ? (
                                    <span>{question}</span> 
                                ) : (
                                    <span>Click Start to begin</span>
                                )}
                            </section>
                            <article className='answers'>
                                <input
                                    type="text"
                                    placeholder='Enter your Answer'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    disabled={!isRunning} 
                                />
                            </article>
                        </section>
                    )}
                </section>
            </section>
            <section className='Maths-end'>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause} disabled={!isRunning}>Pause</button> {/* Disable Pause unless game is running */}
                <button onClick={handleReset} disabled={!isRunning}>Reset</button> {/* Disable Reset unless game is running */}
            </section>
        </main>
    );
}
