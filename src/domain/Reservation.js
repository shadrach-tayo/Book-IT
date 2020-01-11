module.exports = function buildMakeReservation() {
  return function({
    hotelId,
    roomNumber,
    roomId,
    userId,
    roomPrice,
    paid = false,
    reservationDate = new Date(),
    suspended = false
  }) {
    // validate hotle data before creating and saving it to database
    if (!hotelId) throw new Error("HotelId cannot be empty");
    if (!userId) throw new Error("User Id cannot be empty");
    if (!roomId) throw new Error("roomId name cannot be empty");
    if (!roomNumber) throw new Error("roomNumber cannot be empty");
    if (!roomPrice) throw new Error("roomPrice cannot be empty");
    // if (!checkIn) throw new Error("checkIn cannot be empty");
    // if (!checkOut) throw new Error("checkOut cannot be empty");

    return {
      hotelId,
      roomId,
      userId,
      roomNumber,
      roomPrice,
      paid,
      reservationDate,
      suspended
    };
  };
};
