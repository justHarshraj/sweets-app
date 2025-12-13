jest.setTimeout(10000);

// ✅ MOCK USER MODEL
jest.mock("../models/User", () => {
  const users = [];

  return {
    findOne: jest.fn(({ email }) =>
      Promise.resolve(users.find(u => u.email === email) || null)
    ),
    create: jest.fn((data) => {
      users.push(data);
      return Promise.resolve(data);
    }),
  };
});

const request = require("supertest");
const app = require("../app");

describe("Auth API (Unit Tests)", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should login an existing user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Login User",
        email: "login@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
