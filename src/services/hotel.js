const { Hotel } = require("../domain");

function createHotelService({ HotelDb }) {
  async function addHotel(hotelData) {
    const hotel = Hotel(hotelData);

    const exists = await HotelDb.findByName(hotel.hotelName);

    if (exists) {
      throw new Error("Hotel already exists!!!");
    }

    const savedHotel = await HotelDb.newHotel(hotel);
    return savedHotel;
  }

  async function editHotel(id, hotelData) {
    if (!id) throw new Error("Id must be supplied");

    const savedHotel = await HotelDb.update(id, hotelData);

    return savedHotel;
  }

  async function getHotelById(id) {
    if (!id) throw new Error("Id must be supplied");

    const hotel = await HotelDb.findById(id);

    return hotel;
  }

  async function getAll(query) {
    const hotels = await HotelDb.findAll(query);

    return hotels;
  }

  async function deleteHotel(id) {
    const hotel = await HotelDb.remove(id);

    return hotel;
  }

  return { addHotel, editHotel, getHotelById, getAll, deleteHotel };
}

module.exports = createHotelService;
