const insertUser = require("./connectAndInsert");

const user = {
    name: "test username",
    company: "test company",
    phone: "test phone",
    mail: "test mail",
    host: "test host"
};

test('test insert', () => {
    return insertUser(user).then(rowCount => {
        expect(rowCount).toBe(1);
    })
});

