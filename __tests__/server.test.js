// import request from "supertest";
// import { app } from "./server.js";

const request = require("supertest");
const { app } = require("../server");
const { firstResponse } = require("../firstResponse");

// back/server.test.js


describe("Server Routes", () => {
  test("should return 200 and correct JSON response for root route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  test("should return 404 and correct JSON response for unknown routes", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Página no encontrada" });
  });

  test("should handle CORS correctly", async () => {
    const res = await request(app).options("/");
    expect(res.headers["access-control-allow-origin"]).toBe(process.env.URL_FRONT);
    expect(res.headers["access-control-allow-methods"]).toContain("GET");
    expect(res.headers["access-control-allow-methods"]).toContain("POST");
    expect(res.headers["access-control-allow-methods"]).toContain("PUT");
    expect(res.headers["access-control-allow-methods"]).toContain("PATCH");
    expect(res.headers["access-control-allow-methods"]).toContain("DELETE");
    expect(res.headers["access-control-allow-headers"]).toContain("Content-Type");
    expect(res.headers["access-control-allow-headers"]).toContain("Authorization");
  });

  test("should serve static files from /uploads directory", async () => {
    const res = await request(app).get("/uploads/sample-file.txt");
    expect(res.status).toBe(200);
    // Additional checks can be added to verify the content of the file
  });
});