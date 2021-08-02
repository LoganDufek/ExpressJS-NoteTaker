const express = require('express');
const path = require('path');
const fs = require("fs");

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const  note  = require('./db/db');

app.get('/notes', (req, res) => {

  res.sendFile(path.join(__dirname, './public/notes.html'));
  
})

app.get('/api/notes', (req, res) => {

  return res.json(note);
  
})

app.post('/api/notes', (req, res) => { 
  req.body.id = note.length.toString();

  const newNote = req.body


 console.log(newNote)
 note.push(newNote)


  res.json(note);

  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(note, null, 1)
    );
  })

  const findNoteByID = (id) => { 

    const matchingID = note.find((notes) => {
      return notes.id === id
    })

    return matchingID
  }


  app.delete('/api/notes/:id', (req, res) => {
    
   
    const id = req.params.id
    const removedNote = findNoteByID(id)

    const index = note.indexOf(removedNote);
    if (index > -1) {
    note.splice(index, 1);
    }

    res.json(note)

    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(note, null, 1)
    );
  })


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});