const jwt = require('jsonwebtoken');
const userRepository = require("./user-repository"); //require
const md5 = require('md5');
const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+';

module.exports = (body, res) => {
    const foundUser = userRepository.getUserByFirstName(body.firstName);
    if (!foundUser) throw new Error('User not found');

    if (md5(body.password) === foundUser.password) {
        res.send(jwt.sign({ sub: foundUser.id, name: foundUser.firstName , role: foundUser.role}, secret, { expiresIn: '50min' }));
    } else {
       throw new Error('Incorrect password.');
    }
};