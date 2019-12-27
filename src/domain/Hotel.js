module.exports = function buildMakeHotel() {
  return function({ hotelName, street, city, zip, phone, suspended = false }) {
    // validate hotle data before creating and saving it to database
    if (!hotelName) throw new Error("Hotel name cannot be empty");
    if (!street) throw new Error("street cannot be empty");
    if (!city) throw new Error("city cannot be empty");
    if (!zip) throw new Error("zip code cannot be empty");
    if (!phone) throw new Error("phone cannot be empty");

    if (hotelName.length < 4)
      throw new Error("hotelName must be at least 4 characters");

    if (phone.length < 11)
      throw new Error("phone must be at least 4 characters");

    return { hotelName, street, city, zip, phone, suspended };
  };
};
