const mongoose = require('mongoose'); // Import mongoose

const loginActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventType: { type: String, enum: ['login', 'logout'], required: true }, // Whether it's a login or logout event
    timestamp: { type: Date, default: Date.now }, // The time when the event occurred
});

const LoginActivity = mongoose.model('LoginActivity', loginActivitySchema);

module.exports = LoginActivity; // Export the model so it can be used elsewhere
