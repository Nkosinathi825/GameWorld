const mongoose = require('mongoose');

const snakeGameSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    score: {
        type: Number, // Change to Number if score is a numeric value
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

const Snake = mongoose.models.Snake || mongoose.model('Snake', snakeGameSchema);

module.exports = Snake;
