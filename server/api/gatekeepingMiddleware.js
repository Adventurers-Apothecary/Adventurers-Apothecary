// store all of our functions that will act as 
// middleware between our request and our response
// and we will use it as we see fit

const { models: { User }} = require('../db')

const requireToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    requireToken
}