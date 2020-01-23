const router = require('express').Router()
const uuid = require('uuid/v4')
const capitalize = require('../utils/capitalize')
const Events = require('../helpers/eventHelpers')
const packetCleanup = require('../utils/packetCleanup')
const validateToken = require('../middleware/validateToken')


/**
 * @api {post} /api/events/:userId Create An Event
 * @apiParam {String} userId User Id of person creating the event
 * 
 * @apiName Create
 * @apiGroup Events
 *
 * @apiParamExample Example Body:
 * {
 *	"name": "Event Name",
 *	"date": "2020-02-28",
 *	"startTime": "6 : 00 PM",
 *	"budget":5000,
 *	"location": "Event Location",
 *	"address": "1010 Walnut Ave",
 *	"private": 1,
 *	"adultGuests": 30,
 *	"childGuests": 40,
 *  "background_color": null,
 *  "theme": null,
 * }
 *
 * @apiSuccess {Object} event Object with event data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 Created
 * {
 *  "event": {
 *    "id": "f5a961e0-f4be-4af6-a91d-816eff1bd9a9",
 *    "name": "Event Name",
 *    "date": "2020-02-28",
 *    "start_time": "6 : 00 PM",
 *    "end_time": null,
 *    "budget": 5000,
 *    "location": "Event Location",
 *    "address": "1010 Walnut Ave",
 *    "private": true,
 *    "adult_guests": 30,
 *    "child_guests": 20,
 *    "background_color": null,
 *    "theme": null,
 *    "host_id": "f97ccc1e-c543-42ac-84d8-cbdab63f9a1d"
 *  }
 * }
 */

router.post('/:userId', validateToken, (req, res) => {

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

/**
 * @api {get} /api/events/:userId Get Events By User Id
 * @apiParam {String} userId User Id grabs all events created by this user
 * 
 * @apiName Get
 * @apiGroup Events
 *
 * @apiSuccess {Object[]} events List with event objects that the user has created
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 Created
 * {
 *  events: [
 *      {
 *         "id": "f5a961e0-f4be-4af6-a91d-816eff1bd9a9",
 *         "name": "Event Name",
 *         "date": "2020-02-28",
 *         "start_time": "6 : 00 PM",
 *         "end_time": null,
 *         "budget": 5000,
 *         "location": "Event Location",
 *         "address": "1010 Walnut Ave",
 *         "private": true,
 *         "adult_guests": 30,
 *         "child_guests": 20,
 *         "background_color": null,
 *         "theme": null,
 *         "host_id": "f97ccc1e-c543-42ac-84d8-cbdab63f9a1d"
 *      },
 *      {
 *         "id": "g4d961e0-f4be-4ad6-a91d-816eff1n3uaa",
 *         "name": "Event 2",
 *         "date": "2020-04-21",
 *         "start_time": "6 : 00 PM",
 *         "end_time": null,
 *         "budget": 200,
 *         "location": "Unknown",
 *         "address": "203 Rose Rd",
 *         "private": true,
 *         "adult_guests": 10,
 *         "child_guests": 0,
 *         "background_color": null,
 *         "theme": null,
 *         "host_id": "f97ccc1e-c543-42ac-84d8-cbdab63f9a1d"
 *     }
 *  ]
 * }
 */

router.get('/:userId', validateToken, ( req, res ) => {
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


/**
 * @api {put} /api/events/:eventId Update An Event
 * @apiParam {String} eventId Id of Event to update
 * 
 * @apiName Update
 * @apiGroup Events
 *
 * @apiParamExample Example Body:
 * {
 *     "name": "Event Name",
 *     "date": "2020-02-28",
 *     "startTime": "4 : 00 PM"`,
 *     "endTime":  "12 : 00 AM",
 *     "budget": 3000,
 *     "location": "Event Location",
 *     "address": "2020 Walnut Ave",
 *     "private": true,
 *     "adultGuests": 30,
 *     "childGuests": 20,
 *     "backgroundColor": null,  
 *     "theme": null,
 *     "hostId": "f97ccc1e-c543-42ac-84d8-cbdab63f9a1d"
 * }
 *
 * @apiSuccess {Object} event Object with event data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 Ok
 * {
 *  "event": {
 *    "id": "f5a961e0-f4be-4af6-a91d-816eff1bd9a9",
 *    "name": "Event Name",
 *    "date": "2020-02-28",
 *    "start_time": "6 : 00 PM",
 *    "end_time": null,
 *    "budget": 5000,
 *    "location": "Event Location",
 *    "address": "1010 Walnut Ave",
 *    "private": true,
 *    "adult_guests": 30,
 *    "child_guests": 20,
 *    "background_color": null,
 *    "theme": null,
 *    "host_id": "f97ccc1e-c543-42ac-84d8-cbdab63f9a1d"
 *  }
 * }
 */

router.put('/:eventId', validateToken, ( req, res) => {

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
                    console.log('here', event)

                    if(event){

                        res.status(200).json({updated: event})

                    }else{

                        res.status(404).json({message: "the item with that id doesn't exist"})
                    }

                })
                .catch(err => res.status(500))

        }else{

            res.status(400).json({message: 'Event missing required fields'})

        }

})

/**
 * @api {delete} /api/event/:eventId Delete An Event
 * @apiParam {String} eventId Event id of event to be deleted
 * 
 * @apiName Delete
 * @apiGroup Events
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 204 No Content
 */

router.delete('/:eventId', validateToken, ( req, res ) => {

    const { eventId } = req.params

    Events.remove(eventId)
        .then(del => {
            console.log('del', del)
            res.status(204).json({message: 'deleted successfully'})
        })
        .catch( err => res.status(500).json(err))

})

// router.get('/', (req, res) => {

//     Events.find()
//         .then((events) => res.status(200).json(events))
//         .catch((err) => res.status(500).json(err))
// })

module.exports = router