const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports.Note = Note;
module.exports.noteSchema = noteSchema;