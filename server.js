const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const dbTools = require('./db/database');
const notesDatabase = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// // Returns one note object by type
// app.get('/api/note/:noteThing', (req, res) => {
//     const noteData = dbTools.getData();
//     const noteThing = req.params.noteThing;
//     const obj = noteData.find(noteObj => noteObj.type === noteThing);

//     if (obj) {
//         return res.json(obj);
//     }

//     res.json({
//         message: 'Type of that name was not found.'
//     });

// });

// Returns all note data
app.get('/api/notes', (req, res) => {
    // console.log('here');
    // const noteData = dbTools.getData();
    // res.json(noteData);
    // res.status(200).json(notesDatabase)
    res.sendFile(path.join(__dirname, 'db/db.json'))
});

app.post('/api/notes', (req, res) => {
    const noteData = dbTools.getData();
    const newNote = {
        id: uuidv4(),
        ...req.body,
    };
    noteData.push(newNote);
    dbTools.writeData(noteData);
    res.json({
        message: 'DB updated successfully!',
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const noteToDelete = notesDatabase.findIndex((note) => note.id === id)

    if (noteToDelete === -1) {
        return res.status(500).json('note not found')
    }
    notesDatabase.splice(noteToDelete, 1)
    fs.writeFile('./db/db.json', JSON.stringify(notesDatabase), (err) => err ? console.error(err) : console.log('note deteled'))
    res.status(200).json('note deleted')
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => console.log('Server started on port 3000'));