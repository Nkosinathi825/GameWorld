const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User= require('./model/User.model')
const LoginActivity=require('./model/LoginActivity.model')
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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists' });
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save(); 

        res.status(201).send('User registered successfully');
    } catch (error) {

        res.status(500).send('Error registering user'); 
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Wrong email address' });
        }
        
        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save login event in LoginActivity collection
        const loginEvent = new LoginActivity({
            userId: existingUser._id,  // Correcting to use existingUser._id
            eventType: 'login',
        });
        await loginEvent.save();

        // Respond with the user data and token
        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
});

// The app.post endpoint for saving user score
app.post('/user/:user_id/score', async (req, res) => {
    const { user_id } = req.params;
    const { level, score, gameName, date = new Date() } = req.body;
  
    try {
      // Find the user document by ID
      const user = await User.findById(user_id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the game already exists in the user's 'games' array
      const existingGame = user.games.find(game => game.gameName === gameName && game.level === level);
  
      if (existingGame) {
        // If game exists, update the score only if the new score is higher
        if (existingGame.score < score) {
          existingGame.score = score;
          existingGame.date = date;
        }
        // Increment the gamesPlayed counter for the specific game
        existingGame.gamesPlayed += 1;
        await user.save();
        return res.status(200).json({ message: 'Game score updated and play count incremented successfully!', gameId: existingGame._id });
      } else {
        // If the game doesn't exist, add it to the user's 'games' array
        user.games.push({ gameName, level, score, date, gamesPlayed: 1 }); // Initialize gamesPlayed as 1
        await user.save();
        return res.status(201).json({ message: 'Game saved successfully and play count initialized to 1' });
      }
  
    } catch (error) {
      console.error('Error saving game:', error);
      res.status(500).json({ message: 'Failed to save game', error: error.message });
    }
  });
  
app.get('/user/:user_id/scores', async (req, res) => {

    const { user_id } = req.params;

  try {
    const userObjectId = new mongoose.Types.ObjectId(user_id);


    const user = await User.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Scores retrieved successfully', scores: user.games });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving scores', error: err.message });
  }
});
app.get('/user/:user_id/logins/daily', async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const loginData = await LoginActivity.aggregate([
        { 
          $match: { 
            userId: new mongoose.Types.ObjectId(user_id), 
            eventType: 'login' 
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, // Group by formatted date
            count: { $sum: 1 }, // Count the number of logins per day
          }
        },
        { 
          $sort: { _id: 1 } // Sort by date
        }
      ]);
  
      res.status(200).json(loginData);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching login data', error: err.message });
    }
  });
  
  app.get('/user/:user_id/logins/monthly', async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const loginData = await LoginActivity.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(user_id), eventType: 'login' } }, // Match only login events
        { 
          $group: {
            _id: { $month: "$timestamp" }, // Group by month
            count: { $sum: 1 }, // Count the number of logins per month
          }
        },
        { $sort: { _id: 1 } }, // Sort by month
      ]);
  
      res.status(200).json(loginData);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching login data', error: err.message });
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
