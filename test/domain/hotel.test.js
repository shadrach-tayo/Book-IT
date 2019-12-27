const { Hotel } = require("../../src/domain");
const hoteldata = require("../mocks/hotel");

describe("Hotel", () => {
  describe("Creates Hotel", () => {
    const created = Hotel(hoteldata);

    it("returns a hotel object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid hotelName", () => {
      expect(created.hotelName).toBeDefined();
      expect(typeof created.hotelName).toEqual("string");
    });

    it("has a valid phone", () => {
      expect(created.phone).toBeDefined();
      expect(typeof created.phone).toEqual("string");
    });

    it("has a valid city", () => {
      expect(created.city).toBeDefined();
      expect(typeof created.city).toEqual("string");
    });

    it("has a valid street", () => {
      expect(created.street).toBeDefined();
      expect(typeof created.street).toEqual("string");
    });

    it("has a valid zip code", () => {
      expect(created.zip).toBeDefined();
      expect(typeof created.zip).toEqual("string");
    });
  });
});
