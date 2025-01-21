import request from "supertest";
import { app } from "./server.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "./config.js";

describe("Server Routes", () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ level: "admin" }, SECRET_JWT);
  });

  test("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/authorized");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No autorizado");
  });

  test("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .get("/authorized")
      .set("Cookie", "access_token=invalidtoken");
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Token inválido");
  });

  test("should return 200 if token is valid", async () => {
    const res = await request(app)
      .get("/authorized")
      .set("Cookie", `access_token=${token}`);
    expect(res.status).toBe(200);
    expect(res.body.level).toBe("admin");
  });

  test("should return 403 if user role is not authorized", async () => {
    const userToken = jwt.sign({ level: "user" }, SECRET_JWT);
    const res = await request(app)
      .get("/authorized")
      .set("Cookie", `access_token=${userToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("No autorizado");
  });

  test("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Pagina no encontrada");
  });
});
