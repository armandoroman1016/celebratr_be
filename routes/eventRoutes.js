const router = require('express').Router()
const uuid = require('uuid/v4')
const capitalize = require('../utils/capitalize')
const Events = require('../helpers/eventHelpers')

router.post('/:userId/add', (req, res) => {

    let data = req.body
    const { userId } = req.params

    if( data.name && 
        data.date && 
        data.startTime &&
        data.budget && 
        data.location &&
        data.private &&
        data.adultGuests ){
            
            const eventId = uuid()
            data.name = capitalize(data.name)
            data.location = capitalize(data.location)

            const packet = {

                id: eventId,
                name: data.name,
                date: data.date,
                start_time: data.startTime,
                // end_time: data.endTime,
                budget: data.budget,
                location: data.location,
                private: data.private,
                adult_guests: data.adultGuests,
                child_guests: data.childGuests,
                // background_color: data.background_color,
                host_id: userId,

            }
            console.log(packet)

            Events.add(packet)
                .then( event => {
                    console.log(event)
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

router.get('/', (req, res) => {

    Events.find()
        .then((events) => res.status(200).json(events))
        .catch((err) => res.status(500).json(err))
})

module.exports = router