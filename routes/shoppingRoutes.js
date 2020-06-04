const router = require("express").Router();
const Shopping = require("../helpers/shoppingHelpers");
const Events = require("../helpers/eventHelpers");
const uuid = require("uuid/v4");
const packetCleanup = require("../utils/packetCleanup");
const capitalize = require("../utils/capitalize");
const validateToken = require("../middleware/validateToken");

/**
 * @api {post} /api/shopping/:eventId Create A Shopping Item
 * @apiParam {String} eventId Id of event to create shopping item for
 *
 * @apiName Create
 * @apiGroup Shopping
 *
 * @apiParamExample Example Body:
 * {
 * 	 "name": "example",
 * 	 "notes": "none",
 * 	 "purchased": false,
 * 	 "cost": 100
 * }
 *
 * @apiSuccess {Object} event Object with item data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 Created
 * {
 *   "id": "284f1eae-1189-4f0c-936e-9221492076bd",
 *   "name": "Decorations",
 *   "event_id": "395e889d-8b38-45c9-b786-48427c64786a",
 *   "cost": 100,
 *   "purchased": false,
 *   "notes": "none"
 * }
 */

router.post("/:eventId", validateToken, (req, res) => {
  const { eventId } = req.params;

  let values = req.body;

  // if name is missing from request body return 400 message
  if (!values.name) {
    res.status(400).json({ message: "missing a name for the shopping item" });
  } else {
    Events.findById(eventId).then((event) => {
      // if no event is found return 404 message
      if (!event) {
        res.status(404).json({ message: "invalid event id" });

        // else proceed to try to add event
      } else {
        const id = uuid();

        let packet = {
          id: id,
          name: values.name,
          event_id: eventId,
          purchased: values.purchased ? 1 : 0,
          notes: values.notes,
          cost: Number(values.cost),
        };

        packet.name = capitalize(packet.name);

        // deleting any undefined or null values in packet

        packet = packetCleanup(packet);

        Shopping.add(packet)
          .then((item) => res.status(201).json(item))
          .catch((err) => res.status(500).json(err));
      }
    });
  }
});

/**
 * @api {get} /api/shopping/:eventId Get Event Shopping Items
 * @apiParam {String} eventId Id of event to get shopping items for
 *
 * @apiName Get
 * @apiGroup Shopping
 *
 * @apiSuccess {Object[]} items List with objects of shopping items
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *   "items": [
 *     {
 *       "id": "284f1eae-1189-4f0c-936e-9221492076bd",
 *       "name": "Decorations",
 *       "event_id": "395e889d-8b38-45c9-b786-48427c64786a",
 *       "cost": 100,
 *       "purchased": false,
 *       "notes": "none"
 *     }
 *   ]
 * }
 */

router.get("/:eventId", validateToken, (req, res) => {
  const { eventId } = req.params;
  Shopping.findByEventId(eventId)
    .then((items) => {
      if (items) {
        for (let i = 0; i < items.length; i++) {
          items[i].purchased = items[i].purchased ? true : false;
        }
        res.status(200).json({ items: items });
      } else {
        res.status(404);
      }
    })
    .catch((err) => res.status(500));
});

/**
 * @api {put} /api/shopping/:itemId Update A Shopping Item
 * @apiParam {String} itemId Id of item to update
 *
 * @apiName Update
 * @apiGroup Shopping
 *
 * @apiParamExample Example Body:
 * {
 * 	 "name": "Cutlery",
 * 	 "notes": null,
 * 	 "purchased": false,
 * 	 "cost": 100,
 *   "event_id": "c4514ee7-fca7-4620-b25f-3b2ead42cf73"
 * }
 *
 * @apiSuccess {Object} event Object with item data
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *   "updated": {
 *     "id": "284f1eae-1189-4f0c-936e-9221492076bd",
 *     "name": "Cutlery",
 *     "event_id": "c4514ee7-fca7-4620-b25f-3b2ead42cf73",
 *     "cost": 100,
 *     "purchased": false,
 *     "notes": null
 *   }
 * }
 */

router.put("/:itemId", validateToken, (req, res) => {
  const { itemId } = req.params;
  let shoppingItem = req.body;
  if (shoppingItem.name) {
    shoppingItem.purchased = shoppingItem.purchased ? 1 : 0;
    let packet = {
      id: itemId,
      name: shoppingItem.name,
      notes: shoppingItem.notes,
      purchased: shoppingItem.purchased,
      cost: Number(shoppingItem.cost),
      event_id: shoppingItem.eventId,
    };
    packet.name = capitalize(packet.name);
    packet = packetCleanup(packet);
    Shopping.update(itemId, packet)
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

module.exports = router;
