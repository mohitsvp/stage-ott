import request from "supertest";
import app from "../app";
import connect from "../config/db";

beforeAll(async () => {
  await connect();
});


describe("POST /auth/register", () => {
  it("should create a new user and return a JWT token", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  }, 20000);
});


describe("POST /auth/login", () => {
    it("should log in a user and return a JWT token", async () => {
      await request(app).post("/auth/register").send({
        username: "testuser",
        password: "testpassword",
      });

      const res = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "testpassword",
      });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    }, 10000);
  });
