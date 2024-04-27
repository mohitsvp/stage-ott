import request from "supertest";
import app from "../app";
import connect from "../config/db";

beforeAll(async () => {
  await connect();
});

describe("Genre Controller", () => {
  it("should add a new genre", async () => {
    const res = await request(app).post("/genre/add").send({
      name: "Test Genre",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Genre added successfully");
  });

  it("should get all genres", async () => {
    const res = await request(app).get("/genre/all");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a genre", async () => {
    const newGenre = await request(app).post("/genre/add").send({
      name: "Test Genre",
    });

    const res = await request(app).patch(`/genre/${newGenre.body._id}`).send({
      name: "Updated Genre",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated Genre");
  });

  it("should delete a genre", async () => {
    const newGenre = await request(app).post("/genre/add").send({
      name: "Test Genre",
    });

    const res = await request(app).delete(`/genre/${newGenre.body._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "genre removed successfully");
  });
});