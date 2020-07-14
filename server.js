const express = require('express');
const index = require('./index');

const app = express();

let UserName = [];
let BirthDay = [];

app.get('/storage', (req, res) => {
    try {
        const Name = req.query.name;
        const Birth = req.query.birth;

        UserName.push(Name);
        BirthDay.push(Birth);

        res.json('{state: 1}');
    } catch {
        res.json('{state: 0}');
    }
    
});

app.get('/push', (req, res) => {
    try {
        for(let i = 0; i < UserName.length; i++) {
            index.func(UserName[i], BirthDay[i]);
        }

        UserName = []
        BirthDay = []
        res.json('{state: 1}');
    } catch {
        res.json('{state: 0}');
    }
});

app.listen(3000, 'localhost', () => {
    console.log('Server ON');
});
