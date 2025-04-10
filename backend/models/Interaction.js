const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    reponse: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Interaction", interactionSchema);
