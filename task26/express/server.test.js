import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server.js";

describe("GET /api/hello", () => {
  it("returns hello message", async () => {
    const response = await request(app).get("/api/hello");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello from Express API");
  });
});