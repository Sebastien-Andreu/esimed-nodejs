const getAllUsers = async function () {
    const DAOUsers = require('../dao/DAOUsers')

    const allUsers = await DAOUsers.getAll()
    const arrayUsers = []
    for await (let user of allUsers) {
        arrayUsers.push(user)
    }
    return arrayUsers
}

const getUserByFirstName = async function (firstName) {
    const DAOUsers = require('../dao/DAOUsers')

    const user = await DAOUsers.find(firstName)
    console.log(user)
    if (user){
        return {status: 200, message:user}
    } else {
        return {status: 404, message:'User not exist'}
    }
}

/**
 * add new User, checks that the User does not exist
 * @param req - The params send by user with HTML request
 */
const add = async function (req) {
    const DAOUsers = require('../DAO/DAOUsers')
    const { firstName, lastName, password } = req.body

    if (!firstName) return {status: 422, message:'FirstName required.'}
    if (!lastName) return  {status: 422, message:'LastName required.'}
    if (!password) return {status: 422, message:'Password required.'}

    const user = await DAOUsers.find(firstName)
    if (user.length === 0){
        await DAOUsers.add(firstName, lastName, password)
        return {status: 200, message:'User Added !'}
    } else {
        return {status: 409, message:'User already exist'} //conflict
    }
}

/**
 * delete User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
const remove = async function (req) {
    const DAOUsers = require('../DAO/DAOUsers')

    const user = await DAOUsers.findWithId(req.params.id)
    if (user.length !== 0) {
        await DAOUsers.remove(req.params.id)
        return {status: 200, message:'Removed !'}
    } else {
        return {status: 404, message:'User not exist'}
    }
}


/**
 * update User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
const update = async function (req) {
    const DAOUsers = require('../DAO/DAOUsers')

    const { firstName, lastName, password } = req.body

    if (!firstName) return {status: 422, message:'FirstName required.'}
    if (!lastName) return  {status: 422, message:'LastName required.'}
    if (!password) return {status: 422, message:'Password required.'}

    const user = await DAOUsers.findWithId(req.params.id)
    if (user.length !== 0) {
        await DAOUsers.update(req.params.id, firstName, lastName, password)
        return {status: 200, message:'Updated !'}
    } else {
        return {status: 404, message:'User not exist'}
    }
}

module.exports = {
    getAllUsers,
    getUserByFirstName,
    add,
    remove,
    update
}