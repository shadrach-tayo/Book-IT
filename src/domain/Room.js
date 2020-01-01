module.exports = function buildMakeRoom() {
  return function({
    hotelId,
    roomNumber,
    type,
    price,
    phone,
    roomLock,
    roomName,
    suspended = false,
    reserved = false,
    booked = false
  }) {
    // validate hotle data before creating and saving it to database
    if (!hotelId) throw new Error("HotelId name cannot be empty");
    if (!roomNumber) throw new Error("roomNumber cannot be empty");
    if (!roomName) throw new Error("roomName cannot be empty");
    if (!roomLock) throw new Error("roomLock cannot be empty");
    if (!type) throw new Error("type cannot be empty");
    if (!price) throw new Error("price cannot be empty");
    if (!phone) throw new Error("phone cannot be empty");

    if (roomName.length < 4)
      throw new Error("roomName must be at least 4 characters");

    if (phone.length < 11)
      throw new Error("phone must be at least 11 characters");

    return {
      hotelId,
      roomNumber,
      type,
      price,
      phone,
      roomLock,
      roomName,
      suspended,
      reserved,
      booked
    };
  };
};
