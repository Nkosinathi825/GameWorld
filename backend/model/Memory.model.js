const mongoose = require('mongoose');

const MemoryGameSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    time: {
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

const Memory = mongoose.models.Memory|| mongoose.model('Memory',  MemoryGameSchema);

module.exports = Memory;
