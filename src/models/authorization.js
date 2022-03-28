module.exports = (req, res, next) => {
    if (req.user.role === 'admin'){
        next()
    } else {
        throw new Error('token verified but not access'); // 401 = Unauthorized
    }
}