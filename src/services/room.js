const { Room } = require("../domain");

function createRoomService({ RoomDb, HotelDb }) {
  async function addRoom(roomData) {
    const room = Room(roomData);

    const hotelExists = await HotelDb.findById(room.hotelId);
    if (!hotelExists) throw new Error("Hotel not found!!!");

    const exists = await RoomDb.findCommonRoom({
      roomName: room.roomName,
      roomNumber: room.roomNumber,
      hotelId: room.hotelId
    });

    if (exists) {
      throw new Error("Room already exists!!!");
      // console.log("exists ", exists);
    }

    const savedRoom = await RoomDb.newRoom(room);
    return savedRoom;
  }

  async function editRoom(id, roomData) {
    if (!id) throw new Error("Id must be supplied");

    const savedRoom = await RoomDb.update(id, roomData);

    return savedRoom;
  }

  async function getRoomById(id) {
    if (!id) throw new Error("Id must be supplied");

    const room = await RoomDb.findById(id);

    return room;
  }

  async function getAll() {
    const rooms = await RoomDb.findAll();

    return rooms;
  }

  async function getAllUnsuspended() {
    const rooms = await RoomDb.find({ suspended: false });

    return rooms;
  }

  async function deleteRoom(id) {
    const room = await RoomDb.remove(id);

    return room;
  }

  return {
    addRoom,
    editRoom,
    getRoomById,
    getAll,
    deleteRoom,
    getAllUnsuspended
  };
}

module.exports = createRoomService;
