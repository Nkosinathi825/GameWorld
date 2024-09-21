import React, { useEffect, useState } from 'react';
import './Sudoku.scss'

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState([]);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await fetch('/Sudokupazzels.json'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPuzzle(data.puzzle);
      } catch (error) {
        console.error('Failed to fetch puzzle:', error);
      }
    };

    fetchPuzzle();
  }, []);

  const handleChange = (rowIndex, colIndex, event) => {
    const newPuzzle = [...puzzle];
    const value = event.target.value;


    if (value === '' || /^[1-9]$/.test(value)) {
      newPuzzle[rowIndex][colIndex] = value ? parseInt(value, 10) : 0;
      setPuzzle(newPuzzle);
    }
  };

  return (
    <div>
      <h1>Sudoku Puzzle</h1>
      <table className="sudoku-table">
        <tbody>
          {puzzle.map((row, rowIndex) => (
            <tr key={rowIndex} className="sudoku-row">
              {row.map((num, colIndex) => (
                <td key={colIndex} className="sudoku-cell">
                  {num === 0 ? (
                    <input 
                      type="text" 
                      maxLength="1" 
                      onChange={(event) => handleChange(rowIndex, colIndex, event)} 
                      placeholder=" " // Placeholder for empty cells
                    />
                  ) : (
                    num
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sudoku;
