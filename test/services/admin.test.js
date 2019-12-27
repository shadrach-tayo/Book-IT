const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/app");
const mongoose = require("mongoose");

describe("Admin Services", () => {
  const admin = { email: "admin2@gmail.com", password: "aaaaaa" };

  let res = null;
  beforeAll(async done => {
    await mongoose.connection.on("connected", async () => {
      res = await request(app)
        .post("/admin/signup")
        .send(admin);

      done();
    });
  });

  afterAll(() => {
    db.collection("admins").deleteMany();
  });

  describe("Admin Sign up", () => {
    it("successfully Signs Up Admin", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.admin).toBeDefined();
    });

    it("successfully Returns Admin data", async () => {
      expect(res.body.admin.id).toBeDefined();
      expect(res.body.admin.email).toEqual(admin.email);
      expect(res.body.admin.role).toEqual("admin");
    });
  });
});
