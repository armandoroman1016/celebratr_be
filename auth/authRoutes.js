
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const uuid = require('uuid/v4')
const Users = require('../helpers/authHelpers')
const generateToken = require('../middleware/generateToken')
const capitalize = require('../utils/capitalize')

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

                    console.log('newUser', packet)

                    // normalizing names
                    packet.firstName = capitalize(packet.firstName.trim())
                    packet.lastName = capitalize(packet.lastName.trim())

                    const id = uuid()

                    finalPacket = {
                        id: id,
                        email: packet.email,
                        first_name: packet.firstName,
                        last_name: packet.lastName,
                        password: packet.password
                    }

                    console.log(finalPacket)

                    for(key in finalPacket){
                        console.log(`type of ${key}: `, typeof(key))
                    }
                    
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

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password){

        res.status(400).json({message: 'Missing required credentials.'})

    } else {

        Users.findByEmail(email)
            .then( user => {

                if(!user || !bcrypt.compareSync(password, user.password)){
                    res.status(406).json({message: 'Invalid email or password'})

                }else if( user && bcrypt.compareSync(password, user.password)){

                    const token = generateToken(user)
                    delete user.password

                    res.status(200).json({user: user, token: token})
                }

            })
    }
})

module.exports = router