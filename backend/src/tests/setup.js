const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const connectDB = require("../config/db");

let mongoServer;

beforeAll(async () => {
  mongoose.set("bufferCommands", false);

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await connectDB(uri); // 👈 same function as prod, different URI
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
