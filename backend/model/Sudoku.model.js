const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: String,
        required: true,
    },
    timeOfCompletion: { 
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now, 
    },
    gameName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, 
});

const Game = mongoose.model('Sudoku', userSchema); 

module.exports = Game;
