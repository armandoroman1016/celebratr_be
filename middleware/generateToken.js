const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

function generateToken(user, expiration = '1d'){

    const payload = {
        user_id: user.id
    }

    const options ={
        expiresIn: expiration
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = generateToken