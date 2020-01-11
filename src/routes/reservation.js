const createRoomRoutes = ({
  multer,
  makeCallback,
  reservationController,
  authValidationMiddleware,
  permissionsMiddleware
}) => {
  const upload = multer();

  return function(router) {
    // add new room
    router.post(
      "/reservations",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "reservation")
      ],
      makeCallback(reservationController.addNewReservation)
    );

    // edit reservation
    router.put(
      "/reservations/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "reservation")
      ],
      makeCallback(reservationController.editReservation)
    );

    // get reservations with query
    router.get(
      "/reservations",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "reservation")
      ],
      makeCallback(reservationController.getReservations)
    );

    // get all  reservations
    router.get(
      "/reservations/all",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "reservation")
      ],
      makeCallback(reservationController.getAllReservations)
    );

    // get reservation by id
    router.get(
      "/reservations/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "reservation")
      ],
      makeCallback(reservationController.getReservationById)
    );

    // delete reservation by id
    router.delete(
      "/reservations/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("deleteAny", "reservation"),
        permissionsMiddleware.isAdmin
      ],
      makeCallback(reservationController.deleteReservation)
    );

    // cancel reservation by id
    router.delete(
      "/reservations/cancel/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        // permissionsMiddleware.grantAccess("deleteAny", "reservation"),
        permissionsMiddleware.canDeleteReservation
      ],
      makeCallback(reservationController.deleteReservation)
    );

    // // suspend room
    // router.put(
    //   "/rooms/:id/suspend",
    //   [
    //     upload.none(),
    //     authValidationMiddleware.validJWTNeeded,
    //     permissionsMiddleware.grantAccess("updateAny", "room")
    //   ],
    //   makeCallback(reservationController.suspendRoom)
    // );
  };
};

module.exports = createRoomRoutes;
