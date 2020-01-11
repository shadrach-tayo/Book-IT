const { Reservation } = require("../domain");

function createReservationService({ RoomDb, ReservationDb }) {
  async function addReservation(data) {
    const reservation = Reservation(data);

    const roomExists = await RoomDb.findById(reservation.roomId);
    if (!roomExists) throw new Error("Room not found!!!");

    const exists = await ReservationDb.findCommonReservation({
      roomId: reservation.roomId,
      hotelId: reservation.hotelId
    });

    if (exists) {
      throw new Error("Reservation already exists!!!");
    }

    const result = await ReservationDb.newReservation(reservation);
    return result;
  }

  async function editReservation(id, data) {
    if (!id) throw new Error("Id must be supplied");

    const result = await ReservationDb.update(id, data);

    return result;
  }

  async function getReservationById(id) {
    if (!id) throw new Error("Id must be supplied");

    const reservation = await ReservationDb.findById(id);

    return reservation;
  }

  async function getReservations(query) {
    const reservation = await ReservationDb.find(query);

    return reservation;
  }

  async function getAll() {
    const reservation = await ReservationDb.findAll();

    return reservation;
  }

  async function deleteReservation(id) {
    const reservation = await ReservationDb.remove(id);

    return reservation;
  }

  return {
    addReservation,
    editReservation,
    getReservations,
    getReservationById,
    getAll,
    deleteReservation
  };
}

module.exports = createReservationService;
