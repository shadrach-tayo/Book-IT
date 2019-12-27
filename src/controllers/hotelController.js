const HotelController = ({ HotelService }) => {
  /**
   * Funtion to handle creating a new hotel
   * @param {object} httpRequest
   */
  async function addNewHotel(httpRequest) {
    try {
      const hotelData = httpRequest.body;

      const hotel = await HotelService.addHotel(hotelData);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Hotel successfully created",
          hotel
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
  async function editHotel(httpRequest) {
    try {
      const id = httpRequest.params.id;
      const update = httpRequest.body;

      const hotel = await HotelService.editHotel(id, update);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Hotel successfully updated",
          hotel
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
  async function getHotelById(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const hotel = await HotelService.getHotelById(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          hotel
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
  async function getAllHotels(httpRequest) {
    try {
      const hotels = await HotelService.getAll();

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          hotels
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
   * Funtion to handle suspending and unsuspending hotel
   * @param {object} httpRequest
   */
  async function suspendHotel(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const suspended = httpRequest.query.suspend === "true";
      const hotel = { suspended };

      const updatedHotel = await HotelService.editHotel(id, hotel);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: `Hotel successfully ${
            suspended ? "Suspended" : "Unsuspended"
          }`,
          hotel: updatedHotel
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
  async function deleteHotel(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const updatedHotel = await HotelService.deleteHotel(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Hotel successfully deleted",
          hotel: updatedHotel
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
    addNewHotel,
    editHotel,
    getAllHotels,
    getHotelById,
    suspendHotel,
    deleteHotel
  };
};

module.exports = HotelController;
