import React, { useEffect, useRef, useState } from 'react';

export default function TheSnakeGame({ score, setScore, gameStatus, difficulty, isPaused }) {
    const canvasRef = useRef();

    // Set base speed values for different difficulties
    const difficultySettings = {
        Easy: { speed: 10, obstacles: 2 },
        Medium: {  speed: 10, obstacles: 4 },
        Hard: {  speed: 10,obstacles: 6 },
        EvilHard: { speed: 10, obstacles: 10 }
    };

    const Snake_speed = difficultySettings[difficulty].speed;
    const obstacleCount = difficultySettings[difficulty].obstacles;

    const [food, setApple] = useState({ x: 180, y: 100 });
    const [Snake, setSnake] = useState([
        { x: 100, y: 50 },
        { x: 95, y: 50 }
    ]);
    const [direction, setDirection] = useState(null);
    const [obstacles, setObstacles] = useState([]);

    // Generate random obstacles based on difficulty level
    useEffect(() => {
        const canvas = canvasRef.current;
        const newObstacles = [];
        for (let i = 0; i < obstacleCount; i++) {
            newObstacles.push({
                x: Math.floor(Math.random() * (canvas.width / Snake_speed)) * Snake_speed,
                y: Math.floor(Math.random() * (canvas.height / Snake_speed)) * Snake_speed
            });
        }
        setObstacles(newObstacles);
    }, [difficulty, Snake_speed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function drawSnake() {
            Snake.forEach((SnakePart) => {
                ctx.beginPath();
                ctx.rect(SnakePart.x, SnakePart.y, 14, 14);
                ctx.fillStyle = '#90EE90';
                ctx.fill();
                ctx.closePath();
            });
        }

        function drawApple() {
            ctx.beginPath();
        
            ctx.arc(food.x + 7, food.y + 7, 7, 0, Math.PI * 2); 
            ctx.fillStyle = '#ff0000'; 
            ctx.fill();
            ctx.closePath();
        }
        

        function drawObstacles() {
            obstacles.forEach((obstacle) => {
                ctx.beginPath();
                ctx.rect(obstacle.x, obstacle.y, 14, 14);
                ctx.fillStyle = 'black'; // Dark red color for obstacles
                ctx.fill();
                ctx.closePath();
            });
        }

        function moveSnake() {
            if (direction) {
                setSnake((prevSnake) => {
                    const newSnake = [...prevSnake];
                    const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

                    for (let i = newSnake.length - 1; i > 0; i--) {
                        newSnake[i].x = newSnake[i - 1].x;
                        newSnake[i].y = newSnake[i - 1].y;
                    }

                    switch (direction) {
                        case "right":
                            snakeHead.x += Snake_speed;
                            break;
                        case "left":
                            snakeHead.x -= Snake_speed;
                            break;
                        case "up":
                            snakeHead.y -= Snake_speed;
                            break;
                        case "down":
                            snakeHead.y += Snake_speed;
                            break;
                        default:
                            break;
                    }

                    newSnake[0] = snakeHead;

                    handleEatingFood(newSnake);
                    handleBoarderCollision(snakeHead);
                    handleBodyCollision(newSnake);
                    handleObstacleCollision(snakeHead);

                    return newSnake;
                });
            }
        }

        function handleEatingFood(newSnake) {
            const snakeHead = newSnake[0];
            if (snakeHead.x === food.x && snakeHead.y === food.y) {
                setScore(prevScore => prevScore + 1);
                setApple({
                    x: Math.floor(Math.random() * (canvas.width / Snake_speed)) * Snake_speed,
                    y: Math.floor(Math.random() * (canvas.height / Snake_speed)) * Snake_speed
                });

                newSnake.push({
                    x: newSnake[newSnake.length - 1].x,
                    y: newSnake[newSnake.length - 1].y
                });
            }
        }

        function handleBoarderCollision(snakeHead) {
            if (snakeHead.x < 0 || snakeHead.x >= canvas.width || snakeHead.y < 0 || snakeHead.y >= canvas.height) {
                gameStatus("wall");
            }
        }

        function handleBodyCollision(newSnake) {
            const snakeHead = newSnake[0];
            for (let i = 1; i < newSnake.length; i++) {
                if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
                    gameStatus("self");
                }
            }
        }

        function handleObstacleCollision(snakeHead) {
            obstacles.forEach((obstacle) => {
                if (snakeHead.x === obstacle.x && snakeHead.y === obstacle.y) {
                    gameStatus("obstacle");
                }
            });
        }

        const interval = setInterval(() => {
            if (!isPaused) { 
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawSnake();
                drawApple();
                drawObstacles();
                moveSnake();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [Snake, direction, food, obstacles, Snake_speed]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp" && direction !== "down") setDirection("up");
            if (e.key === "ArrowDown" && direction !== "up") setDirection("down");
            if (e.key === "ArrowLeft" && direction !== "right") setDirection("left");
            if (e.key === "ArrowRight" && direction !== "left") setDirection("right");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    return (
        <div className='snake-board'>
        <canvas className='gameboard' ref={canvasRef}  width={750} height={500}/>
        </div>
    )
}