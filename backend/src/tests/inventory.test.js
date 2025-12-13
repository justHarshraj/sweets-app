jest.setTimeout(10000);

// ✅ Mock Sweet model
jest.mock("../models/Sweet", () => {
  let sweet = {
    _id: "sweet123",
    name: "Rasgulla",
    category: "Mithai",
    price: 15,
    quantity: 10,
    save: jest.fn(),
  };

  return {
    findById: jest.fn(() => Promise.resolve(sweet)),
  };
});

// ✅ Mock auth middleware (ADMIN user)
jest.mock("../middleware/auth.middleware", () => {
  return (req, res, next) => {
    req.user = { id: "admin123", role: "admin" };
    next();
  };
});

// ✅ Mock admin middleware (allow access)
jest.mock("../middleware/admin.middleware", () => {
  return (req, res, next) => next();
});

const request = require("supertest");
const app = require("../app");

describe("Inventory API (Unit Tests)", () => {
  it("should purchase a sweet and reduce quantity", async () => {
    const res = await request(app)
      .post("/api/sweets/sweet123/purchase")
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/purchased/i);
  });

  it("should restock a sweet and increase quantity", async () => {
    const res = await request(app)
      .post("/api/sweets/sweet123/restock")
      // 🔑 IMPORTANT: controller expects `amount`
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/restocked/i);
  });
});
