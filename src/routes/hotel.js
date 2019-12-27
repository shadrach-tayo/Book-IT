const createHotelRoutes = ({
  multer,
  makeCallback,
  hotelController,
  authValidationMiddleware,
  permissionsMiddleware
}) => {
  const upload = multer();

  return function(router) {
    // add new hotel
    router.post(
      "/hotels",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "hotel")
      ],
      makeCallback(hotelController.addNewHotel)
    );

    // edit hotel
    router.put(
      "/hotels/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "hotel")
      ],
      makeCallback(hotelController.editHotel)
    );

    // get all hotels
    router.get(
      "/hotels",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "hotel")
      ],
      makeCallback(hotelController.getAllHotels)
    );

    // get hotel by id
    router.get(
      "/hotels/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "hotel")
      ],
      makeCallback(hotelController.getHotelById)
    );

    // delete hotel by id
    router.delete(
      "/hotels/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "hotel"),
        permissionsMiddleware.isAdmin
      ],
      makeCallback(hotelController.deleteHotel)
    );

    // suspend hotel
    router.put(
      "/hotels/:id/suspend",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "hotel")
      ],
      makeCallback(hotelController.suspendHotel)
    );
  };
};

module.exports = createHotelRoutes;
