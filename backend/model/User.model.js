const mongoose = require('mongoose');
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
    gamesPlayed: {
      type: Number,
      default: 1, // Initialize the count to 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    timestamps: true, // to automatically add createdAt and updatedAt fields
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
    },
    games: [GameSchema]
}, {
    timestamps: true, 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
