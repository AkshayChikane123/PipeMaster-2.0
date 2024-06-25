// const mongoose = require('mongoose');
// const User = require('./user');

// const estimationInputSchema = new mongoose.Schema({
//     siteName: String,
//     lineCounts: Number,
//     totalExpectedPID: Number,
//     sumOfBendsTeesReducers: Number,
//     totalEquipments: Number,
//     totalValves: Number,
//     totalLineSegments: Number,
    
//     pipeSupport: {
//         type: String,
//         required: true,
//     },

  
//     // Add the createdBy field to reference the User model
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
// }, {
//     timestamps: true
// });

// const EstimationInput = mongoose.model('EstimationInput', estimationInputSchema);
// module.exports = EstimationInput;