const express = require('express');
const devTools = require('./Develop');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'))
app.use(express.json());

// Returns one note object by type
app.get('/api/note/:noteThing', (clientRequestObj, serverResponseObj) => {
    const noteData = dbTools.getData();
    const noteThing = clientRequestObj.params.noteThing;
    const obj = noteData.find(noteObj => noteObj.type === noteThing);

    if (obj) {
        return serverResponseObj.json(obj);
    }

    serverResponseObj.json({
        message: 'Type of that name was not found.'
    });

});

// Returns all note data
app.get('/api/note', (clientRequestObj, serverResponseObj) => {
    const noteData = dbTools.getData();
    serverResponseObj.json(noteData);
});

app.post('/api/note', (clientRequestObj, serverResponseObj) => {
    const noteData = dbTools.getData();

    noteData.push(clientRequestObj.body);
    dbTools.writeData(noteData);

    serverResponseObj.json({
        message: 'DB updated successfully!'
    })
});

app.listen(PORT, () => console.log('Server started on port 3000'));