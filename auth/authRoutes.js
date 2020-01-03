
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const uuid = require('uuid/v4')
const Users = require('../helpers/authHelpers')
const generateToken = require('../middleware/generateToken')

router.post('/register', ( req, res ) => {
    
    let packet = req.body
    // if any required fields are missing respond with 400 status code
    if (!packet.firstName || !packet.lastName || !packet.password || !packet.email){
        res.status(400).json({message: 'Missing at least one required field'})

        // else try to register user
    } else {
        
        Users.findByEmail(packet.email)
            .then( user => {
                // if account is created with email provided then respond with 403 status code
                if(user){
                    res.status(403).json({message: 'Email is already in use'})

                    // else register and submit user data
                }else{
                    
                    const hashedPass = bcrypt.hashSync(packet.password, 14)
                    packet.password = hashedPass

                    const id = uuid()

                    finalPacket = {
                        id: id,
                        email: packet.email,
                        first_name: packet.firstName,
                        last_name: packet.lastName,
                        password: packet.password
                    }
                    console.log('here', finalPacket)

                    Users.add(finalPacket)
                        .then(newUser => {
                            console.log('newUser', newUser)
                            if(newUser){
                                const token = generateToken(newUser)
                                delete newUser.password
                                res.status(201).json({user: newUser, token: token})
                            }else{
                                res.status(500).json({message: 'Unexpected error occurred, try logging in'})
                            }
                        })
                        .catch(err => res.status(500))
                }
            })
            .catch(err => res.status(500).json({message: 'Unexpected error occurred'}))
    }
})

router.get('/', (req, res) => {
    Users.find()
        .then(users =>{
            res.status(200).json({users: users})
        })
        .catch( err => {
            res.status(500).json(err)
        })
})

module.exports = router