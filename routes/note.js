const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Note} = require('../models/note');

router.get('/', passport.authenticate('jwt', {session:false}),async(req,res)=>{
    console.log(req.user.notes);
    res.json({success: true, msg: `Hello ${req.user.name}, this is your profile.`});
});


router.post('/create', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    let note = req.note;

    let createdNote = new Note({
        title: note.title,
        body: note.body,
        date: note.date 
    });

    await createdNote.save();

    res.send(createdNote);
});

router.put('/update', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    let note = req.note;

    let updatedNote = await Note.updateOne({_id: note._id}, {
        title: note.title,
        body: note.body,
        date: note.date 
    });

    res.send(updatedNote);
});

router.delete('/delete', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    let noteId = req.noteId;

    let deletedNote = await Note.deleteOne({_id: noteId});

    res.send(deletedNote); 
});
module.exports = router;