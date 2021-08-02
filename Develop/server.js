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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});