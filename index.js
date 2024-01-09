const insertUser = require("./connectAndInsert");

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.listen(4000, () => {
    console.log('running server on port 4000');
});

app.post('/addUser', (req, res) => {
    const user = {
        name: JSON.stringify(req.body.name),
        company: JSON.stringify(req.body.company),
        phone: JSON.stringify(req.body.phone),
        mail: JSON.stringify(req.body.mail),
        host: JSON.stringify(req.body.host)
    };
    console.log("Server: You requested to add user:" + user.name);
    res.send("Server: You requested to add user object: " + user);
    insertUser(user);
});

app.get('/test', (req, res) => {
    console.log("GET ran from /test");
});

app.get('/', (req, res) => {
    console.log("GET ran index");
    res.send("response from server/index");
});