const express = require('express');
const path = require('path');
const { uuid } = require('uuid');
const fs = require('fs');



const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//using express to direct to html page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//Notes Database

app.get('/api/notes', (req,res) => {
     res.json("./db/db.json");
    
});
app.post('/api/notes', (req,res) => {
    const { title,text } = req.body;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Whoa, whoa, whoa! What was that?')
        } else {
            JSON.parse(data)
        }
    })
    
    if (req.body) {
        newNote = {
            title,
            text,
            // id: uuid,
        };
    }res.json(newNote);
});



app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);