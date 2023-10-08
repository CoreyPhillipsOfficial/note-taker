const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');

// Get /api/notes
function getData() {
    const json = fs.readFileSync(dbPath, 'utf8');

    return JSON.parse(json);
}

// Post /api/notes
function writeData(notesArray) {
    fs.writeFile(dbPath, JSON.stringify(notesArray, null, 2), () => {
        console.log('DB updated successfully!');
    });
}

module.exports = { getData, writeData }