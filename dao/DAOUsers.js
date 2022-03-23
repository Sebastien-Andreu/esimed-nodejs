const db = require('../db')

/**
 * return all Users from the database
 */
const getAll = async function () {
    return db.select('*').from('Users')
}

/**
 * return one User with id from the database
 * @params {string} firstName - firstName of User
 */
const find = async function (firstName) {
    return db.select('*').from('Users').where({firstName: firstName})
}

/**
 * return one User with id from the database
 * @params {int} id - id of User
 */
const findWithId = async function (id) {
    return db.select('*').from('Users').where({id: id})
}

/**
 * add new User in database
 * @params {string} firstName - name of user
 * @params {string} lastName - lastName of user
 * @params {string} password - password of user
 */
const add = async function (firstName, lastName, password) {
    await db.insert({firstName: firstName, lastName: lastName, password: password}).into('Users')
}

/**
 * delete User in the database
 * @params {int} id - id of User
 */
const remove = async function (id) {
    await db.delete().from('Users').where({id: id})
}

/**
 * update User in database
 * @params {int} id - id of User
 * @params {string} firstName - name of user
 * @params {string} lastName - lastName of user
 * @params {string} password - password of user
 */
const update = async function (id, firstName, lastName, password) {
    await db.from("Users").where({id: id}).update({firstName: firstName, lastName: lastName, password: password})
}

module.exports = {
    getAll,
    find,
    add,
    remove,
    update,
    findWithId
}