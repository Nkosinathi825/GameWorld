const mongoose = require('mongoose');

// Define the Game schema (each game object will be stored in the user's "games" array)
const GameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    score: {
        type: Number, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    timestamps: true, // to automatically add createdAt and updatedAt fields
});

// Define the User schema that contains an array of games
const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true // Ensure each user has a unique ID
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    games: [GameSchema]  // Array of game objects
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt
});


// Define the models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

module.exports = { User, Game };
