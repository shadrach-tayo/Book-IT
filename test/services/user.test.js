const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/app");
const mongoose = require("mongoose");
const users = require("../mocks/user");

describe("User uses cases or services", () => {
  let adminUser = null;
  let adminUserData = null;
  let authUser = null;
  let authUser1 = null;
  let authUserData = null;
  let authUserData1 = null;

  beforeAll(async done => {
    await mongoose.connection.on("connected", async () => {
      let user = users[1];
      let res = null;
      // sign up second test user
      res = await request(app)
        .post("/signup")
        .send(user);

      useResponse = await request(app)
        .post("/auth")
        .send({
          email: user.email,
          password: user.password
        });
      authUser1 = useResponse.body.data;

      userDataResponse = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${authUser1.accessToken}`)
        .send();
      authUserData1 = userDataResponse.body.user;

      adminRes = await request(app)
        .post("/admin/signup")
        .send({ email: "admin@g.com", password: "aaaaaa" });
      adminUserRes = adminRes.body.user;

      adminDataResponse = await request(app)
        .post("/admin/auth")
        .send({ email: "admin@g.com", password: "aaaaaa" });
      adminUser = adminDataResponse.body.data;
    });
    done();
  });

  afterAll(async () => {
    await db.collection("users").deleteMany();
  });

  describe("User Sign up", () => {
    let res = null;
    const user = users[0];

    beforeAll(async done => {
      res = await request(app)
        .post("/signup")
        .send(user);
      done();
    });

    it("successfully Signs Up", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.user).toBeDefined();
    });

    it("successfully Returns User data", async () => {
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.lastname).toEqual(user.lastname);
      expect(res.body.user.firstname).toEqual(user.firstname);
      expect(res.body.user.username).toEqual(user.username);
      expect(res.body.user.zip).toEqual(user.zip);
      expect(res.body.user.city).toEqual(user.city);
      expect(res.body.user.email).toEqual(user.email);
      expect(res.body.user.phone).toEqual(user.phone);
      expect(res.body.user.street).toEqual(user.street);
    });
  });

  describe("Authenticates Login", () => {
    let res = null;
    const user = users[0];

    beforeAll(async done => {
      res = await request(app)
        .post("/auth")
        .send({
          email: user.email,
          password: user.password
        });
      authUser = res.body.data;
      done();
    });

    it("successfully Logs In user", async () => {
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
    });

    it("successfully Returns  Access token", async () => {
      // expect(res.body.data.refreshToken).toBeDefined();
      expect(res.body.data.accessToken).toBeDefined();
    });
  });

  describe("Get User By Token", () => {
    let res = null;

    beforeAll(async done => {
      res = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send();
      authUserData = res.body.user;
      done();
    });

    it("successfully Returns user", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns Auth User Data", async () => {
      expect(res.body.user).toBeDefined();
    });
  });

  // get user by Id
  describe("Get User By ID", () => {
    let res = null;

    beforeAll(async done => {
      res = await request(app)
        .get(`/users/${authUserData.id}`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send();
      done();
    });

    it("successfully Returns user", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns Auth User Data", async () => {
      expect(res.body.user).toBeDefined();
      expect(res.body.user.id).toBeDefined();
    });
  });
  /*

  // get all users on the platform
  describe("Get all Users", () => {
    let res = null;

    beforeAll(async done => {
      res = await request(app)
        .get(`/users`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send();
      done();
    });

    it("successfully Returns users", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns Auth User Data", async () => {
      expect(res.body.users).toBeDefined();
      expect(res.body.users.length).toBeTruthy();
    });
  });
*/

  // edit user profile
  describe("Edit or Update User's Profile (username)", () => {
    let res = null;
    const update = {
      username: "test username"
    };
    beforeAll(async done => {
      res = await request(app)
        .put(`/users/${authUserData.id}`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send(update);
      done();
    });

    it("successfully Updates user profile", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns Auth User Updated Data", async () => {
      //   console.log("users ", res.body);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.username).toEqual(update.username);
    });
  });

  // suspend user
  describe("Edit or Update User's Profile (suspend)", () => {
    let res = null;

    beforeAll(async done => {
      res = await request(app)
        .put(`/users/${authUserData.id}/suspend?suspend=true`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully suspends user", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns suspended user Updated Data", async () => {
      //   console.log("users ", res.body);
      expect(res.body.user).toBeDefined();
      expect(res.body.message).toEqual("User successfully Suspended");
    });
  });

  // unsuspend user
  describe("Edit or Update User's Profile (unsuspend)", () => {
    let res = null;

    beforeAll(async done => {
      res = await request(app)
        .put(`/users/${authUserData.id}/suspend?suspend=false`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully suspends user", async () => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
    });

    it("successfully Returns suspended user Updated Data", async () => {
      //   console.log("users ", res.body);
      expect(res.body.user).toBeDefined();
      expect(res.body.message).toEqual("User successfully Unsuspended");
    });
  });

  // unauthorized access to deleting user's profile
  describe("Unauthorized access to deleting User's Profile (username)", () => {
    let res = null;
    beforeAll(async done => {
      res = await request(app)
        .delete(`/users/${authUserData.id}`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send();
      done();
    });

    it("Rejects delete request", async () => {
      expect(res.statusCode).toEqual(403);
      expect(res.body.status).toEqual("error");
    });

    it("Returns Unauthorized Access", async () => {
      expect(res.body.message).toEqual("Unauthorized access");
    });
  });

  // unauthorized access to updating another user's profile
  describe("Unauthorized access to updating another user's profile (username)", () => {
    let res = null;
    const update = {
      username: "test username"
    };
    beforeAll(async done => {
      res = await request(app)
        .put(`/users/${authUserData1.id}`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send(update);
      done();
    });

    it("Rejects update request for another user's profile", async () => {
      expect(res.statusCode).toEqual(403);
      expect(res.body.status).toEqual("error");
    });

    it("Returns Unauthorized Access", async () => {
      expect(res.body.message).toEqual("Unauthorized access");
    });
  });

  // unauthorized access to deleting another user's profile
  describe("Unauthorized access to deleting another User's Profile", () => {
    let res = null;
    beforeAll(async done => {
      res = await request(app)
        .delete(`/users/${authUserData1.id}`)
        .set("Authorization", `Bearer ${authUser.accessToken}`)
        .send();
      done();
    });

    it("Rejects delete request", async () => {
      expect(res.statusCode).toEqual(403);
      expect(res.body.status).toEqual("error");
    });

    it("Returns Unauthorized Access", async () => {
      expect(res.body.message).toEqual("Unauthorized access");
    });
  });
});
