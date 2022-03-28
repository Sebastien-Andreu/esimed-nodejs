const uuid = require("uuid");
const md5 = require("md5");
exports.users = [
    {
        id: uuid.v4(),
        firstName: 'admin',
        lastName: 'admin',
        password: md5('admin'),
        role: 'admin'
    }
];
