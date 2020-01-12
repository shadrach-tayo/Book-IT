const ReservationController = ({ ReservationService }) => {
  /**
   * Funtion to handle creating a new reservation
   * @param {object} httpRequest
   */
  async function addNewReservation(httpRequest) {
    try {
      const data = httpRequest.body;

      const reservation = await ReservationService.addReservation(data);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Reservation successfully created",
          reservation
        }
      };
    } catch (error) {
      // console.log("error ", error.name);

      let message = error.message;
      if (error.code === 11000) message = "Reservation already exists!!!";

      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message
        }
      };
    }
  }

  /**
   * Funtion to handle editing a reservation data
   * @param {object} httpRequest
   */
  async function editReservation(httpRequest) {
    try {
      const id = httpRequest.params.id;
      const update = httpRequest.body;

      const reservation = await ReservationService.editReservation(id, update);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          //   message: "room successfully updated",
          reservation
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
   * Funtion to handle editing a reservation data
   * @param {object} httpRequest
   */
  async function getReservationById(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const reservation = await ReservationService.getReservationById(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          reservation
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
   * Funtion to handle editing a reservation data
   * @param {object} httpRequest
   */
  async function getAllReservations(httpRequest) {
    try {
      const reservations = await ReservationService.getAll();

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          reservations
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
   * Funtion to handle editing a reservation data
   * @param {object} httpRequest
   */
  async function getReservations(httpRequest) {
    try {
      const reservations = await ReservationService.getReservations(
        httpRequest.query
      );

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          reservations
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
  async function cancelReservation(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const suspended = httpRequest.query.suspend === "true";
      const reservations = { suspended };

      const updatedReservations = await ReservationService.editReservation(
        id,
        reservations
      );

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: `Reservation successfully cancelled`,
          reservations: updatedReservations
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
   * Funtion to handle deleting reservation
   * @param {object} httpRequest
   */
  async function deleteReservation(httpRequest) {
    try {
      const id = httpRequest.params.id;

      const reservation = await ReservationService.deleteReservation(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Reservation successfully deleted",
          reservation
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
    addNewReservation,
    editReservation,
    getAllReservations,
    getReservationById,
    cancelReservation,
    getReservations,
    deleteReservation
  };
};

module.exports = ReservationController;
