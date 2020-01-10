const router = require('express').Router()
const ToDo = require('../helpers/toDoHelpers')
const capitalize = require('../utils/capitalize')
const uuid = require('uuid/v4')
const packetCleanup = require('../utils/packetCleanup')

router.get('/', (req, res) => {

    ToDo.find()
        .then( todos => {

            res.status(200).json({todos})

        })
        .catch( err => res.status(500))

})

router.post('/:eventId', (req, res) => {

    const { eventId } = req.params

    let toDoBody = req.body

    if(toDoBody.name){

        toDoBody.name = capitalize(toDoBody.name)

        const id = uuid()

        toDoBody.completed = toDoBody.completed ? 1 : 0

        let packet = {
            id: id,
            name: toDoBody.name,
            notes: toDoBody.notes,
            completed: toDoBody.completed,
            event_id: eventId
        }

        packet = packetCleanup(packet)

        ToDo.add(packet)
            .then((todo) => {
                console.log('todo', todo)
                if(todo){
                    res.status(201).json(todo)
                }
                else{
                    res.status(500)
                }
            })
            .catch(err => res.status(500))
    }else{
        res.status(400).json({message: 'To do list item name is required'})
    }
})

router.get('/:eventId', (req, res) => {

    const { eventId } = req.params

    ToDo.findByEventId(eventId)
        .then(todos => {

            if(todos){

                for(let i = 0; i < todos.length; i++){

                    if (todos[i].completed){
                        todos[i].completed = true

                    }else{
                        todos[i].completed = false
                    }

                }

                res.status(200).json(todos)

            }else{

                res.status(404).json({message: 'Invalid event id'})
            }
        })
        .catch( err => res.status(500))
})

router.put('/:id', ( req, res ) => {

    const { id } = req.params

    let toDoBody = req.body

    if(toDoBody.name){

        toDoBody.name = capitalize(toDoBody.name)

        toDoBody.completed = toDoBody.completed ? 1 : 0

        let packet = {
            id: id,
            name: toDoBody.name,
            notes: toDoBody.notes,
            completed: toDoBody.completed,
            event_id: toDoBody.eventId
        }

        packet = packetCleanup(packet)

        ToDo.update(id, packet)
            .then((todo) => {

                if(todo){
                    res.status(204).json({updated: todo})
                }else{
                    res.status(500)
                }

            })
            .catch(err => res.status(500))

    }else{

        res.status(400).json({message: 'To do list item name is required'})
    }
})

router.delete('/:id', (req, res) => {

    const { id } = req.params

    ToDo.remove(id)
        .then( removed => {

            if(removed){
                res.status(204).json(removed)
            }else{
                res.status(500).json({message: 'unable to remove resource'})
            }

        })
        .catch( err => res.status(500).json(err))

})

module.exports = router