const { Sequelize, DataTypes } = require('sequelize');
const {UUIDV4} = require("sequelize/types");
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        require: true,
        unique: true
    },
    lastName: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    }
}, {
    // Other model options go here
});

console.log(User === sequelize.models.User);