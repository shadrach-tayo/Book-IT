const request = require("supertest");
const app = require("../../src/app");
const { db } = require("../../src/app");
const mongoose = require("mongoose");

describe("Hotel Services", () => {
  const admin = { email: "admin3@gmail.com", password: "aaaaaa" };
  const mockHotel = {
    hotelName: "Genreal hotels",
    phone: 9098885849,
    street: "new street",
    city: "Lagos",
    zip: 109854
  };
  let adminUser = null;
  let hotelData = null;

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

      done();
    });
  });

  afterAll(() => {
    db.collection("admins").deleteMany();
    db.collection("hotels").deleteMany();
  });

  describe("Create a new Hotel", () => {
    const hotel = {
      hotelName: "Selon hotels",
      phone: 9098885849,
      street: "new street",
      city: "Lagos",
      zip: 109854
    };
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .post(`/hotels`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(hotel);

      done();
    });

    it("successfully creates a new Hotel", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotel).toBeDefined();
    });

    it("successfully Returns Hotel data", async () => {
      expect(response.body.hotel.id).toBeDefined();
      expect(response.body.hotel.hotelName).toEqual(hotel.hotelName);
      expect(response.body.hotel.phone).toEqual(hotel.phone);
      expect(response.body.hotel.zip).toEqual(hotel.zip);
      expect(response.body.hotel.street).toEqual(hotel.street);
      expect(response.body.hotel.city).toEqual(hotel.city);
    });
  });

  describe("Edits/Updates A Hotel", () => {
    const hotel = {
      hotelName: "Selon hotels"
    };
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .put(`/hotels/${hotelData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send(hotel);
      done();
    });

    it("successfully updates Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotel).toBeDefined();
      expect(response.body.hotel.hotelName).toEqual(hotel.hotelName);
    });
  });

  describe("Retrieve A Hotel By ID", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/hotels/${hotelData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotel).toBeDefined();
    });
  });

  describe("Retrieve All Hotels", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .get(`/hotels`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotels).toBeDefined();
      expect(response.body.hotels.length).toBeGreaterThan(0);
    });
  });

  describe("Suspend/UnSusupend a Hotel", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .put(`/hotels/${hotelData.id}/suspend?suspend=${true}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully suspends Hotel", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotel).toBeDefined();
      expect(response.body.message).toEqual("Hotel successfully Suspended");
    });
  });

  describe("Delete a Hotel", () => {
    let response = null;

    beforeAll(async done => {
      response = await request(app)
        .delete(`/hotels/${hotelData.id}`)
        .set("Authorization", `Bearer ${adminUser.accessToken}`)
        .send();
      done();
    });

    it("successfully retrieves Hotel data", async () => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.hotel).toBeDefined();
      expect(response.body.message).toEqual("Hotel successfully deleted");
    });
  });
});
