module.exports = function buildMakeHotel() {
  return function({ hotelname, street, city, zip, phone }) {
    // validate hotle data before creating and saving it to database
    if (!hotelname) throw new Error("Text cannot be empty");
    if (!street) throw new Error("street cannot be empty");
    if (!city) throw new Error("city cannot be empty");
    if (!zip) throw new Error("zip code cannot be empty");
    if (!phone) throw new Error("phone cannot be empty");

    if (hotelname.length < 4)
      throw new Error("hotelName must be at least 4 characters");

    if (phone.length < 11)
      throw new Error("phone must be at least 4 characters");

    return { hotelname, street, city, zip, phone };
  };
};
