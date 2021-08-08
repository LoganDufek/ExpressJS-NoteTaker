// Importing the necessary requirements for Node
const express = require('express');
const path = require('path');
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
const note = require('./db/db');


// Get route to return the Note Taker page
app.get('/notes', (req, res) => { // SendFile and the path for where the notes are
    res.sendFile(path.join(__dirname, './public/notes.html'));

})

// Get route for the Notes API
app.get('/api/notes', (req, res) => {

    return res.json(note);
})

// Post route which will update the inputed information in the Notes API
app.post('/api/notes', (req, res) => { // This garuntees each note will have a unique ID assigned to it so it can later be easily deleted
    req.body.id = note.length.toString();

    // Assign the req.body info to a new variable
    const newNote = req.body

    // Log that variable for good measure and then push iitt into the exising note variable
    console.log(newNote)
    note.push(newNote)

    // Respond with that new note variable in a JSON format
    res.json(note);

    // Then, rewrite the existing file the program will grab with that updated note variable
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(note, null, 1));
})

// Function that will find and return a matching ID for a note. It will be called later
const findNoteByID = (id) => {

    const matchingID = note.find((notes) => {
        return notes.id === id
    })

    return matchingID
}

// Delete route that will remove the note when it is clicked on
app.delete('/api/notes/:id', (req, res) => { // Get the ID based on what the note's ID is
    const id = req.params.id
    // Run findNoteByID using that variable
    const removedNote = findNoteByID(id)

    const index = note.indexOf(removedNote);
    if (index > -1) { // If the input matches a valid ID, it will be spliced(removed) from the notes variable
        note.splice(index, 1);
    }

    // That information is then sent in a JSON format
    res.json(note)

    // The file is then rewritten so that the delted information will be reflected in the front end of the application
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(note, null, 1));
})

// Get route that will return the Index/Home page of the application if anything is put into the address bar other than /notes.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
