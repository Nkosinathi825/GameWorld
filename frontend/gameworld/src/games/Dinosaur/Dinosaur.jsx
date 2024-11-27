import React, { useRef, useEffect, useState, useContext } from "react";
import "./Dinosaur.scss";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";

export default function Dinosaur() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { user } = useContext(UserContext);
  const [gameName] = useState("Rolling");
  const [ballColor, setBallColor] = useState("red"); // Default color
  const colorArray=['blue','pink','orange','green']

  const canvasRef = useRef(null);

  // Save the game progress
  const saveGame = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/user/${user.id}/score`, {
        level: difficulty,
        score: score,
        gameName: gameName,
      });
      console.log('Game saved:', response.data);
    } catch (error) {
      console.error("Couldn't save your game:", error);
    }
  };

  // Handle key press to reset the game and save progress
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Prevent running the effect if canvas is not yet available
    }

    const context = canvas.getContext("2d");

    const width = 780;
    const height = 460;
    canvas.width = width;
    canvas.height = height;

    const player = {
      x: 0,
      y: 410,
      width: 50,
      height: 50,
    };

    let velocityX = -10; // Initial obstacle speed (moving left)
    
    let velocityY = 0;
    const gravity = 0.4;

    let isOnGround = true;
    const obstacles = [];
    const spawnInterval = 1500; // Time in ms between obstacle spawns

    // Function to detect collision between two rectangles
    function detectCollision(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    // Function to create a new obstacle
    const createObstacle = () => {
      const obstacle = {
        x: width,
        y: 360, // Ground level
        width: 50,
        height: 100,
      };
      obstacles.push(obstacle);
    };

    // Function to handle jump
    const handleJump = (e) => {
      if (gameOver || !isOnGround) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        velocityY = -10; // Jump strength
        isOnGround = false;
      }
    };

    // Animation loop
    const animate = () => {
      if (gameOver) return; // Stop the animation loop if the game is over

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update player position
      velocityY += gravity;
      player.y += velocityY;

      // Prevent the player from falling below the ground
      if (player.y >= 410) {
        player.y = 410;
        velocityY = 0;
        isOnGround = true;
      }
      if (player.x < 50) {
        player.x+= 0.2;
       
      }

      // Draw the player as a circle (ball)
      context.fillStyle = ballColor;
      context.beginPath();
      context.arc(
        player.x + player.width / 2, // x-coordinate (center of the circle)
        player.y + player.height / 2, // y-coordinate (center of the circle)
        player.width / 2, // radius
        0, // start angle
        Math.PI * 2 // end angle (full circle)
      );
      context.fill();

      // Update and draw obstacles
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.x += velocityX;

        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
          obstacles.splice(i, 1);
          i--;
          // Increase score when an obstacle is avoided
          continue;
        }

        // Draw the obstacle
        context.fillStyle = "yellow";
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Check for collision
        if (detectCollision(player, obstacle)) {
          setGameOver(true);

          return;
        }
      }

      // Call next frame
      requestAnimationFrame(animate);
    };

    // Start spawning obstacles
    const obstacleInterval = setInterval(createObstacle, spawnInterval);

    // Interval to increase obstacle speed every 3 seconds
    const gameInterval = setInterval(() => {
      if(isRunning){
        velocityX -= 1;  // Gradually decrease the speed (make it move faster)

      }
     
    }, 3000); // Increase the speed every 3 seconds
    const ScoreInterval = setInterval(() => {
      if(isRunning){
        setScore(prevScore => prevScore + 1);
      }
     
    }, 100); // Increase the speed every 3 seconds

    // Event listener for jumping
    window.addEventListener("keydown", handleJump);

    // Start animation
    if (isRunning) {
      animate();
    }

    // Cleanup on component unmount
    return () => {
      clearInterval(obstacleInterval);
      clearInterval(gameInterval);
      clearInterval(ScoreInterval);
      window.removeEventListener("keydown", handleJump);
    };
  }, [gameOver, isRunning]);
  useEffect(() => {
    if (score % 10 === 0 && score > 0) {
      const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      setBallColor(randomColor);
    }
  }, [score]);

  // Handle difficulty change in popup
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    setPopupVisible(!popupVisible);
  };

  const handleStart = () => {
    setIsRunning(true);
  };



  // Handle reset button click
  const handleReset = () => {
    setScore(0);
    setIsRunning(false);
    setGameOver(false);
  };

  const handlePause = () => setIsRunning(false);

  return (
    <main className="JumpGame">
      <section className="header">
        <section className="title">
          <h1>The Rolling Ball</h1>
        </section>
      </section>
      <section className="JumpBody">
        <section className="Jump-status">
          <p>Score</p>
          <span className="outer-circle">
            <span className="inner-circle">
              <span>{score}</span>
            </span>
          </span>
        </section>
        {gameOver ? (
          <div className="winner-popup">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <p>Press Enter to continue.</p>
          </div>
        ) : (
          <section className="JumpContent">
            <canvas ref={canvasRef} className="canvas" />
          </section>
        )}
      </section>
      <section className="Jump-end">
        <button onClick={handleStart}>Start</button>
        
      </section>
    </main>
  );
}
