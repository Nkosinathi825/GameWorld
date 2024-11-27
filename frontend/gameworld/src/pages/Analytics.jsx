import React, { useEffect, useState, useContext } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2'; // Add Pie here
import axios from 'axios';
import './Analytics.scss';
import { UserContext } from "../context/UserProvider";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin for displaying labels inside the Pie chart

// Register Chart.js elements and plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const Analytics = ({ userId }) => {
  const [chartData, setChartData] = useState(null);
  const { user } = useContext(UserContext);
  const [scores, setScores] = useState([]);
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${user.id}/logins/daily`);
        const data = response.data;

        if (data.length > 0) {
          const labels = data.map(item => `Day ${item._id}`);
          const counts = data.map(item => item.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Logins Per Day',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
            ],
          });
        } else {
          setChartData(null); // If no login data, set to null
        }
      } catch (error) {
        console.error('Error fetching login data:', error);
        setChartData(null); // Handle error by setting data to null
      }
    };

    fetchLoginData();
  }, [user.id]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${user.id}/scores`);
        console.log(response);

        if (response.data.scores.length > 0) {
          // Format the scores to include the necessary data for the chart
          const formattedScores = response.data.scores.map((game, index) => ({
            id: index + 1,
            gameName: game.gameName,
            gamesPlayed: game.gamesPlayed, // This is the number of times the game was played
          }));
          setScores(formattedScores);
        } else {
          setScores([]); // If no scores data, set as an empty array
        }
      } catch (err) {
        console.error('Error fetching scores:', err);
        setScores([]); // Handle error by setting scores to empty array
      }
    };

    fetchScores();
  }, [user.id]);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Return a random rgba color with alpha 0.5 for transparency
  };

  const barchartData = {
    labels: scores.map((game) => game.gameName), // Use gameName as labels
    datasets: [
      {
        label: 'Games Played',
        data: scores.map((game) => game.gamesPlayed), // Use gamesPlayed as data for each bar
        borderColor: scores.map(() => generateRandomColor()), // Generate random border colors for each bar
        backgroundColor: scores.map(() => generateRandomColor()), // Generate random background colors for each bar
        borderWidth: 1,
      },
    ],
  };

  const chartDataPie = {
    labels: scores.map((game) => game.gameName),
    datasets: [
      {
        data: scores.map((game) => game.gamesPlayed),
        backgroundColor: scores.map(() => generateRandomColor()), // Random colors for each slice
      },
    ],
  };

  const chartOptionsPie = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      datalabels: {
        color: 'white', // Label color
        font: {
          weight: 'bold',
          size: 12, // Adjust the size as needed
        },
        formatter: (value, context) => {
          const gameName = context.chart.data.labels[context.dataIndex]; // Get game name
          return gameName; // Display game name inside the slice
        },
        anchor: 'center', // Place the label at the center of the slice
        align: 'center', // Center the label
      },
    },
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Games',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Times Played',
        },
        beginAtZero: true, // Ensures the y-axis starts at 0
      },
    },
  };

  // Check if scores or chartData are empty and display appropriate message
  if (!scores.length && !chartData) {
    return <div>No data available for login or scores.</div>;
  }



  return (
    <main className='AnalyticsContanier'>
      {!scores.length ? (
        <>
        <section className="games-header">
          <h3>Analysis</h3>
            </section>
            <section className='body'>
                <div>
            <h3>No games data available.</h3>
            <p>No game scores have been recorded yet.</p>
        </div>
            </section>
        </>
      ) : (
        <>
          <section className="games-header">
            <h3>Analysis</h3>
          </section>
          <section className='body'>
            <section className='upperpart'>
              <section className='text'>
                <span className='text1'>View Your Analytics</span>
                <span className='text2'>These are all your previous records</span>
              </section>
            </section>
            <section className='lowerpart'>
              <section className='uppergraphs'>
                <section className='line'>
                  <h3>Your Login Activity</h3>
                  <Line
                    data={chartData}
                    width={null} // Responsive width
                    height={100} // Custom height
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </section>
              </section>
              <section className='games'>
                <section className='bar'>
                  <h3>Games Played Bar Chart</h3>
                  <Bar data={barchartData} options={chartOptions} />
                </section>
                <section className='pie'>
                  <h4>Games Played Pie Chart</h4>
                  <Pie data={chartDataPie} options={chartOptionsPie} />
                </section>
              </section>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default Analytics;
