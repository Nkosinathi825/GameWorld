const mongoose = require('mongoose');

const RollingGameSchema = new mongoose.Schema({
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

const  Rolling = mongoose.models.Rolling|| mongoose.model('Rolling', RollingGameSchema);

module.exports =Rolling;
