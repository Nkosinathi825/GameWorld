import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './History.scss'


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'gameName', headerName: 'Game name', width: 130 },
    { field: 'lastVisit', headerName: 'Last visit', width: 130 },
    {
      field: 'number',
      headerName: 'Number of Game',
      type: 'number',
      width: 130,
    },
    {
      field: 'fullName',
      headerName: 'Score/Time',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  const rows = [
    { id: 1, lastVisit: 'Snow', gameName: 'Jon', number: 35 },
    { id: 2, lastVisit: 'Lannister', gameName: 'Cersei', number: 42 },
    { id: 3, lastVisit: 'Lannister', gameName: 'Jaime', number: 45 },
    { id: 4, lastVisit: 'Stark', gameName: 'Arya', number: 16 },
    { id: 5, lastVisit: 'Targaryen', gameName: 'Daenerys', number: null },
    { id: 6, lastVisit: 'Melisandre', gameName: null, number: 150 },
    { id: 7, lastVisit: 'Clifford', gameName: 'Ferrara', number: 44 },
    { id: 8, lastVisit: 'Frances', gameName: 'Rossini', number: 36 },
    { id: 9, lastVisit: 'Roxie', gameName: 'Harvey', number: 65 },
  ];
  

  const paginationModel = { page: 0, pageSize: 5 };

export default function History() {
  return (
    <main className='History'>
        <section className="history-header">
            <h3>Your History</h3>
        </section>
        <section className='body'>
            <section className='upperpart'>
                <section className='text'>
                    <span className='text1'>View Your History</span>
                    <span className='text2'>This are all your previous records</span>
                </section>
                <span className='btn'><button className='btn1'>Download</button></span>
            </section>
            <section className='lowerpart'>
            <Paper sx={{ height: "85%", width: '98%' ,border:'1px solid silver' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
            </section>
        </section>
    </main>
  )
}
