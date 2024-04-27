import request from "supertest";
import app from "../app";
import connect from "../config/db";

beforeAll(async () => {
  await connect();
});

describe("Movie Controller", () => {
  it("should add a new movie", async () => {
    const res = await request(app).post("/movie/add").send({
      title: "Test Movie",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Movie added successfully");
  });

  it("should get all movies", async () => {
    const res = await request(app).get("/movie/all");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a movie", async () => {
    const newMovie = await request(app).post("/movie/add").send({
      title: "Test Movie",
    });

    const res = await request(app).patch(`/movie/${newMovie.body._id}/update`).send({
      title: "Updated Movie",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Movie");
  });

  it("should delete a movie", async () => {
    const newMovie = await request(app).post("/movie/add").send({
      title: "Test Movie",
    });

    const res = await request(app).delete(`/movie/${newMovie.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Movie removed successfully");
  });
});