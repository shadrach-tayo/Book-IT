const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/app");
const mongoose = require("mongoose");
// const mockHotel = require("../mocks/hotel");
const { rooms } = require("../mocks/room");

describe("Room Services", () => {
  const mockHotel = {
    hotelName: "Healer hotel",
    phone: 9098885849,
    street: "new street",
    city: "Lagos",
    zip: "109854"
  };
  const admin = {
    email: "admin4@gmail.com",
    password: "aaaaaa"
  };

  let adminUser = null;
  let hotelData = null;
  let roomData = null;

  beforeAll(async done => {
    await mongoose.connection.on("connected", async () => {
      const newAdmin = await request(app)
        .post("/admin/signup")
        .send(admin);

      const adminAuth = await request(app)
        .post("/admin/auth")
        .send(admin);
      //   console.log("admin auth", adminAuth.body);
      adminUser = adminAuth.body.data;

      //   roomRes = await request(app)
      //     .post(`/rooms`)
      //     .set("Authorization", `Bearer ${adminUser.accessToken}`)
      //     .send({ ...rooms[0], hotelId: hotelData.id });
      //   roomData = roomRes.body.hotel;
      done();
    });
  });

  afterAll(() => {
    db.collection("admins").deleteMany();
    db.collection("hotels").deleteMany();
    db.collection("rooms").deleteMany();
  });

  describe("Creates a new Room", () => {
    let room = null;
    let response = null;

    beforeAll(async done => {
      hotelRes = await request(app)
        .post(`/hotels`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(mockHotel);
      hotelData = hotelRes.body.hotel;
      // console.log("hotel ", hotelRes.body);
      room = {
        ...rooms[1],
        hotelId: hotelData.id
      };

      response = await request(app)
        .post(`/rooms`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(room);
      roomData = response.body.room;
      done();
    });

    it("successfully creates a new Room", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.room).toBeDefined();
    });

    it("successfully Returns Created Room data", async () => {
      expect(response.body.room.id).toBeDefined();
      expect(response.body.room.roomName).toEqual(room.roomName);
      expect(response.body.room.phone).toEqual(room.phone);
      //   expect(response.body.room.roomLock).toEqual(room.roomLock);
      expect(response.body.room.price).toEqual(room.price);
      expect(response.body.room.type).toEqual(room.type);
      expect(response.body.room.suspended).toEqual(room.suspended);
    });
  });

  describe("Edits/Updates A Room", () => {
    const room = {
      roomName: "Silicon Valley",
      //   roomLock: "79949",
      roomNumber: 9
    };

    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .put(`/rooms/${roomData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(room);

      done();
    });

    it("successfully updates Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.room).toBeDefined();
      expect(response.body.room.roomName).toEqual(room.roomName);
      //   expect(response.body.room.roomLock).toEqual(room.roomLock);
      expect(response.body.room.roomNumber).toEqual(room.roomNumber);
    });
  });

  describe("Retrieve a room By ID", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/rooms/${roomData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves room data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.room).toBeDefined();
    });
  });

  describe("Retrieve All rooms", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/rooms`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      console.log("rooms ", response.body);
      done();
    });

    it("successfully retrieves Rooms", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.rooms).toBeDefined();
      expect(response.body.rooms.length).toBeGreaterThan(0);
    });
  });

  describe("Suspend/UnSusupend a room", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .put(`/rooms/${roomData.id}/suspend?suspend=${true}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      //   console.log("res ", response.body);
      done();
    });

    it("successfully suspends room", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.room).toBeDefined();
      expect(response.body.message).toEqual("Room successfully Suspended");
      expect(response.body.room.suspended).toEqual(true);
    });
  });

  describe("Delete a room", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .delete(`/rooms/${roomData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves deleted room data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.room).toBeDefined();
      expect(response.body.message).toEqual("Room successfully deleted");
    });
  });
});
