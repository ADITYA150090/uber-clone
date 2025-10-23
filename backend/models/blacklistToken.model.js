const mongoose = require('mongoose');

// Schema for blacklisted JWT tokens
const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Avoid storing the same token twice
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24, // TTL index — 24 hours (in seconds)
    },
});

// This ensures MongoDB automatically deletes documents after 24 hours
// using the `createdAt` field + TTL index

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;