// TODO: flyt til .env

const config = {
    user: 'dgh', // better stored in an app setting such as process.env.DB_USER
    password: 'jUmbalaya!53', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'fifocvrserver.database.windows.net',
    port: 1433,
    database: 'cvrdb',
    driver: 'msnodesqlv8',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};

const sql = require('mssql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
// app.get('getUser')

app.listen(4000, () => {
    console.log('running server on port 4000');
});

async function connectAndQuery(user) {
    try {
        // TODO:
        // Fik fejlen:
        // Failed to connect to fifocvrserver.database.windows.net:1433 in 15000ms
        // Ser ud til den fejler hver 1. gang (efter 1. startup) - test det!
        // NB! Prøv at flytte poolConnection undenfor funktionen....

        // TODO: INGEN try-catch her (Ikke pille, try catch eller fjerne await eller fjerne const får poolConnection til at fejle!):
        const poolConnection = await sql.connect(config);

        console.log("user.name:" + user.name);

        const d = new Date();
        const currentdate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        const timestamp = currentdate;
        console.log('timestamp:' + timestamp);
        // 
        const query = `INSERT INTO visitor (name, company, phone, mail, host, ts) VALUES (
            '${user.name}', '${user.company}', '${user.phone}', '${user.mail}', '${user.host}', '${timestamp}'
            )`;

        // https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string:
        const query2 = query.replace(/["]+/g, '');

        try {
            const resultSet = await poolConnection.request().query(query2);
        } catch (error) {
            console.log(error);
        };

        poolConnection.close();
    } catch (error) {
        console.error(error.message);
    }
};

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

    connectAndQuery(user);
});

app.get('/test', (req, res) => {
    console.log("GET ran from /test");
});

app.get('/', (req, res) => {
    console.log("GET ran index");
    res.send("response from server/index");
});