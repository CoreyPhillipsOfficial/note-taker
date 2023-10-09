const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');
const { v4: uuidv4 } = require('uuid');

// Get /api/notes
function getData() {
    const json = fs.readFileSync(dbPath, 'utf8');

    return JSON.parse(json);
}

// Post /api/notes
function writeData(notesArray) {
    const notesWithId = notesArray.map((note) => ({
        id: uuidv4(),
        ...note,
    }));

    fs.writeFile(dbPath, JSON.stringify(notesWithId, null, 2), () => {
        console.log('DB updated successfully!');
    });
}

module.exports = { getData, writeData }