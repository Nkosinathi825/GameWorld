const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user= require('./model/User.model')
const Sudoku =require('./model/Sudoku.model')
const Snake =require('./model/Snake.model')
const Quiz=require('./model/Quiz.model')
const Math=require('./model/Math.model')
const Mole=require('./model/Mole.model')
const Memory=require('./model/Memory.model')
const Spelling=require('./model/Spelling.model')
const Rolling = require('./model/Rolling.model')
const {User} = require('./model/Games.model')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


dotenv.config();

const app = express(); 

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,PUT',
    credentials: true, 
}));
app.use(express.json());



app.get('/', (req, res) => {
    res.json("Hey, the port is listening");
});




app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists' });
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new user({ name, email, password: hashPassword });
        await newUser.save(); 

        res.status(201).send('User registered successfully');
    } catch (error) {

        res.status(500).send('Error registering user'); 
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Wrong email address' });
        }
        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
});
app.post('/saveGame', async (req, res) => {
    try {
        const {user_id,level, timeOfCompletion , date = new Date(),gameName}= req.body

        const existingGame = await Sudoku.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.timeOfCompletion < timeOfCompletion) {
                existingGame.timeOfCompletion =timeOfCompletion; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: 'no update made.' });
            }
        }

        const newGame = new Sudoku({ 
            user_id,
            level,
            timeOfCompletion,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});
app.post('/saveSnake', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Snake.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Snake({
            user_id,
            level,
            score,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});
app.post('/saveQuiz', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Quiz.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Quiz({
            user_id,
            level,
            score,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});

app.post('/saveMath', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Math.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Math({
            user_id,
            level,
            score,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});

app.post('/saveMole', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Mole.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Mole({
            user_id,
            level,
            score,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});
app.post('/saveMemory', async (req, res) => {
    try {
        const { user_id, level, time, date = new Date(), gameName } = req.body;
        

        const existingGame = await Memory.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.time > time) {
                existingGame.time = time; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Memory({
            user_id,
            level,
            time,
            date,
            gameName,
        });

        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});
app.post('/saveSpelling', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Spelling.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Mole({
            user_id,
            level,
            score,
            date,
            gameName,
        });
        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});
app.post('/saveRolling', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
        

        const existingGame = await Rolling.findOne({ user_id, level });

        if (existingGame) {

            if (existingGame.score < score) {
                existingGame.score = score; 
                existingGame.date = date; 
                await existingGame.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: ' no update made.' });
            }
        }

        const newGame = new Rolling({
            user_id,
            level,
            score,
            date,
            gameName,
        });
        await newGame.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: newGame._id });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});

app.post('/Games', async (req, res) => {
    try {
        const { user_id, level, score, date = new Date(), gameName } = req.body;
    
        // Find the user document based on user_id
        const user = await User.findOne({ user_id });
    
        if (!user) {
            // If the user doesn't exist, create a new user document
            const newUser = new User({
                user_id,
                games: [{
                    gameName,
                    level,
                    score,
                    date,
                }]
            });
            await newUser.save();
            return res.status(201).json({ message: 'User and game saved successfully!', userId: newUser._id });
        }
    
        // Check if the game already exists in the user's 'games' array
        const existingGame = user.games.find(game => game.gameName === gameName && game.level === level);
    
        if (existingGame) {
            // If game exists, update it only if the new score is higher
            if (existingGame.score < score) {
                existingGame.score = score;
                existingGame.date = date;
                await user.save();
                return res.status(200).json({ message: 'Game score updated successfully!', gameId: existingGame._id });
            } else {
                return res.status(200).json({ message: 'No update made, current score is higher or equal.' });
            }
        }
    
        // If the game doesn't exist, add it to the user's 'games' array
        user.games.push({ gameName, level, score, date });
        await user.save();
        res.status(201).json({ message: 'Game saved successfully!', gameId: user._id });
    
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
});


async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongoose connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


startServer();
