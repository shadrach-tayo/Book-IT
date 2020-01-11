const { Reservation } = require("../../src/domain");
// const reservations = require("../mocks/reservation");

const reservation = {
  hotelId: 3440,
  userId: 34,
  roomId: 52,
  roomNumber: 10,
  roomPrice: 500
};

describe("Reservation", () => {
  describe("Creates Reservation", () => {
    const created = Reservation(reservation);

    it("returns a reservation object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid roomId", () => {
      expect(created.roomId).toBeDefined();
      expect(typeof created.roomId).toEqual("number");
    });

    it("has a valid hotelId", () => {
      expect(created.hotelId).toBeDefined();
      expect(typeof created.hotelId).toEqual("number");
    });

    it("has a valid userId", () => {
      expect(created.userId).toBeDefined();
      expect(typeof created.userId).toEqual("number");
    });

    it("has a valid roomPrice", () => {
      expect(created.roomPrice).toBeDefined();
      expect(typeof created.roomPrice).toEqual("number");
    });

    it("has a valid reservationDate", () => {
      expect(created.reservationDate).toBeDefined();
      expect(typeof created.reservationDate).toEqual("object");
    });

    it("has a valid suspended property", () => {
      expect(created.suspended).toBeDefined();
      expect(created.suspended).toEqual(false);
    });

    it("has a valid paid property", () => {
      expect(created.paid).toBeDefined();
      expect(typeof created.paid).toEqual("boolean");
    });
  });
});
