const { Room } = require("../../src/domain");
const { rooms } = require("../mocks/room");

describe("Room", () => {
  describe("Creates Room", () => {
    const created = Room({ ...rooms[0], hotelId: 3440 });

    it("returns a room object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid roomName", () => {
      expect(created.roomName).toBeDefined();
      expect(typeof created.roomName).toEqual("string");
    });

    it("has a valid phone", () => {
      expect(created.phone).toBeDefined();
      expect(typeof created.phone).toEqual("number");
    });

    it("has a valid roomNumber", () => {
      expect(created.roomNumber).toBeDefined();
      expect(typeof created.roomNumber).toEqual("number");
    });

    it("has a valid price", () => {
      expect(created.price).toBeDefined();
      expect(typeof created.price).toEqual("number");
    });

    it("has a valid room type", () => {
      expect(created.type).toBeDefined();
      expect(typeof created.type).toEqual("string");
    });
  });
});
