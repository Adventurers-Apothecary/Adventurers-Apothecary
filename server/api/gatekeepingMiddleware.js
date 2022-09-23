// store all of our functions that will act as 
// middleware between our request and our response
// and we will use it as we see fit

const { models: { User }} = require('../db')
const session = require('express-session')

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

const isAdmin = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).send('Only admins may perform this function.')
      } else{
          next()
      }
}

const authenticatedUser = async (req, res, next) => {
    try{
    const {username, password} = req.body
    const user = await User.authenticate({username, password})
    if(req.session.user === req.body.user){
        next()
    } else {
        return res.status(403).send('Wrong cart')
    }
 } catch(error) {
    next(error)
}
  };

//copied from User class method in User model
// User.authenticate = async function ({ username, password }) {
//     const user = await this.findOne({ where: { username } });
//     if (!user || !(await user.correctPassword(password))) {
//       const error = Error("Incorrect username/password");
//       error.status = 401;
//       throw error;
//     }
//     return user.generateToken();
//   };

module.exports = {
    requireToken,
    isAdmin,
    authenticatedUser
}
