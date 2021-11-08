const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true,
        unique: true,
    },
    desc:{
        type: String, 
    },
    img:{
        type: String, 
    },
    url:{
        type: String, 
    },
    cat:{
        type: String, 
    }
});

module.exports = mongoose.model("Project", ProjectSchema);