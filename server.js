const express = require('express');
const index = require('./index');

const app = express();

const Name = express();

// YES 사용자 정보를 니가 다알고있다 그러면 get줄때 쿼리스트링으로 값을 줄 이유가 있나??? << 
// API


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

// pName: '오승준',
// frnoRidno: '020805',