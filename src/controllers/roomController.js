const RoomController = ({ RoomService }) => {
  /**
   * Funtion to handle creating a new hotel
   * @param {object} httpRequest
   */
  async function addNewRoom(httpRequest) {
    try {
      const roomData = httpRequest.body;

      const room = await RoomService.addRoom(roomData);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Room successfully created",
          room
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   * Funtion to handle editing a hotel data
   * @param {object} httpRequest
   */
  async function editRoom(httpRequest) {
    try {
      const id = httpRequest.params.id;
      const update = httpRequest.body;

      const room = await RoomService.editRoom(id, update);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          //   message: "room successfully updated",
          room
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 500,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  /**
   * Funtion to handle editing a hotel data
   * @param {object} httpRequest
   */
  async function getRoomById(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const room = await RoomService.getRoomById(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          room
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 500,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  /**
   * Funtion to handle editing a hotel data
   * @param {object} httpRequest
   */
  async function getAllRooms(httpRequest) {
    try {
      const rooms = await RoomService.getAll();

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          rooms
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 500,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  /**
   * Funtion to handle editing a hotel data
   * @param {object} httpRequest
   */
  async function getAllUnsuspended(httpRequest) {
    try {
      const rooms = await RoomService.getAllUnsuspended();

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          rooms
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 500,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   * Funtion to handle suspending and unsuspending room
   * @param {object} httpRequest
   */
  async function suspendRoom(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const suspended = httpRequest.query.suspend === "true";
      const room = { suspended };

      const updatedRoom = await RoomService.editRoom(id, room);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: `Room successfully ${
            suspended ? "Suspended" : "Unsuspended"
          }`,
          room: updatedRoom
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  /**
   * Funtion to handle deleting hotel
   * @param {object} httpRequest
   */
  async function deleteRoom(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const updatedHotel = await RoomService.deleteRoom(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Room successfully deleted",
          room: updatedHotel
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  return {
    addNewRoom,
    editRoom,
    getAllRooms,
    getRoomById,
    suspendRoom,
    deleteRoom,
    getAllUnsuspended
  };
};

module.exports = RoomController;
