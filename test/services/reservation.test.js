const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/app");
const mongoose = require("mongoose");
const { rooms } = require("../mocks/room");
const users = require("../mocks/user");

describe("Reservation Services", () => {
  const mockHotel = {
    hotelName: "Shooters hotel",
    phone: 9098885849,
    street: "new street",
    city: "Lagos",
    zip: "109854"
  };

  const mockReservation = {
    hotelId: 3440,
    userId: 34,
    roomId: 52,
    roomNumber: 10,
    roomPrice: 500
  };

  const admin = {
    email: "admin5@gmail.com",
    password: "aaaaaa"
  };

  let adminUser = null;
  let userData = null;
  let hotelData = null;
  let roomData = null;
  let reservationData = null;

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

      hotelRes = await request(app)
        .post(`/hotels`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(mockHotel);
      hotelData = hotelRes.body.hotel;

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
  });

  afterAll(() => {
    db.collection("admins").deleteMany();
    db.collection("hotels").deleteMany();
    db.collection("rooms").deleteMany();
    db.collection("users").deleteMany();
    db.collection("reservations").deleteMany();
  });

  describe("Creates a new Reservation", () => {
    let reservation = null;
    let response = null;

    beforeAll(async done => {
      let user = {
        lastname: "mendes",
        firstname: "shawn",
        street: "holiness road",
        city: "mowe",
        zip: 102345,
        phone: 2349055334491,
        username: "testing",
        email: "testis@gmail.com",
        password: "aaaaaa"
      };

      res = await request(app)
        .post("/signup")
        .send(user);

      let useResponse = await request(app)
        .post("/auth")
        .send({
          email: user.email,
          password: user.password
        });
      let authUser1 = useResponse.body.data;

      userDataResponse = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${authUser1.accessToken}`)
        .send();
      userData = userDataResponse.body.user;

      reservation = {
        hotelId: hotelData.id,
        userId: userData.id,
        roomNumber: roomData.roomNumber,
        roomId: roomData.id,
        roomPrice: 5000
      };

      response = await request(app)
        .post(`/reservations`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(reservation);
      reservationData = response.body.reservation;

      done();
    });

    it("successfully creates a new Reservation", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservation).toBeDefined();
    });

    it("successfully Returns Created Reservation data", async () => {
      expect(response.body.reservation.id).toBeDefined();
      expect(response.body.reservation.roomNumber).toEqual(room.roomNumber);
      expect(response.body.reservation.roomId).toEqual(reservation.roomId);
      expect(response.body.reservation.userId).toEqual(reservation.userId);
      expect(response.body.reservation.hotelId).toEqual(reservation.hotelId);
      expect(response.body.reservation.roomPrice).toEqual(
        reservation.roomPrice
      );
      expect(response.body.reservation.reservationDate).toBeDefined();
      expect(response.body.reservation.paid).toBe(false);
      expect(response.body.reservation.suspended).toBe(false);
    });
  });

  describe("Admin Edits/Updates A Reservation", () => {
    const reservation = {
      paid: true
    };

    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .put(`/reservations/${reservationData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(reservation);

      done();
    });

    it("successfully updates Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservation).toBeDefined();
      expect(response.body.reservation.paid).toEqual(reservation.paid);
    });
  });

  describe("Retrieve a Reservation By ID", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/reservations/${reservationData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves reservations data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservation).toBeDefined();
      expect(response.body.reservation.id).toBeDefined();
    });
  });

  describe("Retrieve All Reservations", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/reservations/all`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves all Reservations", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservations).toBeDefined();
      expect(response.body.reservations.length).toBeGreaterThan(0);
    });
  });

  describe("Retrieve All user's reservations", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/reservations?userId=${userData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves all Reservations", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservations).toBeDefined();
      expect(response.body.reservations.length).toBeGreaterThan(0);
    });
  });

  /*
  describe("Suspend/UnSusupend a Reservation", () => {
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
  */

  describe("Delete a Reservation (admin)", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .delete(`/reservations/${reservationData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves deleted reservation data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.reservation).toBeDefined();
      expect(response.body.message).toEqual("Reservation successfully deleted");
    });
  });
});
