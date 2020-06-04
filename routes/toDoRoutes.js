const router = require("express").Router();
const ToDo = require("../helpers/toDoHelpers");
const capitalize = require("../utils/capitalize");
const uuid = require("uuid/v4");
const packetCleanup = require("../utils/packetCleanup");
const validateToken = require("../middleware/validateToken");

// router.get('/', validateToken, (req, res) => {

//     ToDo.find()
//         .then( todos => {

//             res.status(200).json({todos})

//         })
//         .catch( err => res.status(500))

// })

/**
 * @api {post} /api/shopping/:eventId Create A Todo Item
 * @apiParam {String} eventId Id of event to create todo item for
 *
 * @apiName Create
 * @apiGroup Todo
 *
 * @apiParamExample Example Body:
 * {
 * 	"name": "find venue",
 * 	"notes": null,
 * 	"completed": false
 * }
 *
 * @apiSuccess {Object} event Object with item data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 Created
 * {
 *   "id": "6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2",
 *   "name": "Find Venue",
 *   "notes": null,
 *   "completed": false,
 *   "event_id": "395e889d-8b38-45c9-b786-48427c64786a"
 * }
 */

router.post("/:eventId", validateToken, (req, res) => {
  const { eventId } = req.params;

  let toDoBody = req.body;

  if (toDoBody.name) {
    toDoBody.name = capitalize(toDoBody.name);

    const id = uuid();

    toDoBody.completed = toDoBody.completed ? 1 : 0;

    let packet = {
      id: id,
      name: toDoBody.name,
      notes: toDoBody.notes,
      completed: toDoBody.completed,
      event_id: eventId,
    };

    packet.name = capitalize(packet.name);

    packet = packetCleanup(packet);

    ToDo.add(packet)
      .then((todo) => {
        if (todo) {
          res.status(201).json(todo);
        } else {
          res.status(500);
        }
      })
      .catch((err) => res.status(500));
  } else {
    res.status(400).json({ message: "To do list item name is required" });
  }
});

/**
 * @api {get} /api/shopping/:eventId Get Events' Todo Items
 * @apiParam {String} eventId Id of event to get todo items for
 *
 * @apiName Get
 * @apiGroup Todo
 *
 * @apiParamExample Example Body:
 * {
 * 	"name": "find venue",
 * 	"notes": null,
 * 	"completed": true
 * }
 *
 * @apiSuccess {Object} event Object with item data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *   "id": "6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2",
 *   "name": "Find Venue",
 *   "notes": null,
 *   "completed": false,
 *   "event_id": "395e889d-8b38-45c9-b786-48427c64786a"
 *   }
 * ]
 */

router.get("/:eventId", validateToken, (req, res) => {
  const { eventId } = req.params;

  ToDo.findByEventId(eventId)
    .then((todos) => {
      if (todos) {
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].completed) {
            todos[i].completed = true;
          } else {
            todos[i].completed = false;
          }
        }

        res.status(200).json(todos);
      } else {
        res.status(404).json({ message: "Invalid event id" });
      }
    })
    .catch((err) => res.status(500));
});

/**
 * @api {put} /api/todo/:itemId Update A Todo Item
 * @apiParam {String} itemId Id of item to update
 *
 * @apiName Update
 * @apiGroup Todo
 *
 * @apiParamExample Example Body:
 * {
 *   "name": "Find Venue",
 *   "notes": null,
 *   "completed": true,
 *   "eventId": "395e889d-8b38-45c9-b786-48427c64786a"
 * }
 *
 * @apiSuccess {Object} event Object with item data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *   "updated": {
 *   "id": "6ff0c0bd-8615-4c23-8df9-cefe48d5a7c2",
 *   "name": "Find Venue",
 *   "notes": null,
 *   "completed": true,
 *   "event_id": "395e889d-8b38-45c9-b786-48427c64786a"
 *   }
 * }
 */

router.put("/:id", validateToken, (req, res) => {
  const { id } = req.params;

  let toDoBody = req.body;

  if (toDoBody.name) {
    toDoBody.name = capitalize(toDoBody.name);

    toDoBody.completed = toDoBody.completed ? 1 : 0;

    let packet = {
      id: id,
      name: toDoBody.name,
      notes: toDoBody.notes,
      completed: toDoBody.completed,
      event_id: toDoBody.eventId,
    };

    packet.name = capitalize(packet.name);

    packet = packetCleanup(packet);

    ToDo.update(id, packet)
      .then((todo) => {
        if (todo) {
          res.status(200).json({ updated: todo });
        } else {
          res.status(500);
        }
      })
      .catch((err) => res.status(500));
  } else {
    res.status(400).json({ message: "To do list item name is required" });
  }
});

router.delete("/:id", validateToken, (req, res) => {
  const { id } = req.params;

  ToDo.remove(id)
    .then((removed) => {
      if (removed) {
        res.status(204).json(removed);
      } else {
        res.status(500).json({ message: "unable to remove resource" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
