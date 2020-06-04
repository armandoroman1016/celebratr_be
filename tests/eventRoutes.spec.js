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

describe("eventRoutes.js", () => {
    beforeEach(async () => {
        await db('events').truncate();
        await db('users').truncate();
    });

    let registered;
    beforeAll(async() =>{
        registered = await request(server).post("/api/auth/register").send(testRegister)
    })
    
    describe("POST /:userId", () => {
        it("creates a new event with valid token", async() => {
            const url = `/api/events/${registered.body.user.id}`
            const result  = await request(server).post(url).send(eventInfo).set({
                "Authorization": registered.body.token,
                "Content-Type": "application/json"
            })

            expect(result.status).toBe(201)
        });
        it("doesn\'t create event without token", async() => {
            const url = `/api/events/${registered.body.user.id}`
            
            const result = await request(server).post(url).send(eventInfo).set({
                "Content-Type": "application/json"
            })

            expect(result.status).toBe(400)
            expect(result.body.message).toBe("No Token Provided")
        });
        it("doesn\'t create event with invalid token", async() => {

            const url = `/api/events/${registered.body.user.id}`

            const result  = await request(server).post(url).send(eventInfo).set({
                "Authorization": "this.is.myToken",
                "Content-Type": "application/json"
            })

            expect(result.status).toBe(401)
            expect(result.body.message).toBe("Invalid Token")
        });
    });
    it("doesn\'t create event with missing fields", async() => {
        const url = `/api/events/${registered.body.user.id}`

        delete eventInfo.address

        const result  = await request(server).post(url).send(eventInfo).set({
            "Authorization": registered.body.token,
            "Content-Type": "application/json"
        })

        expect(result.status).toBe(400)
        expect(result.body.message).toBe('Missing required fields')
    });

    describe("GET /:userID", () => {

        it("fetches events", async() => {

            const url = `/api/events/${registered.body.user.id}`
            await request(server).post(url).send(eventInfo).set({
                "Authorization": registered.body.token,
                "Content-Type": "application/json"
            })

            const result = await request(server).get(url).set({
                "Authorization": registered.body.token
            })

            expect(result.status).toBe(200)
        });
        it("doesn't fetch events with missing token or invalid token", async() => {
            const url = `/api/events/${registered.body.user.id}`
            await request(server).post(url).send(eventInfo).set({
                "Authorization": registered.body.token,
                "Content-Type": "application/json"
            })

            const result = await request(server).get(url)

            expect(result.status).toBe(400)
            expect(result.body.message).toBe("No Token Provided")

            const result2 = await request(server).get(url).set({
                "Authorization": "My.Slick.Token"
            })

            expect(result2.status).toBe(401)
        })
    })

    
})