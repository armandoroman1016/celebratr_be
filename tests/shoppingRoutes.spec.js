const request = require("supertest")
const server = require("../api/server.js")
const db = require("../data/dbConfig.js")

let eventInfo = {
	name: "My testing party",
	date: "2020-02-28",
	startTime: "6 : 00 PM",
	budget:5000,
	location: "My House",
	address: "1010 Walnut Ave",
	private: 1,
	adultGuests: 30,
	childGuests: 40
}


let testRegister = {
    "email": 'testaccount@celebratr.co',
    "firstName": "Test",
    "lastName": "User",
    "password": "password",
}

let testItem = {
    name: "My shopping item"
}


describe("shoppingRoutes.js", () => {

    beforeEach(async() => {
        await db('shopping_item').truncate();
    });
    
    let registered;
    let events;

    beforeAll( async() =>{

        await db('events').truncate();
        await db('users').truncate();
        
        registered = await request(server).post("/api/auth/register").send(testRegister)

        const url = `/api/events/${registered.body.user.id}`
        const x = await request(server).post(url).send(eventInfo).set({
            "Authorization": registered.body.token,
            "Content-Type": "application/json"
        })

        events = await db("events")
    });


    describe("POST /:eventId", () => {
        it("adds an item to the shopping list", async() => {
            let items = await db("shopping_item");
            expect(items).toHaveLength(0)
            
            const event = events[0]

            const result = await request(server).post(`/api/shopping/${event.id}`).send(testItem).set({
                "Authorization": registered.body.token,
                "Content-Type": "application/json"
            })

            items = await db("shopping_item")
            
            expect(items).toHaveLength(1)
            expect(result.status).toBe(201)
        });

    });
})