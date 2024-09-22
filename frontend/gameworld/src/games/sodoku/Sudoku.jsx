import React, { useEffect, useState,useContext } from 'react';
import './Sudoku.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'; 
import { UserContext } from '../../context/UserProvider';


const Sudoku = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isWinnerPopupVisible, setWinnerPopupVisible] = useState(false);
  const [initialPuzzle, setInitialPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameName] = useState("Sudoku");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPuzzle = async (level) => {
      try {
        const response = await fetch(`/Sudokupazzels_${level.trim().toLowerCase()}.json`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const initialPuzzle = data.puzzle.map(row => 
          row.map(cell => ({
            value: cell,       
            isFixed: cell !== 0 
          }))
        );
        setPuzzle(initialPuzzle);
        setInitialPuzzle(initialPuzzle);
        setSolution(data.solution);
      } catch (error) {
        console.error('Failed to fetch puzzle:', error);
      }
    };

    fetchPuzzle(difficulty);
  }, [difficulty]);

  const validateInput = (rowIndex, colIndex, value) => {
    const correctValue = solution[rowIndex][colIndex];

    if (value === parseInt(correctValue, 10)) {
      return 'correct'; 
    } else if (value !== 0) {
      return 'incorrect'; 
    }
    return ''; // Return empty string for no input
  };
  
  const handleChange = (rowIndex, colIndex, event) => {
    const value = event.target.value;

    if (value === '' || /^[1-9]$/.test(value)) {
      const newPuzzle = puzzle.map((row, rIdx) => 
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            const validatedValue = value ? parseInt(value, 10) : 0;
            const validatedState = validateInput(rIdx, cIdx, validatedValue);
            return { ...cell, value: validatedValue, state: validatedState }; // Update state
          }
          return cell;
        })
      );
      setPuzzle(newPuzzle);
    }
  };

  const checkCompletion = () => {
    return puzzle.every((row, rIndex) =>
      row.every((cell, cIndex) => cell.value === solution[rIndex][cIndex])
    );
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level); // Set new difficulty
    setPopupVisible(false); // Close the popup
  };
  const saveGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/saveGame', {
        user_id: user.id,
        level: difficulty,
        timeOfCompletion: formatTime(),
        gameName: gameName,
      });
      console.log('Game saved:', response.data);
    } catch (error) {
      console.error("Couldn't save your game:", error);
    }
  };
  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        if (checkCompletion()) {
          setWinnerPopupVisible(true);
          saveGame(); 
          setIsRunning(false);
        }
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setPuzzle(initialPuzzle); 
    setIsRunning(false);      
    setTimer(0);              
  };

  const handleClosePopup = () => {
    setWinnerPopupVisible(false);
    handleReset(); // Optionally reset the game
  };

  return (
    <main className='Sudoku-container'>
      <section className='Sudoku-header'>
        <section className='title'> <h3>Sudoku Puzzle - {difficulty}</h3></section>
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
      <section className='Sudoku-body'>
        <section className='Sudoku-timer'>
          <span className='outer-circle'>
            <span className='inner-circle'>
              <span>{formatTime()}</span>
            </span>
          </span>
          <section className='Sudoku-key'>
            <ul>
              <li><p>Correct </p><span className='correct'></span></li>
              <li><p>Incorrect </p><span className='wrong'></span></li>
            </ul>
          </section>
        </section>
        <section className='Sudoku-content'>
          <section className='Sudoku-grid'>
            <table>
              <tbody>
                {
                  puzzle.map((row, rIndex) => (
                    <tr key={rIndex} className={(rIndex + 1) % 3 === 0 ? 'rowBorder' : ''}>
                      {
                        row.map((cell, cIndex) => (
                          <td key={`${rIndex}-${cIndex}`} className={(cIndex + 1) % 3 === 0 ? 'colBorder' : ''}>
                            <input
                              type="text"
                              value={cell.value === 0 ? '' : cell.value}
                              className={`sudoku-input ${cell.state || ''}`} 
                              onChange={(event) => handleChange(rIndex, cIndex, event)}
                              disabled={cell.isFixed || !isRunning}
                            />
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        </section>
      </section>
      <section className='Sudoku-end'>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </section>

      {isWinnerPopupVisible && (
        <div className="winner-popup">
          <h2>Congratulations!</h2>
          <p>You completed the {difficulty} puzzle in {formatTime()}!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </main>
  );
};

export default Sudoku;
