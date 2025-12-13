jest.setTimeout(10000);

// ✅ Mock Sweet model
jest.mock("../models/Sweet", () => {
  const sweets = [];

  return {
    find: jest.fn(() => Promise.resolve(sweets)),
    create: jest.fn((data) => {
      const sweet = { _id: "1", ...data };
      sweets.push(sweet);
      return Promise.resolve(sweet);
    }),
  };
});

// ✅ Mock auth middleware (bypass JWT)
jest.mock("../middleware/auth.middleware", () => {
  return (req, res, next) => {
    req.user = { id: "admin123", role: "admin" };
    next();
  };
});

// ✅ Mock admin middleware
jest.mock("../middleware/admin.middleware", () => {
  return (req, res, next) => next();
});

const request = require("supertest");
const app = require("../app");

describe("Sweets API (Unit Tests)", () => {
  it("should return list of sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Gulab Jamun",
        category: "Mithai",
        price: 20,
        quantity: 50,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
  });
});
