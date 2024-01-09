const config = {
    user: 'dgh',
    password: 'jUmbalaya!53',
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

async function insertUser(user) {
    try {
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
        let affectedRows = 0;
        try {
            const resultSet = await poolConnection.request().query(query2);
            // console.log("resultSet: " + resultSet['rowsAffected']);
            affectedRows = resultSet['rowsAffected'][0];
        } catch (error) {
            console.log(error);
        };

        poolConnection.close();
        return affectedRows;

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = insertUser;