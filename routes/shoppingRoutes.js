const router =  require('express').Router()
const Shopping = require('../helpers/shoppingHelpers')
const Events = require('../helpers/eventHelpers')
const uuid = require('uuid/v4')

router.get('/' , (req, res) => {
    Shopping.find()
        .then( list => res.status(200).json(list))
        .catch( err => res.status(500))

})


router.post('/:eventId/add', (req, res) => {

    const { eventId } = req.params
    
    let values = req.body

    // if name is missing from request body return 400 message
    if(!values.name){
        res.status(400).json({message: 'missing a name for the shopping item'})
    }else{

        Events.findById(eventId)
            .then((event) => {
                // if no event is found return 404 message
                if(!event){
                    res.status(404).json({message: "invalid event id"})

                // else proceed to try to add event
                }else{

                    const id = uuid()

                    const packet = {
                        id: id,
                        name: values.name,
                        event_id: eventId,
                        purchased: values.purchased,
                        notes: values.notes
                    }

                    // deleting any undefined values in packet
                    for (const key in packet){
                        if(key === undefined || key === '' || key === null){
                            delete key
                        }
                    }

                    Shopping.add(packet)
                        .then( item => res.status(201).json(item))
                        .catch( err => res.status(500).json(err))
                }
            })
    }
})


module.exports = router