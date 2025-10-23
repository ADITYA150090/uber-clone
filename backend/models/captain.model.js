const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minHeight: [3, '    First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minHeight: [3, '    Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, '    Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minHeight: [6, '    Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'on-duty'],
        default: 'unavailable',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            enum: ['bike', 'car', 'van', 'truck'],
            required: true,
        },
        location: {
            lat: {
                type: Number,
            },
            length: {
                type: Number,
            }
        }
    },
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
}

captainSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


const captainModel = mongoose.model('Captain', captainSchema);


module.exports = captainModel;