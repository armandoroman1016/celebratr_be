const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

// const password = bcrypt.hashSync("password", 14)

let testRegister = {
  email: "testaccount@celebratr.co",
  firstName: "Test",
  lastName: "User",
  password: "password",
};

describe("authRoutes.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /api/auth/register", () => {
    it("returns 201 OK", async () => {
      let results = await request(server)
        .post("/api/auth/register")
        .send(testRegister);
      expect(results.status).toBe(201);
    });
    it("creates a new user", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      await request(server).post("/api/auth/register").send(testRegister);

      users = await db("users");

      expect(users).toHaveLength(1);
    });
    it("will return a token", async () => {
      const result = await request(server)
        .post("/api/auth/register")
        .send(testRegister);
      expect(typeof result.body.token).toBe("string");
    });
    it("wont register duplicate emails", async () => {
      const first = await request(server)
        .post("/api/auth/register")
        .send(testRegister);

      expect(first.status).toBe(201);

      const second = await request(server)
        .post("/api/auth/register")
        .send(testRegister);

      expect(second.status).toBe(403);
    });
    it("will return error if missing credentials", async () => {
      delete testRegister.password;

      const results = await request(server)
        .post("/api/auth/register")
        .send(testRegister);

      expect(results.status).toBe(400);

      testRegister.password = "password";
    });
    it("will not return a token on unsuccessful register", async () => {
      delete testRegister.password;

      const result = await request(server)
        .post("/api/auth/register")
        .send(testRegister);

      testRegister.password = "password";

      expect(result.body.token).toBeUndefined();
    });
  });
  describe("POST /api/auth/login", () => {
    it("allows login with correct credentials", async () => {
      await request(server).post("/api/auth/register").send(testRegister);

      const result = await request(server)
        .post("/api/auth/login")
        .send(testRegister);

      expect(result.status).toBe(200);
    });
    it("doesn't allow login in with incorrect credentials", async () => {
      await request(server).post("/api/auth/register").send(testRegister);

      testRegister.password = "Password";
      const result = await request(server)
        .post("/api/auth/login")
        .send(testRegister);

      testRegister.password = "password";
      expect(result.status).toBe(406);
    });
    it("returns a token on success", async () => {
      await request(server).post("/api/auth/register").send(testRegister);

      const result = await request(server)
        .post("/api/auth/login")
        .send(testRegister);

      expect(typeof result.body.token).toBe("string");
    });
    it("doesn't return a token on failure", async () => {
      await request(server).post("/api/auth/register").send(testRegister);

      testRegister.password = "Password";
      const result = await request(server)
        .post("/api/auth/login")
        .send(testRegister);

      testRegister.password = "password";
      expect(result.body.token).toBeUndefined();
    });
  });
});
