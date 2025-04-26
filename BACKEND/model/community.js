const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        
    },
    room: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
}, {
    timestamps: true 
});

module.exports = mongoose.model("Community", communitySchema);
