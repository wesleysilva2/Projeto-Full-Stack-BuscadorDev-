const mongoose = require('mongoose');

const PointOnMapSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates:{
        type: [Number],
        required: true,
    },
});

module.exports = PointOnMapSchema;