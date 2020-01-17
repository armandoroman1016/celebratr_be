const router = require('express').Router()
const uuid = require('uuid/v4')
const capitalize = require('../utils/capitalize')
const Events = require('../helpers/eventHelpers')
const packetCleanup = require('../utils/packetCleanup')

router.post('/:userId', (req, res) => {

    let data = req.body

    const { userId } = req.params

    if( data.name && 
        data.date && 
        data.startTime &&
        data.budget && 
        data.location &&
        data.address &&
        data.adultGuests ){
            
            const eventId = uuid()
            data.name = capitalize(data.name)
            data.location = capitalize(data.location)

            // setting events publicity for db
            data.private = data.private ? 1 : 0

            // creating and shaping packet going into the DB
            let packet = {

                id: eventId,
                name: data.name,
                date: data.date,
                start_time: data.startTime,
                end_time: data.endTime,
                budget: Number(data.budget),
                location: data.location,
                address: data.address,
                private: data.private,
                adult_guests: data.adultGuests,
                child_guests: data.childGuests,
                background_color: data.backgroundColor,
                theme: data.theme,
                host_id: userId

            }

            // deleting any undefined values in packet
            packet = packetCleanup(packet)


            // adding event
            Events.add(packet)
                .then( event => {
                    if(event){
                        res.status(201).json({event: event})
                    }else{
                        res.status(500)
                    }
                })
                .catch( err => {
                    res.status(500)
                })

    }else{

        res.status(400).json({message: 'Missing required fields'})

    }
})

router.get('/:userId', ( req, res ) => {
    const { userId } = req.params
    Events
        .findByHostId( userId )
        .then( events => {
            if(events){
                res.status(200).json({events: events})
            }else{
                res.status(500)
            }
        })
        .catch( err => res.status(500))
})

router.put('/:eventId', ( req, res) => {

    const { eventId } = req.params

    let data = req.body

    if( data.name && 
        data.date && 
        data.startTime &&
        data.budget && 
        data.location &&
        data.address &&
        data.adultGuests ){
            
            data.name = capitalize(data.name)
            data.location = capitalize(data.location)

            // setting events publicity for db
            data.private = data.private ? 1 : 0

            // creating and shaping packet going into the DB
            let packet = {

                id: eventId,
                name: data.name,
                date: data.date,
                start_time: data.startTime,
                end_time: data.endTime,
                budget: Number(data.budget),
                location: data.location,
                address: data.address,
                private: data.private,
                adult_guests: data.adultGuests,
                child_guests: data.childGuests,
                background_color: data.backgroundColor,
                theme: data.theme,
                host_id: data.hostId

            }

            Events.update(eventId, packet)
                .then((event) => {
                    
                    if(event){
                        res.status(204).json({updated: event})

                    }else{

                        res.status(500).json({message: 'hello'})
                    }

                })
                .catch(err => res.status(500))

        }else{

            res.status(400).json({message: 'Event missing required fields'})

        }

})

router.get('/', (req, res) => {

    Events.find()
        .then((events) => res.status(200).json(events))
        .catch((err) => res.status(500).json(err))
})

module.exports = router