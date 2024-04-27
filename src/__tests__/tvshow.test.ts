import request from "supertest";
import app from "../app";
import connect from "../config/db";

beforeAll(async () => {
  await connect();
});

describe("TVShow Controller", () => {
  it("should add a new tv show", async () => {
    const res = await request(app).post("/tvshow/add").send({
      title: "Test TV Show",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "TV Show added successfully");
  });

  it("should get all tv shows", async () => {
    const res = await request(app).get("/tvshow/all");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a tv show", async () => {
    const newTVShow = await request(app).post("/tvshow/add").send({
      title: "Test TV Show",
    });

    const res = await request(app).patch(`/tvshow/${newTVShow.body._id}/update`).send({
      title: "Updated TV Show",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated TV Show");
  });

  it("should delete a tv show", async () => {
    const newTVShow = await request(app).post("/tvshow/add").send({
      title: "Test TV Show",
    });

    const res = await request(app).delete(`/tvshow/${newTVShow.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "TV Show removed successfully");
  });
});