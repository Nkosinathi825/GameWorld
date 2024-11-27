import React, { useEffect, useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './History.scss';
import { UserContext } from "../context/UserProvider";
import axios from "axios";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'gameName', headerName: 'Game name', width: 130 },
  { field: 'level', headerName: 'Level', width: 130 },
  {
    field: 'number',
    headerName: 'Number of Game',
    type: 'number',
    width: 130,
  },
  {
    field: 'Score',
    headerName: 'Score',
    width: 160,
  },
];

export default function History() {
  const [scores, setScores] = useState([]); 
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${user.id}/scores`);
        console.log(response)
        const formattedScores = response.data.scores.map((game, index) => ({
          id: index + 1,
          gameName: game.gameName,
          level: game.level,
          number: game.gamesPlayed, 
          Score: game.score,
        }));
        setScores(formattedScores);
      } catch (err) {
        setError('Error fetching scores');
        console.error(err);
      }
    };

    fetchScores();
  }, [user.id]);

  return (
    <main className='History'>
      <section className="history-header">
        <h3>Your History</h3>
      </section>
      <section className='body'>
        <section className='upperpart'>
          <section className='text'>
            <span className='text1'>View Your History</span>
            <span className='text2'>These are all your previous records</span>
          </section>
          <span className='btn'><button className='btn1'>Download</button></span>
        </section>
        <section className='lowerpart'>
          <Paper sx={{ height: "85%", width: '98%' ,border:'1px solid silver' }}>
            <DataGrid
              rows={scores} 
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10, 15]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </section>
      </section>
    </main>
  );
}
