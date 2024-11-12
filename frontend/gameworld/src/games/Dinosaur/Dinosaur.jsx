import React, { useRef, useEffect, useState, useContext } from "react";
import "./Dinosaur.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../context/UserProvider";
import axios from "axios";

export default function Dinosaur() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [items, setItems] = useState([]);
  const [timer, setTimer] = useState(120);
  const [gameEndType, setGameEndType] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [prev, setPrev] = useState(-1);
  const [matchedPairs, setMatchedPairs] = useState(0); // Track matched pairs
  const { user } = useContext(UserContext);
  const [gameName] = useState("Jump");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const width = 780;
    const height = 460;
    canvas.width = width;
    canvas.height = height;

    const obtacleWidth = 50;
    const obtacleHeight = 100;
    const obtacleSpeed = 10;

    const circlex = 50;
    let circley = 430;
    const circleradius = 30;
    let isJumping = false;
    let jumpVelocity = 0;
    const gravity = 0.4;
    const jumpStrength = -10;

    // Initialize two obstacles with independent X and Y positions
    let obstacle1 = { x: width, y: 390 };
    // let obstacle2 = {
    //   x: width + 400,
    //   y: Math.random() * (height - obtacleHeight),
    // };

    const handleKeyDown = (event) => {
      if (event.code === "ArrowUp" && !isJumping) {
        isJumping = true;
        jumpVelocity = jumpStrength;
      }
    };

  
  const detectCollision = (obstacle) => {
    // Circle's center coordinates
    const circleCenterX = circlex;
    const circleCenterY = circley;

    // Closest point on the rectangle to the circle center
    const closestX = Math.max(
      obstacle.x,
      Math.min(circleCenterX, obstacle.x + obtacleWidth)
    );
    const closestY = Math.max(
      obstacle.y,
      Math.min(circleCenterY, obstacle.y + obtacleHeight)
    );

    // Calculate the distance from the circle's center to the closest point on the obstacle
    const distanceX = circleCenterX - closestX;
    const distanceY = circleCenterY - closestY;

    // Calculate the squared distance from the circle to the closest point
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // Check if the circle's radius is big enough to overlap the obstacle
    const isColliding = distanceSquared <= circleradius * circleradius;

    // We need to check if the player is really above the obstacle (during the jump)
    // If the player is jumping over the obstacle, no collision should occur.
    if (circley + circleradius < obstacle.y) {
      return false; // The player is above the obstacle, so no collision.
    }

    // Return the collision status
    return isColliding;
  };


    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update first obstacle
      context.fillStyle = "yellow";
      context.fillRect(obstacle1.x, obstacle1.y, obtacleWidth, obtacleHeight);
      obstacle1.x -= obtacleSpeed;

    //   // Draw and update second obstacle
    //   context.fillRect(obstacle2.x, obstacle2.y, obtacleWidth, obtacleHeight);
    //   obstacle2.x -= obtacleSpeed;

      // Reset first obstacle if it moves off-screen and randomize its Y position
      if (obstacle1.x < -obtacleWidth) {
        obstacle1.x = 780; // Randomize re-entry
        obstacle1.y = 390;
      }

      // Reset second obstacle if it moves off-screen and randomize its Y position
    //   if (obstacle2.x < -obtacleWidth) {
    //     obstacle2.x = 780; // Randomize re-entry
    //     obstacle2.y = Math.random() * (230 - obtacleHeight);
    //   }

      // Draw player (circle)
      context.beginPath();
      context.arc(circlex, circley, circleradius, 0, Math.PI * 2);
      context.fillStyle = "red";
      context.fill();

      if (isJumping) {
        circley += jumpVelocity;
        jumpVelocity += gravity;

        if (circley >= 430) {
          circley = 430;
          isJumping = false;
        }
      }

      // Check for collisions with both obstacles
      if (detectCollision(obstacle1) ) {
        setGameOver(true);
        setGameEndType("collision");
        setIsRunning(false);
        return;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("keydown", handleKeyDown);

    animate();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    setPopupVisible(!popupVisible);
  };

  const handleStart = () => {
    setIsRunning(true);
    setMatchedPairs(0); // Reset matched pairs count on start
  };

  // Handle reset button click
  const handleReset = () => {
    setScore(0);
    setIsRunning(false);
    setMatchedPairs(0); // Reset matched pairs count on reset
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
            <h3>
              {gameEndType === "timeOut"
                ? "You ran out of time"
                : "You completed the game!"}
            </h3>
            <p>
              You finished the {difficulty} game with a score of {score}!
            </p>
            <p>Click Enter to continue.</p>
          </div>
        ) : (
          <section className="JumpContent">
            <canvas ref={canvasRef} className="canvas" />
          </section>
        )}
      </section>
      <section className="Jump-end">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset} disabled={!isRunning}>
          Reset
        </button>
      </section>
    </main>
  );
}
