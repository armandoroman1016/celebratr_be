const request = require("supertest")
const server = require("../api/server.js")
const db = require("../data/dbConfig.js")

// const password = bcrypt.hashSync("password", 14)

let testRegister = {
    "email": 'testaccount@celebratr.co',
    "firstName": "Test",
    "lastName": "User",
    "password": "password",
}

describe("authRoutes.js", () => {
    beforeEach(async () => {
        await db('shopping_item').truncate();
        await db('vendors').truncate();
        await db('to_do').truncate();
        await db('guests').truncate();
        await db('events').truncate();
        await db('users').truncate();
    });

    describe("POST /api/auth/register", () => {
        it('returns 201 OK', async() => {
            let results = await request(server).post("/api/auth/register").send(testRegister)
            expect(results.status).toBe(201)
        });
        it("creates a new user", async () => {
            let users = await db("users")
            expect(users).toHaveLength(0)

            await request(server).post("/api/auth/register").send(testRegister)
            
            users = await db("users")

            expect(users).toHaveLength(1)
        });
        it("wont register duplicate emails", async() => {

            const first = await request(server).post("/api/auth/register").send(testRegister)

            expect(first.status).toBe(201)

            const second = await request(server).post("/api/auth/register").send(testRegister)
            
            expect(second.status).toBe(403)
        });
        it("will return error if missing credentials", async() => {

            delete testRegister.password

            const results = await request(server).post('/api/auth/register').send(testRegister)

            expect(results.status).toBe(400)

            testRegister.password = "password"
        })
    })
})