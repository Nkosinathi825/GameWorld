const mongoose = require('mongoose');

const MathGameSchema = new mongoose.Schema({
    user_id: {
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
    },
    gameName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Math = mongoose.models.Math|| mongoose.model('Math',  MathGameSchema);

module.exports = Math;
